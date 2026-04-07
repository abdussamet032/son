package editor

import (
	"fmt"
	"os"
	"os/exec"
)

var editors = map[string][]string{
	"code":   {"code", "."},
	"cursor": {"cursor", "."},
	"zed":    {"zed", "."},
	"nvim":   {"nvim", "."},
	"vim":    {"vim", "."},
	"subl":   {"subl", "."},
	"idea":   {"idea", "."},
}

func Open(editorName, projectPath string) error {
	if editorName == "" {
		return nil
	}

	args, ok := editors[editorName]
	if !ok {
		// Try as raw command
		args = []string{editorName, "."}
	}

	if _, err := exec.LookPath(args[0]); err != nil {
		return fmt.Errorf("editor %q not found in PATH", args[0])
	}

	cmd := exec.Command(args[0], args[1:]...)
	cmd.Dir = projectPath
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Start() // Don't wait for editor to close
}

func Available() []string {
	var avail []string
	for name, args := range editors {
		if _, err := exec.LookPath(args[0]); err == nil {
			avail = append(avail, name)
		}
	}
	return avail
}
