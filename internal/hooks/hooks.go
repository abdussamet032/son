package hooks

import (
	"github.com/abdussamet032/son/internal/config"
)

// Merge merges project-level hooks with any defaults.
// Project hooks take priority.
func Merge(projectHooks []config.HookConfig) []config.HookConfig {
	if len(projectHooks) == 0 {
		return nil
	}
	return projectHooks
}

// ForPanes returns a map of pane number -> command.
func ForPanes(hooks []config.HookConfig) map[int]string {
	m := make(map[int]string)
	for _, h := range hooks {
		if h.Pane > 0 && h.Command != "" {
			m[h.Pane] = h.Command
		}
	}
	return m
}
