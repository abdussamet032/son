# son — Go Rewrite & Product Launch Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the `son` bash script into a production-quality Go CLI tool with config system, multi-terminal support, frecency ranking, editor integration, shell completions, landing page, and Homebrew distribution.

**Architecture:** Go CLI using cobra for commands, BurntSushi/toml for config, shell-out to fzf for selection, adapter pattern for terminal emulators (iTerm/tmux/WezTerm), frecency-based ranking with SQLite-backed history.

**Tech Stack:** Go 1.26, cobra, BurntSushi/toml, mattn/go-sqlite3 (or modernc.org/sqlite for CGO-free), Next.js (website), Vercel (hosting)

---

## File Structure

```
son/
├── cmd/
│   └── root.go           # CLI root + subcommands (cobra)
├── internal/
│   ├── config/
│   │   └── config.go     # TOML config loading, defaults, init
│   ├── discovery/
│   │   └── discovery.go  # Project directory scanning
│   ├── ranking/
│   │   └── ranking.go    # Frecency + mtime + alpha sorting
│   ├── history/
│   │   └── history.go    # SQLite-backed usage history
│   ├── terminal/
│   │   ├── terminal.go   # Terminal adapter interface
│   │   ├── iterm.go      # iTerm2 AppleScript adapter
│   │   ├── tmux.go       # tmux adapter
│   │   └── wezterm.go    # WezTerm CLI adapter
│   ├── editor/
│   │   └── editor.go     # Editor launcher
│   ├── hooks/
│   │   └── hooks.go      # Startup command hooks
│   ├── selector/
│   │   └── selector.go   # fzf integration
│   └── layout/
│       └── layout.go     # Layout presets
├── main.go               # Entry point
├── go.mod
├── Makefile              # Build, install, completions, man page
├── README.md             # English + Turkish
├── website/              # Next.js landing page
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── package.json
│   ├── next.config.js
│   └── vercel.json
└── .goreleaser.yml       # Release automation
```

## Task 1: Go Project Setup

**Files:** Create: `main.go`, `go.mod`, `cmd/root.go`, `Makefile`

- [ ] Step 1: Initialize Go module and install dependencies
- [ ] Step 2: Create main.go entry point
- [ ] Step 3: Create cmd/root.go with cobra commands
- [ ] Step 4: Create Makefile
- [ ] Step 5: Verify `go build` works

## Task 2: Config System

**Files:** Create: `internal/config/config.go`

- [ ] Step 1: Define Config struct with TOML tags
- [ ] Step 2: Implement Load() with XDG defaults
- [ ] Step 3: Implement Init() for first-run setup
- [ ] Step 4: Implement Doctor() for dependency checks

## Task 3: Project Discovery

**Files:** Create: `internal/discovery/discovery.go`

- [ ] Step 1: Implement directory scanning with configurable depth
- [ ] Step 2: Git timestamp extraction
- [ ] Step 3: Filesystem fallback
- [ ] Step 4: .son.toml project config loading

## Task 4: Ranking & History

**Files:** Create: `internal/ranking/ranking.go`, `internal/history/history.go`

- [ ] Step 1: SQLite-backed history (access count + timestamps)
- [ ] Step 2: Frecency algorithm
- [ ] Step 3: Favorites/pins support
- [ ] Step 4: Sort modes (frecency, mtime, alpha)

## Task 5: Terminal Adapters

**Files:** Create: `internal/terminal/terminal.go`, `internal/terminal/iterm.go`, `internal/terminal/tmux.go`, `internal/terminal/wezterm.go`, `internal/layout/layout.go`

- [ ] Step 1: Define Terminal interface + Layout presets
- [ ] Step 2: iTerm2 adapter (AppleScript)
- [ ] Step 3: tmux adapter
- [ ] Step 4: WezTerm adapter

## Task 6: Selector, Editor, Hooks

**Files:** Create: `internal/selector/selector.go`, `internal/editor/editor.go`, `internal/hooks/hooks.go`

- [ ] Step 1: fzf integration with formatted output
- [ ] Step 2: Editor launcher (code, cursor, zed, nvim, vim)
- [ ] Step 3: Startup hooks execution

## Task 7: CLI Integration

**Files:** Modify: `cmd/root.go`, `main.go`

- [ ] Step 1: Wire all packages into cobra commands
- [ ] Step 2: Default command (list + select + open)
- [ ] Step 3: init, doctor, pin, unpin, list, config commands
- [ ] Step 4: Shell completions generation
- [ ] Step 5: Version info

## Task 8: README & Distribution

**Files:** Modify: `README.md`, Create: `.goreleaser.yml`

- [ ] Step 1: English + Turkish README with feature matrix
- [ ] Step 2: GoReleaser config
- [ ] Step 3: Homebrew formula

## Task 9: Landing Page Website

**Files:** Create: `website/*`

- [ ] Step 1: Next.js project setup
- [ ] Step 2: Landing page with hero, features, install, demo
- [ ] Step 3: Vercel deployment config
