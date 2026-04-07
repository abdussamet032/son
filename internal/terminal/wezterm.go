package terminal

import (
	"fmt"
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

func (t *WezTerm) Open(projectPath string, l layout.Layout, hooks []config.HookConfig) error {
	// Spawn initial pane
	out, err := exec.Command("wezterm", "cli", "spawn", "--cwd", projectPath).Output()
	if err != nil {
		return fmt.Errorf("failed to spawn WezTerm pane: %w", err)
	}
	firstPaneID := parseWezTermPaneID(out)

	// Run hook for first pane
	hook0 := hookForPane(hooks, 1)
	if hook0 != "" {
		exec.Command("wezterm", "cli", "send-text", "--pane-id", firstPaneID, hook0+"\n").Run()
	}

	paneCount := len(l.Panes)

	if paneCount >= 2 {
		// Split right
		out2, err := exec.Command("wezterm", "cli", "split-pane", "--right",
			"--cwd", projectPath, "--pane-id", firstPaneID, "--percent", "50").Output()
		if err == nil {
			rightPaneID := parseWezTermPaneID(out2)
			hook1 := hookForPane(hooks, 2)
			if hook1 != "" {
				exec.Command("wezterm", "cli", "send-text", "--pane-id", rightPaneID, hook1+"\n").Run()
			}

			if paneCount >= 3 {
				// Split bottom of right pane
				out3, err := exec.Command("wezterm", "cli", "split-pane", "--bottom",
					"--cwd", projectPath, "--pane-id", rightPaneID, "--percent", "50").Output()
				if err == nil {
					bottomPaneID := parseWezTermPaneID(out3)
					hook2 := hookForPane(hooks, 3)
					if hook2 != "" {
						exec.Command("wezterm", "cli", "send-text", "--pane-id", bottomPaneID, hook2+"\n").Run()
					}
				}
			}
		}
	}

	if paneCount >= 4 {
		// Split bottom of left pane
		out4, err := exec.Command("wezterm", "cli", "split-pane", "--bottom",
			"--cwd", projectPath, "--pane-id", firstPaneID, "--percent", "50").Output()
		if err == nil {
			bottomLeftID := parseWezTermPaneID(out4)
			hook3 := hookForPane(hooks, 4)
			if hook3 != "" {
				exec.Command("wezterm", "cli", "send-text", "--pane-id", bottomLeftID, hook3+"\n").Run()
			}
		}
	}

	// Activate the first pane
	exec.Command("wezterm", "cli", "activate-pane", "--pane-id", firstPaneID).Run()

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
