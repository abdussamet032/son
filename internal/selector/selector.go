package selector

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/discovery"
	"github.com/abdussamet032/son/internal/history"
)

type Result struct {
	Project discovery.Project
	Index   int
}

func Select(projects []discovery.Project, cfg config.Config, entries map[string]history.Entry) (*Result, error) {
	if len(projects) == 0 {
		return nil, fmt.Errorf("no projects found")
	}

	// Build fzf input
	var lines []string
	for i, p := range projects {
		entry := entries[p.Path]

		dateStr := p.Timestamp.Format(cfg.Appearance.DateFormat)

		var prefix string
		if entry.Pinned {
			prefix = "* "
		} else {
			prefix = "  "
		}

		line := fmt.Sprintf("%s%-35s [%s]", prefix, p.Name, dateStr)
		if cfg.Appearance.ShowPath {
			line += fmt.Sprintf("\t%d\t%s", i, p.Path)
		} else {
			line += fmt.Sprintf("\t%d\t%s", i, p.Path)
		}

		lines = append(lines, line)
	}

	input := strings.Join(lines, "\n")

	// Run fzf
	cmd := exec.Command("fzf",
		"--prompt", "Select project > ",
		"--height", "40%",
		"--no-preview",
		"--delimiter", "\t",
		"--with-nth", "1",
		"--ansi",
	)
	cmd.Stdin = strings.NewReader(input)
	cmd.Stderr = os.Stderr

	out, err := cmd.Output()
	if err != nil {
		return nil, nil // user cancelled
	}

	// Parse selection
	selected := strings.TrimSpace(string(out))
	parts := strings.Split(selected, "\t")
	if len(parts) < 3 {
		return nil, nil
	}

	var idx int
	fmt.Sscanf(parts[1], "%d", &idx)

	if idx < 0 || idx >= len(projects) {
		return nil, nil
	}

	return &Result{
		Project: projects[idx],
		Index:   idx,
	}, nil
}
