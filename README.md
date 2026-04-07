<div align="center">

# son

**Open the right repo in the right workspace. Two keystrokes.**

A developer workspace launcher that discovers your recent projects, lets you pick one with fuzzy search, and opens it in a terminal workspace with split panes, editor integration, and startup hooks.

[Features](#features) | [Install](#install) | [Usage](#usage) | [Configuration](#configuration) | [Terminal Support](#terminal-support)

</div>

---

## What it does

1. Scans your project directories and sorts by recent activity (frecency)
2. Fuzzy search with `fzf` — pinned and most-used projects on top
3. Opens the selected project in your terminal with a split-pane layout
4. Optionally launches your editor and runs startup commands per pane

```
$ son
Select project >
* myorg/api-gateway         [07 Apr 15:32]
  myorg/frontend             [07 Apr 14:18]
  personal/dotfiles          [06 Apr 22:45]
  client/mobile-app          [05 Apr 19:20]
```

```
+-----------------+-----------------+
|                 |                 |
|   Pane 1        |   Pane 2        |
|   (editor/shell)|   (dev server)  |
|                 |-----------------|
|                 |   Pane 3        |
|                 |   (tests/logs)  |
+-----------------+-----------------+
```

## Features

- **Smart Discovery** — Scans multiple project roots with configurable depth
- **Frecency Sorting** — Combines access frequency + recency + git activity
- **Fuzzy Search** — Powered by fzf with pinned projects on top
- **Multi-Terminal** — iTerm2, tmux, and WezTerm support with auto-detection
- **Layout Presets** — Single, split, 3-pane, and grid layouts
- **Editor Integration** — Auto-open VS Code, Cursor, Zed, Neovim, Vim, Sublime, IntelliJ
- **Startup Hooks** — Run commands per pane (dev server, tests, docker, etc.)
- **Per-Project Config** — `.son.toml` files for project-specific workspace setup
- **Favorites** — Pin important projects to the top of the list

## Install

### Homebrew (macOS & Linux)

```bash
brew install abdussamet032/tap/son
```

### Go

```bash
go install github.com/abdussamet032/son@latest
```

### From source

```bash
git clone https://github.com/abdussamet032/son.git
cd son
make install
```

### Requirements

- [fzf](https://github.com/junegunn/fzf) — `brew install fzf`
- One of: iTerm2 (macOS), tmux, or WezTerm

## Usage

```bash
# Open project selector (default)
son

# List projects without selection
son list

# Use specific terminal/layout/editor
son -t tmux -l grid -e code

# Pin/unpin a project
son pin /path/to/project
son unpin /path/to/project

# Check system setup
son doctor

# Create config file
son init

# Show config
son config

# Shell completions
son completion zsh > "${fpath[1]}/_son"
son completion bash > /etc/bash_completion.d/son
son completion fish > ~/.config/fish/completions/son.fish
```

## Configuration

### Global config: `~/.config/son/config.toml`

```toml
# Terminal: iterm, tmux, wezterm, auto
default_terminal = "auto"

# Editor: code, cursor, zed, nvim, vim, subl, idea
default_editor = "code"

# Layout: single, split, 3-pane, grid
default_layout = "3-pane"

# Project directories to scan
[[roots]]
path = "~/dev/github.com"
depth = 2

[[roots]]
path = "~/work"
depth = 1

[sorting]
method = "frecency"  # frecency, mtime, alpha

[appearance]
date_format = "02 Jan 15:04"
show_path = true
```

### Per-project config: `.son.toml`

Place in your project root to override global settings:

```toml
layout = "3-pane"
terminal = "tmux"
editor = "cursor"

[[hooks]]
pane = 2
command = "npm run dev"

[[hooks]]
pane = 3
command = "npm run test -- --watch"
```

## Terminal Support

| Terminal | macOS | Linux | Pane Support |
|----------|-------|-------|--------------|
| iTerm2   | Yes   | -     | Full (AppleScript) |
| tmux     | Yes   | Yes   | Full |
| WezTerm  | Yes   | Yes   | Full (CLI) |

Auto-detection priority: iTerm2 (macOS) > tmux > WezTerm

## Layout Presets

| Layout | Panes | Description |
|--------|-------|-------------|
| `single` | 1 | Single pane |
| `split` | 2 | Left + Right |
| `3-pane` | 3 | Left + Top-Right + Bottom-Right |
| `grid` | 4 | 2x2 grid |

## Comparison

| Feature | son | tmuxinator | zoxide | Manual |
|---------|-----|------------|--------|--------|
| Zero-config discovery | Yes | No | No | No |
| Frecency sorting | Yes | No | Yes | No |
| Multi-terminal | Yes | tmux only | - | - |
| Split pane layouts | Yes | Yes | No | Manual |
| Editor integration | Yes | Partial | No | Manual |
| Startup hooks | Yes | Yes | No | No |
| Setup time | 0 min | 5-10 min/project | 0 min | Every time |

## How it works

`son` uses a frecency algorithm that combines:
- **Access count** — How often you open each project (log-scaled)
- **Recency** — When you last accessed it via son
- **Git activity** — Latest commit timestamp

Pinned projects always appear at the top. The history is stored in a local SQLite database at `~/.local/share/son/history.db`.

---

## Turkce / Turkish

`son` terminalde yazinca en son calistigin projeleri listeler, sectigini terminal'de split pane olarak acar.

```bash
brew install abdussamet032/tap/son
son init  # ayar dosyasi olustur
son       # projeleri listele ve sec
```

---

## License

MIT License - see [LICENSE](LICENSE)
