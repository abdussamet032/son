package terminal

import (
	"fmt"
	"os/exec"
	"runtime"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/layout"
)

type Terminal interface {
	Name() string
	Available() bool
	Open(projectPath string, projectName string, layout layout.Layout, hooks []config.HookConfig) error
}

func Get(name string) (Terminal, error) {
	adapters := []Terminal{
		&ITerm{},
		&Tmux{},
		&WezTerm{},
	}

	if name == "auto" {
		return detect(adapters)
	}

	for _, a := range adapters {
		if a.Name() == name {
			if !a.Available() {
				return nil, fmt.Errorf("%s is not available on this system", name)
			}
			return a, nil
		}
	}

	return nil, fmt.Errorf("unknown terminal: %s (available: iterm, tmux, wezterm)", name)
}

func detect(adapters []Terminal) (Terminal, error) {
	// On macOS, prefer iTerm
	if runtime.GOOS == "darwin" {
		for _, a := range adapters {
			if a.Name() == "iterm" && a.Available() {
				return a, nil
			}
		}
	}

	// Try tmux if we're already in a tmux session or it's available
	for _, a := range adapters {
		if a.Name() == "tmux" && a.Available() {
			return a, nil
		}
	}

	// Try wezterm
	for _, a := range adapters {
		if a.Name() == "wezterm" && a.Available() {
			return a, nil
		}
	}

	return nil, fmt.Errorf("no supported terminal found. Install iTerm2 (macOS), tmux, or WezTerm")
}

func Available() []string {
	adapters := []Terminal{&ITerm{}, &Tmux{}, &WezTerm{}}
	var names []string
	for _, a := range adapters {
		if a.Available() {
			names = append(names, a.Name())
		}
	}
	return names
}

func hookForPane(hooks []config.HookConfig, pane int) string {
	for _, h := range hooks {
		if h.Pane == pane {
			return h.Command
		}
	}
	return ""
}

func hasCommand(name string) bool {
	_, err := exec.LookPath(name)
	return err == nil
}
