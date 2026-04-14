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

func buildAppleScript(projectPath string, projectName string, l layout.Layout, hooks []config.HookConfig, openMode string) string {
	var sb strings.Builder

	escapedName := strings.ReplaceAll(projectName, `"`, `\"`)
	paneCount := len(l.Panes)

	if openMode == "same_window" {
		// Use existing frontmost window/session
		sb.WriteString(`tell application "iTerm"
  activate
  tell current session of first window
    set name to "` + escapedName + `"
`)

		// First pane commands
		hook0 := hookForPane(hooks, 1)
		cmd0 := fmt.Sprintf("cd '%s' && clear", projectPath)
		if hook0 != "" {
			cmd0 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook0)
		}
		sb.WriteString("    write text \"" + cmd0 + "\"\n")

		if paneCount >= 2 {
			hook1 := hookForPane(hooks, 2)
			cmd1 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook1 != "" {
				cmd1 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook1)
			}
			sb.WriteString(`    set sp2 to (split vertically with default profile)
    tell sp2
      write text "` + cmd1 + `"
    end tell
`)
		}

		if paneCount >= 3 {
			hook2 := hookForPane(hooks, 3)
			cmd2 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook2 != "" {
				cmd2 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook2)
			}
			sb.WriteString(`    set sp3 to (split horizontally with default profile)
    tell sp3
      write text "` + cmd2 + `"
    end tell
`)
		}

		if paneCount >= 4 {
			hook3 := hookForPane(hooks, 4)
			cmd3 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook3 != "" {
				cmd3 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook3)
			}
			sb.WriteString(`    set sp4 to (split horizontally with default profile)
    tell sp4
      write text "` + cmd3 + `"
    end tell
`)
		}

		sb.WriteString("  end tell\nend tell\n")

	} else {
		// Create new window (default behavior)
		sb.WriteString(`tell application "iTerm"
  activate
  set newWindow to (create window with default profile)
  set bounds of newWindow to {100, 50, 1700, 1000}
`)

		// First pane
		hook0 := hookForPane(hooks, 1)
		cmd0 := fmt.Sprintf("cd '%s' && clear", projectPath)
		if hook0 != "" {
			cmd0 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook0)
		}
		sb.WriteString(fmt.Sprintf(`  tell current session of newWindow
    set name to "%s"
    write text "%s"
  end tell
`, escapedName, cmd0))

		if paneCount >= 2 {
			hook1 := hookForPane(hooks, 2)
			cmd1 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook1 != "" {
				cmd1 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook1)
			}
			sb.WriteString(fmt.Sprintf(`  tell current session of newWindow
    set sp2 to (split vertically with default profile)
    tell sp2
      write text "%s"
    end tell
  end tell
`, cmd1))
		}

		if paneCount >= 3 {
			hook2 := hookForPane(hooks, 3)
			cmd2 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook2 != "" {
				cmd2 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook2)
			}
			sb.WriteString(fmt.Sprintf(`  tell current session of newWindow
    set sp3 to (split horizontally with default profile)
    tell sp3
      write text "%s"
    end tell
  end tell
`, cmd2))
		}

		if paneCount >= 4 {
			hook3 := hookForPane(hooks, 4)
			cmd3 := fmt.Sprintf("cd '%s' && clear", projectPath)
			if hook3 != "" {
				cmd3 = fmt.Sprintf("cd '%s' && clear && %s", projectPath, hook3)
			}
			sb.WriteString(fmt.Sprintf(`  tell first session of first tab of newWindow
    set sp4 to (split horizontally with default profile)
    tell sp4
      write text "%s"
    end tell
  end tell
`, cmd3))
		}

		sb.WriteString("end tell\n")
	}

	return sb.String()
}
