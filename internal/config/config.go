package config

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/BurntSushi/toml"
)

var Version = "dev"

type Root struct {
	Path  string `toml:"path"`
	Depth int    `toml:"depth"`
}

type SortingConfig struct {
	Method string `toml:"method"` // frecency, mtime, alpha
}

type AppearanceConfig struct {
	DateFormat string `toml:"date_format"`
	ShowPath   bool   `toml:"show_path"`
}

type Config struct {
	DefaultTerminal string           `toml:"default_terminal"` // iterm, tmux, wezterm, auto
	DefaultEditor   string           `toml:"default_editor"`   // code, cursor, zed, nvim, vim
	DefaultLayout   string           `toml:"default_layout"`   // single, split, 3-pane, grid
	Roots           []Root           `toml:"roots"`
	Sorting         SortingConfig    `toml:"sorting"`
	Appearance      AppearanceConfig `toml:"appearance"`
}

type ProjectConfig struct {
	Layout   string       `toml:"layout"`
	Terminal string       `toml:"terminal"`
	Editor   string       `toml:"editor"`
	Hooks    []HookConfig `toml:"hooks"`
	Pin      bool         `toml:"pin"`
}

type HookConfig struct {
	Pane    int    `toml:"pane"`
	Command string `toml:"command"`
}

func DefaultConfig() Config {
	home, _ := os.UserHomeDir()
	return Config{
		DefaultTerminal: "auto",
		DefaultEditor:   "",
		DefaultLayout:   "3-pane",
		Roots: []Root{
			{Path: filepath.Join(home, "dev"), Depth: 2},
		},
		Sorting: SortingConfig{
			Method: "frecency",
		},
		Appearance: AppearanceConfig{
			DateFormat: "02 Jan 15:04",
			ShowPath:   true,
		},
	}
}

func ConfigDir() string {
	if xdg := os.Getenv("XDG_CONFIG_HOME"); xdg != "" {
		return filepath.Join(xdg, "son")
	}
	home, _ := os.UserHomeDir()
	return filepath.Join(home, ".config", "son")
}

func DataDir() string {
	if xdg := os.Getenv("XDG_DATA_HOME"); xdg != "" {
		return filepath.Join(xdg, "son")
	}
	home, _ := os.UserHomeDir()
	return filepath.Join(home, ".local", "share", "son")
}

func ConfigPath() string {
	return filepath.Join(ConfigDir(), "config.toml")
}

func Load() (Config, error) {
	cfg := DefaultConfig()
	path := ConfigPath()

	if _, err := os.Stat(path); os.IsNotExist(err) {
		return cfg, nil
	}

	_, err := toml.DecodeFile(path, &cfg)
	if err != nil {
		return cfg, fmt.Errorf("config parse error: %w", err)
	}

	// Expand ~ in root paths
	for i, r := range cfg.Roots {
		cfg.Roots[i].Path = expandHome(r.Path)
		if cfg.Roots[i].Depth == 0 {
			cfg.Roots[i].Depth = 2
		}
	}

	return cfg, nil
}

func LoadProjectConfig(projectPath string) (*ProjectConfig, error) {
	path := filepath.Join(projectPath, ".son.toml")
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return nil, nil
	}

	var pc ProjectConfig
	_, err := toml.DecodeFile(path, &pc)
	if err != nil {
		return nil, fmt.Errorf("project config error: %w", err)
	}
	return &pc, nil
}

func Init() error {
	dir := ConfigDir()
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return err
	}

	path := ConfigPath()
	if _, err := os.Stat(path); err == nil {
		return fmt.Errorf("config already exists at %s", path)
	}

	cfg := DefaultConfig()
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()

	enc := toml.NewEncoder(f)
	return enc.Encode(cfg)
}

func Doctor() []string {
	var issues []string

	// Check OS
	if runtime.GOOS != "darwin" && runtime.GOOS != "linux" {
		issues = append(issues, fmt.Sprintf("⚠ Unsupported OS: %s (supported: macOS, Linux)", runtime.GOOS))
	}

	// Check fzf
	if _, err := exec.LookPath("fzf"); err != nil {
		issues = append(issues, "✗ fzf not found — install: brew install fzf")
	} else {
		issues = append(issues, "✓ fzf found")
	}

	// Check git
	if _, err := exec.LookPath("git"); err != nil {
		issues = append(issues, "✗ git not found")
	} else {
		issues = append(issues, "✓ git found")
	}

	// Check terminals
	if runtime.GOOS == "darwin" {
		if _, err := exec.LookPath("osascript"); err == nil {
			issues = append(issues, "✓ iTerm2 support available (AppleScript)")
		}
	}
	if _, err := exec.LookPath("tmux"); err == nil {
		issues = append(issues, "✓ tmux found")
	} else {
		issues = append(issues, "- tmux not found (optional)")
	}
	if _, err := exec.LookPath("wezterm"); err == nil {
		issues = append(issues, "✓ WezTerm found")
	} else {
		issues = append(issues, "- WezTerm not found (optional)")
	}

	// Check config
	if _, err := os.Stat(ConfigPath()); os.IsNotExist(err) {
		issues = append(issues, "- No config file (using defaults). Run 'son init' to create one.")
	} else {
		issues = append(issues, "✓ Config file: "+ConfigPath())
	}

	// Check data dir
	dataDir := DataDir()
	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		issues = append(issues, "- Data directory will be created on first use: "+dataDir)
	} else {
		issues = append(issues, "✓ Data directory: "+dataDir)
	}

	// Check roots
	cfg, err := Load()
	if err != nil {
		issues = append(issues, "✗ Config error: "+err.Error())
	} else {
		for _, r := range cfg.Roots {
			if _, err := os.Stat(r.Path); os.IsNotExist(err) {
				issues = append(issues, fmt.Sprintf("✗ Root not found: %s", r.Path))
			} else {
				issues = append(issues, fmt.Sprintf("✓ Root: %s (depth: %d)", r.Path, r.Depth))
			}
		}
	}

	return issues
}

func expandHome(path string) string {
	if strings.HasPrefix(path, "~/") {
		home, _ := os.UserHomeDir()
		return filepath.Join(home, path[2:])
	}
	return path
}
