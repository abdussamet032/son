package cmd

import (
	"fmt"
	"sort"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/discovery"
	"github.com/abdussamet032/son/internal/services"
	"github.com/charmbracelet/huh"
	"github.com/spf13/cobra"
)

func newPsCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "ps",
		Aliases: []string{"services"},
		Short:   "List local running services and stop selected ones",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Load()
			if err != nil {
				return err
			}

			projects, _ := discovery.Discover(cfg.Roots)
			projectPaths := make(map[string]string, len(projects))
			for _, p := range projects {
				projectPaths[p.Path] = p.Name
			}

			items, err := services.List(projectPaths)
			if err != nil {
				return err
			}
			if len(items) == 0 {
				fmt.Println("Çalışan servis yok.")
				return nil
			}

			sort.SliceStable(items, func(i, j int) bool {
				if items[i].Project != items[j].Project {
					if items[i].Project == "" {
						return false
					}
					if items[j].Project == "" {
						return true
					}
					return items[i].Project < items[j].Project
				}
				return items[i].Name < items[j].Name
			})

			printList(items)
			fmt.Println()

			options := make([]huh.Option[int], 0, len(items))
			for i, s := range items {
				options = append(options, huh.NewOption(formatLine(s), i))
			}

			var selected []int
			form := huh.NewForm(
				huh.NewGroup(
					huh.NewMultiSelect[int]().
						Title("Durdurulacak servisler").
						Description("Boşluk: seç · Enter: onayla · Esc: çık").
						Options(options...).
						Value(&selected),
				),
			).WithTheme(huh.ThemeDracula())

			if err := form.Run(); err != nil {
				return nil
			}
			if len(selected) == 0 {
				return nil
			}

			for _, idx := range selected {
				s := items[idx]
				if err := services.Stop(s); err != nil {
					fmt.Printf("✗ %s — %v\n", s.Name, err)
					continue
				}
				fmt.Printf("✓ %s durduruldu\n", s.Name)
			}
			return nil
		},
	}
}

func printList(items []services.Service) {
	maxName, maxProject := 4, 7
	for _, s := range items {
		if l := len(s.Name); l > maxName {
			maxName = l
		}
		if l := len(s.Project); l > maxProject {
			maxProject = l
		}
	}

	header := fmt.Sprintf("%-7s  %-*s  %-7s  %s", "TYPE", maxName, "NAME", "PORT", "PROJECT")
	fmt.Println(header)
	fmt.Println(strings.Repeat("─", len(header)))
	for _, s := range items {
		port := "-"
		if s.Port > 0 {
			port = fmt.Sprintf("%d", s.Port)
		}
		project := s.Project
		if project == "" {
			project = "-"
		}
		fmt.Printf("%-7s  %-*s  %-7s  %s\n", s.Type, maxName, s.Name, port, project)
	}
}

func formatLine(s services.Service) string {
	port := "-"
	if s.Port > 0 {
		port = fmt.Sprintf(":%d", s.Port)
	}
	project := s.Project
	if project == "" {
		project = "-"
	}
	return fmt.Sprintf("%-7s  %-28s  %-8s  %s", s.Type, truncate(s.Name, 28), port, project)
}

func truncate(s string, n int) string {
	if len(s) <= n {
		return s
	}
	return s[:n-1] + "…"
}
