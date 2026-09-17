package terminal

import (
	"strings"
	"testing"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/layout"
)

func TestBuildAppleScript(t *testing.T) {
	hooks := []config.HookConfig{{Pane: 3, Command: `echo "hi"`}}
	script := buildAppleScript(`/src/it's "here"`, "org/app", layout.Get("grid"), hooks, "same_window")

	for _, want := range []string{
		"set p1 to current session of current window",
		"tell p1 to set p2 to (split vertically with default profile)",
		"tell p2 to set p3 to (split horizontally with default profile)",
		"tell p1 to set p4 to (split horizontally with default profile)",
		`write text "cd '/src/it'\\''s \"here\"' && clear && echo \"hi\""`,
		"tell p1 to select",
	} {
		if !strings.Contains(script, want) {
			t.Errorf("script is missing %q:\n%s", want, script)
		}
	}
	if strings.Contains(script, "p5") {
		t.Errorf("grid should have 4 panes:\n%s", script)
	}

	script = buildAppleScript("/src/app", "app", layout.Get("single"), nil, "new_window")
	if !strings.Contains(script, "create window with default profile") || strings.Contains(script, "split") {
		t.Errorf("single pane in new window:\n%s", script)
	}
}
