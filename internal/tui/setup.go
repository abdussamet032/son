package tui

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/editor"
	"github.com/abdussamet032/son/internal/layout"
	"github.com/abdussamet032/son/internal/terminal"
	"github.com/charmbracelet/huh"
)

func RunSetup() error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	// --- Terminal ---
	termOptions := []huh.Option[string]{
		huh.NewOption("Auto (otomatik algıla)", "auto"),
	}
	for _, t := range terminal.Available() {
		label := terminalLabel(t)
		termOptions = append(termOptions, huh.NewOption(label, t))
	}

	// --- Editor ---
	editorOptions := []huh.Option[string]{
		huh.NewOption("Yok (editör açma)", ""),
	}
	for _, e := range editor.Available() {
		label := editorLabel(e)
		editorOptions = append(editorOptions, huh.NewOption(label, e))
	}
	// Add all known editors even if not installed, so user can pick
	allEditors := []string{"code", "cursor", "zed", "nvim", "vim", "subl", "idea"}
	installedSet := make(map[string]bool)
	for _, e := range editor.Available() {
		installedSet[e] = true
	}
	for _, e := range allEditors {
		if !installedSet[e] {
			label := editorLabel(e) + " (yüklü değil)"
			editorOptions = append(editorOptions, huh.NewOption(label, e))
		}
	}

	// --- Layout ---
	layoutOptions := make([]huh.Option[string], 0, len(layout.Names()))
	for _, name := range layout.Names() {
		label := layoutLabel(name)
		layoutOptions = append(layoutOptions, huh.NewOption(label, name))
	}

	// --- Sort ---
	sortOptions := []huh.Option[string]{
		huh.NewOption("Frecency — sık + son kullanılan önce", "frecency"),
		huh.NewOption("Değiştirilme zamanı — en yeni önce", "mtime"),
		huh.NewOption("Alfabetik — A-Z sıralama", "alpha"),
	}

	// --- Roots (as comma-separated text) ---
	rootsStr := rootsToString(cfg.Roots)

	// --- Appearance ---
	showPath := cfg.Appearance.ShowPath
	dateFormat := cfg.Appearance.DateFormat

	// Build the form
	form := huh.NewForm(
		huh.NewGroup(
			huh.NewNote().
				Title("son setup").
				Description("Workspace launcher ayarlarını düzenle.\nOk tuşları ile seç, Enter ile onayla."),
		).Title(""),

		huh.NewGroup(
			huh.NewSelect[string]().
				Title("Terminal").
				Description("Proje açıldığında hangi terminal kullanılsın?").
				Options(termOptions...).
				Value(&cfg.DefaultTerminal),

			huh.NewSelect[string]().
				Title("Editör").
				Description("Proje açıldığında hangi editör başlasın?").
				Options(editorOptions...).
				Value(&cfg.DefaultEditor),
		).Title("Temel Ayarlar"),

		huh.NewGroup(
			huh.NewSelect[string]().
				Title("Panel Düzeni (Layout)").
				Description("Terminalde kaç panel açılsın?\n").
				Options(layoutOptions...).
				Value(&cfg.DefaultLayout),

			huh.NewSelect[string]().
				Title("Sıralama").
				Description("Proje listesi nasıl sıralansın?").
				Options(sortOptions...).
				Value(&cfg.Sorting.Method),
		).Title("Düzen & Sıralama"),

		huh.NewGroup(
			huh.NewText().
				Title("Proje Klasörleri (Roots)").
				Description("Her satıra bir klasör yaz. Derinlik: ile tarama derinliğini belirle.\nÖrnek: ~/dev:2 veya ~/projects:1").
				Value(&rootsStr).
				CharLimit(500),
		).Title("Proje Klasörleri"),

		huh.NewGroup(
			huh.NewConfirm().
				Title("Tam yolu göster").
				Description("Proje listesinde dosya yolunu göster?").
				Value(&showPath),

			huh.NewInput().
				Title("Tarih formatı").
				Description("Go time format (örn: 02 Jan 15:04)").
				Value(&dateFormat),
		).Title("Görünüm"),

	).WithTheme(huh.ThemeDracula())

	err = form.Run()
	if err != nil {
		return fmt.Errorf("form error: %w", err)
	}

	// Parse roots back
	parsedRoots := parseRootsString(rootsStr)
	if len(parsedRoots) == 0 {
		home, _ := os.UserHomeDir()
		parsedRoots = []config.Root{{Path: filepath.Join(home, "dev"), Depth: 2}}
	}

	cfg.Roots = parsedRoots
	cfg.Appearance.ShowPath = showPath
	cfg.Appearance.DateFormat = dateFormat

	// Save
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("save error: %w", err)
	}

	fmt.Printf("\n✓ Ayarlar kaydedildi: %s\n", config.ConfigPath())
	printSummary(cfg)
	return nil
}

func rootsToString(roots []config.Root) string {
	var lines []string
	for _, r := range roots {
		path := contractHome(r.Path)
		lines = append(lines, fmt.Sprintf("%s:%d", path, r.Depth))
	}
	return strings.Join(lines, "\n")
}

func parseRootsString(s string) []config.Root {
	var roots []config.Root
	for _, line := range strings.Split(s, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		depth := 2
		path := line

		// Check for :N suffix
		if idx := strings.LastIndex(line, ":"); idx > 0 {
			suffix := line[idx+1:]
			if suffix == "1" {
				depth = 1
				path = line[:idx]
			} else if suffix == "2" {
				depth = 2
				path = line[:idx]
			}
		}

		roots = append(roots, config.Root{
			Path:  expandHome(path),
			Depth: depth,
		})
	}
	return roots
}

func contractHome(path string) string {
	home, _ := os.UserHomeDir()
	if strings.HasPrefix(path, home) {
		return "~" + path[len(home):]
	}
	return path
}

func expandHome(path string) string {
	if strings.HasPrefix(path, "~/") {
		home, _ := os.UserHomeDir()
		return filepath.Join(home, path[2:])
	}
	return path
}

func terminalLabel(name string) string {
	switch name {
	case "iterm":
		return "iTerm2"
	case "tmux":
		return "tmux"
	case "wezterm":
		return "WezTerm"
	default:
		return name
	}
}

func editorLabel(name string) string {
	switch name {
	case "code":
		return "VS Code"
	case "cursor":
		return "Cursor"
	case "zed":
		return "Zed"
	case "nvim":
		return "Neovim"
	case "vim":
		return "Vim"
	case "subl":
		return "Sublime Text"
	case "idea":
		return "IntelliJ IDEA"
	default:
		return name
	}
}

func layoutLabel(name string) string {
	switch name {
	case "single":
		return "Single — 1 panel  ┃"
	case "split":
		return "Split  — 2 panel  ┃┃"
	case "3-pane":
		return "3-Pane — 3 panel  ┃┣"
	case "grid":
		return "Grid   — 4 panel  ╋"
	default:
		return name
	}
}

func printSummary(cfg config.Config) {
	fmt.Println()
	fmt.Printf("  Terminal:  %s\n", cfg.DefaultTerminal)
	if cfg.DefaultEditor != "" {
		fmt.Printf("  Editör:   %s\n", editorLabel(cfg.DefaultEditor))
	} else {
		fmt.Printf("  Editör:   (yok)\n")
	}
	fmt.Printf("  Layout:   %s\n", layoutLabel(cfg.DefaultLayout))
	fmt.Printf("  Sıralama: %s\n", cfg.Sorting.Method)
	fmt.Printf("  Klasörler:\n")
	for _, r := range cfg.Roots {
		fmt.Printf("    %s (derinlik: %d)\n", contractHome(r.Path), r.Depth)
	}
	fmt.Println()
}
