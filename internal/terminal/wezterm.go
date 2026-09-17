package terminal

import (
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/layout"
)

type WezTerm struct{}

func (t *WezTerm) Name() string { return "wezterm" }

func (t *WezTerm) Available() bool {
	return hasCommand("wezterm")
}

func (t *WezTerm) Open(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig, openMode string) error {
	// Spawn initial pane
	spawnArgs := []string{"cli", "spawn", "--cwd", projectPath}
	if openMode == "new_window" {
		spawnArgs = append(spawnArgs, "--new-window")
	}
	out, err := exec.Command("wezterm", spawnArgs...).Output()
	if err != nil {
		return fmt.Errorf("failed to spawn WezTerm pane: %w", err)
	}
	paneIDs := []string{parseWezTermPaneID(out)}

	for i, p := range l.Panes {
		if i > 0 {
			side := "--right"
			if p.Dir == layout.Down {
				side = "--bottom"
			}
			out, err := exec.Command("wezterm", "cli", "split-pane", side,
				"--cwd", projectPath, "--pane-id", paneIDs[p.Parent], "--percent", strconv.Itoa(p.Percent)).Output()
			if err != nil {
				// Later panes may split this one, so stop here.
				fmt.Fprintf(os.Stderr, "Warning: could only create %d of %d WezTerm panes: %v\n", i, len(l.Panes), err)
				break
			}
			paneIDs = append(paneIDs, parseWezTermPaneID(out))
		}

		if hook := hookForPane(hooks, i+1); hook != "" {
			exec.Command("wezterm", "cli", "send-text", "--pane-id", paneIDs[i], hook+"\n").Run()
		}
	}

	// Set tab title to project name
	exec.Command("wezterm", "cli", "set-tab-title", projectName, "--pane-id", paneIDs[0]).Run()

	// Activate the first pane
	exec.Command("wezterm", "cli", "activate-pane", "--pane-id", paneIDs[0]).Run()

	return nil
}

func parseWezTermPaneID(output []byte) string {
	s := string(output)
	// wezterm cli spawn returns the pane ID as a number
	for _, c := range s {
		if c < '0' || c > '9' {
			break
		}
	}
	// Try to parse as int to validate
	id := strings.TrimSpace(s)
	if _, err := strconv.Atoi(id); err == nil {
		return id
	}
	return "0"
}
