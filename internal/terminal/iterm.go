package terminal

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/layout"
)

type ITerm struct{}

func (t *ITerm) Name() string { return "iterm" }

func (t *ITerm) Available() bool {
	return runtime.GOOS == "darwin" && hasCommand("osascript")
}

func (t *ITerm) Open(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig, openMode string) error {
	script := buildAppleScript(projectPath, projectName, l, hooks, openMode)
	cmd := exec.Command("osascript", "-e", script)
	return cmd.Run()
}

// buildAppleScript keeps every pane in its own variable (p1, p2, ...) so each
// split targets an exact session instead of whichever one has focus.
// iTerm's AppleScript API can't size splits, so each split halves its parent.
func buildAppleScript(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig, openMode string) string {
	var sb strings.Builder

	sb.WriteString("tell application \"iTerm\"\n  activate\n")
	if openMode == "same_window" {
		sb.WriteString("  if (count of windows) = 0 then create window with default profile\n")
		sb.WriteString("  set p1 to current session of current window\n")
	} else {
		sb.WriteString("  set newWindow to (create window with default profile)\n")
		sb.WriteString("  set bounds of newWindow to {100, 50, 1700, 1000}\n")
		sb.WriteString("  set p1 to current session of newWindow\n")
	}

	name := appleScriptString(projectName)
	for i, p := range l.Panes {
		if i > 0 {
			split := "split vertically"
			if p.Dir == layout.Down {
				split = "split horizontally"
			}
			fmt.Fprintf(&sb, "  tell p%d to set p%d to (%s with default profile)\n", p.Parent+1, i+1, split)
		}

		cmd := "cd " + shellQuote(projectPath) + " && clear"
		if hook := hookForPane(hooks, i+1); hook != "" {
			cmd += " && " + hook
		}
		fmt.Fprintf(&sb, "  tell p%d\n    set name to %s\n    write text %s\n  end tell\n", i+1, name, appleScriptString(cmd))
	}

	sb.WriteString("  tell p1 to select\nend tell\n")
	return sb.String()
}

func appleScriptString(s string) string {
	s = strings.ReplaceAll(s, `\`, `\\`)
	s = strings.ReplaceAll(s, `"`, `\"`)
	return `"` + s + `"`
}
