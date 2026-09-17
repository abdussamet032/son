package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/discovery"
	"github.com/abdussamet032/son/internal/editor"
	"github.com/abdussamet032/son/internal/history"
	"github.com/abdussamet032/son/internal/hooks"
	"github.com/abdussamet032/son/internal/layout"
	"github.com/abdussamet032/son/internal/ranking"
	"github.com/abdussamet032/son/internal/terminal"
	"github.com/abdussamet032/son/internal/tui"
	"github.com/spf13/cobra"
)

var (
	flagTerminal   string
	flagEditor     string
	flagLayout     string
	flagSort       string
	flagNewWindow  bool
	flagSameWindow bool
)

func NewRootCmd() *cobra.Command {
	root := &cobra.Command{
		Use:   "son [project]",
		Short: "Open the right repo in the right workspace",
		Long: `son — Developer workspace launcher.

Discovers your recent projects, lets you pick one with fuzzy search,
and opens it in a terminal workspace with split panes, editor, and startup hooks.

Give a project name to skip the picker. It matches the repo name exactly,
then by prefix, substring, and fuzzy. If several projects match equally well,
the picker opens with the name already typed.

Supports iTerm2, tmux, and WezTerm.`,
		Example: `  son              pick a project
  son tgsp         open the project matching "tgsp"
  son tgsp -2      open it with 2 panes (-1 to -9)
  son tgsp -4 -n   open it with 4 panes in a new window
  son org/repo     match by org and repo
  son .            open the current directory
  son -            reopen the last project (skips the one you're in)`,
		Args:              cobra.MaximumNArgs(1),
		ValidArgsFunction: completeProjects,
		SilenceUsage:      true,
		SilenceErrors:     true,
		RunE:              runDefault,
	}

	root.PersistentFlags().StringVarP(&flagTerminal, "terminal", "t", "", "Terminal to use (iterm, tmux, wezterm, auto)")
	root.PersistentFlags().StringVarP(&flagEditor, "editor", "e", "", "Editor to open (code, cursor, zed, nvim)")
	root.PersistentFlags().StringVarP(&flagLayout, "layout", "l", "", "Pane layout (single, split, 3-pane, grid) or pane count 1-9; -N is short for -l N")
	root.PersistentFlags().StringVarP(&flagSort, "sort", "s", "", "Sort method (frecency, mtime, alpha)")
	root.Flags().BoolVarP(&flagNewWindow, "new-window", "n", false, "Open in a new window")
	root.Flags().BoolVar(&flagSameWindow, "same-window", false, "Open in the current window")
	root.MarkFlagsMutuallyExclusive("new-window", "same-window")

	root.AddCommand(newInitCmd())
	root.AddCommand(newSetupCmd())
	root.AddCommand(newDoctorCmd())
	root.AddCommand(newListCmd())
	root.AddCommand(newPsCmd())
	root.AddCommand(newPinCmd())
	root.AddCommand(newUnpinCmd())
	root.AddCommand(newConfigCmd())
	root.AddCommand(newVersionCmd())
	root.AddCommand(newCompletionCmd())

	return root
}

func runDefault(cmd *cobra.Command, args []string) error {
	// Reject a bad layout before the picker, not after it.
	if flagLayout != "" {
		if _, err := layout.Parse(flagLayout); err != nil {
			return err
		}
	}

	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("config error: %w", err)
	}

	// Open history
	store, err := history.Open()
	if err != nil {
		return fmt.Errorf("history error: %w", err)
	}
	defer store.Close()

	// Discover projects
	projects, err := discovery.Discover(cfg.Roots)
	if err != nil {
		return fmt.Errorf("discovery error: %w", err)
	}

	var query string
	if len(args) > 0 {
		query = args[0]
	}

	if len(projects) == 0 && query == "" {
		fmt.Println("No projects found. Check your config roots:")
		for _, r := range cfg.Roots {
			fmt.Printf("  %s (depth: %d)\n", r.Path, r.Depth)
		}
		fmt.Println("\nRun 'son init' to configure, or 'son doctor' to diagnose.")
		return nil
	}

	// Get history entries
	entries, _ := store.All()

	// Sort
	sortMethod := ranking.Method(cfg.Sorting.Method)
	if flagSort != "" {
		sortMethod = ranking.Method(flagSort)
	}
	sorted := ranking.Sort(projects, entries, sortMethod)

	project, err := resolveProject(sorted, cfg, entries, query)
	if err != nil {
		return err
	}
	if project == nil {
		return nil // user cancelled
	}

	// Record access
	store.Record(project.Path)

	// Resolve settings: flags beat .son.toml, which beats the global config.

	// Resolve terminal
	termName := cfg.DefaultTerminal
	if project.Config != nil && project.Config.Terminal != "" {
		termName = project.Config.Terminal
	}
	if flagTerminal != "" {
		termName = flagTerminal
	}

	term, err := terminal.Get(termName)
	if err != nil {
		return err
	}

	// Resolve layout
	layoutName := cfg.DefaultLayout
	if project.Config != nil && project.Config.Layout != "" {
		layoutName = project.Config.Layout
	}
	if flagLayout != "" {
		layoutName = flagLayout
	}
	l := layout.Get(layoutName)

	// Resolve window mode
	openMode := cfg.OpenMode
	if flagNewWindow {
		openMode = "new_window"
	}
	if flagSameWindow {
		openMode = "same_window"
	}

	// Resolve hooks
	var hookList []config.HookConfig
	if project.Config != nil {
		hookList = hooks.Merge(project.Config.Hooks)
	}

	// Resolve editor
	editorName := cfg.DefaultEditor
	if project.Config != nil && project.Config.Editor != "" {
		editorName = project.Config.Editor
	}
	if flagEditor != "" {
		editorName = flagEditor
	}

	// Open editor
	if editorName != "" {
		if err := editor.Open(editorName, project.Path); err != nil {
			fmt.Fprintf(os.Stderr, "Warning: could not open editor %q: %v\n", editorName, err)
		}
	}

	// Open terminal
	panes := "panes"
	if len(l.Panes) == 1 {
		panes = "pane"
	}
	fmt.Printf("Opening %s in %s (%d %s)...\n", project.Name, term.Name(), len(l.Panes), panes)
	return term.Open(project.Path, project.Name, l, hookList, openMode)
}

func newInitCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "init",
		Short: "Create default configuration file",
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := config.Init(); err != nil {
				return err
			}
			fmt.Printf("Config created at %s\n", config.ConfigPath())
			fmt.Println("Edit it to add your project roots.")
			return nil
		},
	}
}

func newSetupCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "setup",
		Short: "Interactive configuration — edit settings with a TUI form",
		Long: `Open an interactive form to configure son.

Lets you easily change terminal, editor, layout, project directories,
sorting method, and appearance settings. Changes are saved to config.toml.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return tui.RunSetup()
		},
	}
}

func newDoctorCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "doctor",
		Short: "Check system dependencies and configuration",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("son doctor")
			fmt.Println(strings.Repeat("─", 40))
			for _, line := range config.Doctor() {
				fmt.Println("  " + line)
			}
			fmt.Println(strings.Repeat("─", 40))
			avail := terminal.Available()
			if len(avail) > 0 {
				fmt.Printf("  Available terminals: %s\n", strings.Join(avail, ", "))
			}
			editors := editor.Available()
			if len(editors) > 0 {
				fmt.Printf("  Available editors: %s\n", strings.Join(editors, ", "))
			}
			fmt.Printf("  Layouts: %s\n", strings.Join(layout.Names(), ", "))
		},
	}
}

func newListCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "list",
		Short: "List discovered projects without selection",
		Aliases: []string{"ls"},
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Load()
			if err != nil {
				return err
			}

			store, err := history.Open()
			if err != nil {
				return err
			}
			defer store.Close()

			projects, err := discovery.Discover(cfg.Roots)
			if err != nil {
				return err
			}

			entries, _ := store.All()
			sortMethod := ranking.Method(cfg.Sorting.Method)
			if flagSort != "" {
				sortMethod = ranking.Method(flagSort)
			}
			sorted := ranking.Sort(projects, entries, sortMethod)

			for _, p := range sorted {
				entry := entries[p.Path]
				dateStr := p.Timestamp.Format(cfg.Appearance.DateFormat)

				pin := " "
				if entry.Pinned {
					pin = "*"
				}

				fmt.Printf("%s %-35s [%s]  %s\n", pin, p.Name, dateStr, p.Path)
			}
			return nil
		},
	}
}

func newPinCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "pin [project-path]",
		Short: "Pin a project to the top of the list",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			store, err := history.Open()
			if err != nil {
				return err
			}
			defer store.Close()

			path := args[0]
			if err := store.Pin(path); err != nil {
				return err
			}
			fmt.Printf("Pinned: %s\n", path)
			return nil
		},
	}
}

func newUnpinCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "unpin [project-path]",
		Short: "Unpin a project",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			store, err := history.Open()
			if err != nil {
				return err
			}
			defer store.Close()

			if err := store.Unpin(args[0]); err != nil {
				return err
			}
			fmt.Printf("Unpinned: %s\n", args[0])
			return nil
		},
	}
}

func newConfigCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "config",
		Short: "Show current configuration",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Load()
			if err != nil {
				return err
			}

			fmt.Printf("Config file: %s\n\n", config.ConfigPath())
			fmt.Printf("Terminal:    %s\n", cfg.DefaultTerminal)
			fmt.Printf("Editor:      %s\n", cfg.DefaultEditor)
			fmt.Printf("Layout:      %s\n", cfg.DefaultLayout)
			fmt.Printf("Sort:        %s\n", cfg.Sorting.Method)
			fmt.Printf("Date format: %s\n", cfg.Appearance.DateFormat)
			fmt.Println("\nRoots:")
			for _, r := range cfg.Roots {
				fmt.Printf("  %s (depth: %d)\n", r.Path, r.Depth)
			}
			return nil
		},
	}
}

func newVersionCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "version",
		Short: "Print version information",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Printf("son %s\n", config.Version)
		},
	}
}

func newCompletionCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "completion [bash|zsh|fish|powershell]",
		Short: "Generate shell completion scripts",
		Long: `Generate shell completion scripts for son.

To load completions:

Bash:
  $ source <(son completion bash)
  # or add to ~/.bashrc:
  $ son completion bash > /etc/bash_completion.d/son

Zsh:
  $ source <(son completion zsh)
  # or add to fpath:
  $ son completion zsh > "${fpath[1]}/_son"

Fish:
  $ son completion fish | source
  # or save:
  $ son completion fish > ~/.config/fish/completions/son.fish
`,
		ValidArgs: []string{"bash", "zsh", "fish", "powershell"},
		Args:      cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			root := cmd.Root()
			switch args[0] {
			case "bash":
				return root.GenBashCompletion(os.Stdout)
			case "zsh":
				return root.GenZshCompletion(os.Stdout)
			case "fish":
				return root.GenFishCompletion(os.Stdout, true)
			case "powershell":
				return root.GenPowerShellCompletionWithDesc(os.Stdout)
			default:
				return fmt.Errorf("unsupported shell: %s", args[0])
			}
		},
	}
	return cmd
}
