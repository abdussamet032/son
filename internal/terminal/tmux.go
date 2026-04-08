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

func (t *Tmux) Open(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig) error {
	sessionName := sanitizeSessionName(projectPath)

	// Check if session exists
	checkCmd := exec.Command("tmux", "has-session", "-t", sessionName)
	if checkCmd.Run() == nil {
		// Session exists, attach to it
		return attachSession(sessionName)
	}

	// Create new session
	newCmd := exec.Command("tmux", "new-session", "-d", "-s", sessionName, "-c", projectPath)
	if err := newCmd.Run(); err != nil {
		return fmt.Errorf("failed to create tmux session: %w", err)
	}

	// Set window name to project name
	exec.Command("tmux", "rename-window", "-t", sessionName, projectName).Run()

	// Run hook for first pane
	hook0 := hookForPane(hooks, 1)
	if hook0 != "" {
		exec.Command("tmux", "send-keys", "-t", sessionName, hook0, "Enter").Run()
	}

	paneCount := len(l.Panes)

	if paneCount >= 2 {
		// Vertical split
		exec.Command("tmux", "split-window", "-h", "-t", sessionName, "-c", projectPath).Run()
		hook1 := hookForPane(hooks, 2)
		if hook1 != "" {
			exec.Command("tmux", "send-keys", "-t", sessionName, hook1, "Enter").Run()
		}
	}

	if paneCount >= 3 {
		// Horizontal split on right pane
		exec.Command("tmux", "split-window", "-v", "-t", sessionName, "-c", projectPath).Run()
		hook2 := hookForPane(hooks, 3)
		if hook2 != "" {
			exec.Command("tmux", "send-keys", "-t", sessionName, hook2, "Enter").Run()
		}
	}

	if paneCount >= 4 {
		// Select first pane and split horizontally
		exec.Command("tmux", "select-pane", "-t", sessionName+":0.0").Run()
		exec.Command("tmux", "split-window", "-v", "-t", sessionName, "-c", projectPath).Run()
		hook3 := hookForPane(hooks, 4)
		if hook3 != "" {
			exec.Command("tmux", "send-keys", "-t", sessionName, hook3, "Enter").Run()
		}
	}

	// Select first pane
	exec.Command("tmux", "select-pane", "-t", sessionName+":0.0").Run()

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
