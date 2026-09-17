package terminal

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/layout"
)

type Tmux struct{}

func (t *Tmux) Name() string { return "tmux" }

func (t *Tmux) Available() bool {
	return hasCommand("tmux")
}

func (t *Tmux) Open(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig, openMode string) error {
	sessionName := sanitizeSessionName(projectPath)

	// Check if session exists
	checkCmd := exec.Command("tmux", "has-session", "-t", sessionName)
	if checkCmd.Run() == nil {
		// Session exists, attach to it
		return attachSession(sessionName)
	}

	// Create new session
	out, err := exec.Command("tmux", "new-session", "-d", "-s", sessionName, "-c", projectPath,
		"-P", "-F", "#{pane_id}").Output()
	if err != nil {
		return fmt.Errorf("failed to create tmux session: %w", err)
	}
	paneIDs := []string{strings.TrimSpace(string(out))}

	// Set window name to project name
	exec.Command("tmux", "rename-window", "-t", sessionName, projectName).Run()

	for i, p := range l.Panes {
		if i > 0 {
			flag := "-h"
			if p.Dir == layout.Down {
				flag = "-v"
			}
			out, err := exec.Command("tmux", "split-window", flag, "-t", paneIDs[p.Parent],
				"-l", fmt.Sprintf("%d%%", p.Percent), "-c", projectPath, "-P", "-F", "#{pane_id}").Output()
			if err != nil {
				// Later panes may split this one, so stop here.
				fmt.Fprintf(os.Stderr, "Warning: could only create %d of %d tmux panes: %v\n", i, len(l.Panes), err)
				break
			}
			paneIDs = append(paneIDs, strings.TrimSpace(string(out)))
		}

		if hook := hookForPane(hooks, i+1); hook != "" {
			exec.Command("tmux", "send-keys", "-t", paneIDs[i], hook, "Enter").Run()
		}
	}

	// Select first pane
	exec.Command("tmux", "select-pane", "-t", paneIDs[0]).Run()

	return attachSession(sessionName)
}

func attachSession(name string) error {
	// If already in tmux, switch client
	if os.Getenv("TMUX") != "" {
		cmd := exec.Command("tmux", "switch-client", "-t", name)
		cmd.Stdin = os.Stdin
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		return cmd.Run()
	}

	cmd := exec.Command("tmux", "attach-session", "-t", name)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func sanitizeSessionName(path string) string {
	// Use last two path components as session name
	parts := strings.Split(strings.TrimRight(path, "/"), "/")
	var name string
	if len(parts) >= 2 {
		name = parts[len(parts)-2] + "/" + parts[len(parts)-1]
	} else {
		name = parts[len(parts)-1]
	}
	// tmux doesn't allow dots or colons in session names
	name = strings.ReplaceAll(name, ".", "-")
	name = strings.ReplaceAll(name, ":", "-")
	return name
}
