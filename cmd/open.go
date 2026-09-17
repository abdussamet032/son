package cmd

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/abdussamet032/son/internal/config"
	"github.com/abdussamet032/son/internal/discovery"
	"github.com/abdussamet032/son/internal/history"
	"github.com/abdussamet032/son/internal/match"
	"github.com/abdussamet032/son/internal/selector"
	"github.com/spf13/cobra"
)

var paneShorthand = regexp.MustCompile(`^-[0-9]+$`)

// ExpandArgs rewrites the pane count shorthand "-N" to "--layout=N", so
// "son api -2" opens api with two panes. Arguments after "--" are untouched.
func ExpandArgs(args []string) []string {
	out := make([]string, 0, len(args))
	for i, a := range args {
		if a == "--" {
			return append(out, args[i:]...)
		}
		if paneShorthand.MatchString(a) {
			a = "--layout=" + a[1:]
		}
		out = append(out, a)
	}
	return out
}

// resolveProject decides what to open from the command line argument:
//
//	""            the fzf picker
//	"-"           the last opened project
//	".", "/x/y"   that directory
//	anything else the best name match, or the picker if the match is ambiguous
//
// It returns nil if the user cancels the picker.
func resolveProject(projects []discovery.Project, cfg config.Config, entries map[string]history.Entry, query string) (*discovery.Project, error) {
	switch {
	case query == "":
		return pick(projects, cfg, entries, "")
	case query == "-":
		return lastProject(projects, entries)
	case isPath(query):
		dir, err := filepath.Abs(query)
		if err != nil {
			return nil, err
		}
		if info, err := os.Stat(dir); err != nil || !info.IsDir() {
			return nil, fmt.Errorf("not a directory: %s", query)
		}
		return projectAt(projects, dir), nil
	}

	matches := match.Find(projects, query)
	if len(matches) == 0 {
		return nil, fmt.Errorf("no project matches %q (run 'son list' to see all projects)", query)
	}
	if p, ok := match.Unique(matches); ok {
		return &p, nil
	}
	return pick(projects, cfg, entries, query)
}

func pick(projects []discovery.Project, cfg config.Config, entries map[string]history.Entry, query string) (*discovery.Project, error) {
	result, err := selector.Select(projects, cfg, entries, query)
	if err != nil || result == nil {
		return nil, err
	}
	return &result.Project, nil
}

func isPath(s string) bool {
	return s == "." || s == ".." ||
		strings.HasPrefix(s, "/") || strings.HasPrefix(s, "./") || strings.HasPrefix(s, "../")
}

// lastProject returns the most recently opened project, skipping the one the
// current directory is in, so running "son -" repeatedly toggles between the
// last two projects like "cd -".
func lastProject(projects []discovery.Project, entries map[string]history.Entry) (*discovery.Project, error) {
	recent := make([]history.Entry, 0, len(entries))
	for _, e := range entries {
		if e.AccessCount > 0 { // pinning alone creates an entry
			recent = append(recent, e)
		}
	}
	sort.Slice(recent, func(i, j int) bool {
		return recent[i].LastAccess.After(recent[j].LastAccess)
	})

	cwd, _ := os.Getwd()
	for _, e := range recent {
		if cwd == e.Path || strings.HasPrefix(cwd, e.Path+string(filepath.Separator)) {
			continue
		}
		if info, err := os.Stat(e.Path); err != nil || !info.IsDir() {
			continue
		}
		return projectAt(projects, e.Path), nil
	}
	return nil, errors.New("no previously opened project to return to")
}

// projectAt returns the discovered project at dir, so it keeps its org/repo
// name, or inspects dir directly if it is outside the configured roots.
func projectAt(projects []discovery.Project, dir string) *discovery.Project {
	for i := range projects {
		if projects[i].Path == dir {
			return &projects[i]
		}
	}
	p := discovery.Inspect(dir)
	return &p
}

// completeProjects completes "son <TAB>" with the same matching as
// "son <project>", so "son aid360<TAB>" offers hyd-aid360 and friends.
func completeProjects(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
	if len(args) > 0 {
		return nil, cobra.ShellCompDirectiveNoFileComp
	}
	cfg, err := config.Load()
	if err != nil {
		return nil, cobra.ShellCompDirectiveNoFileComp
	}
	projects := discovery.Scan(cfg.Roots)

	repoCount := make(map[string]int)
	for _, p := range projects {
		repoCount[p.Repo]++
	}

	query := strings.ToLower(toComplete)
	var names []string
	for _, m := range match.Find(projects, toComplete) {
		if m.Score == match.Fuzzy {
			continue // shells would hide these anyway
		}
		p := m.Project
		// Shells drop candidates that don't contain the typed text, so offer
		// org/repo when only the org matched or the repo name isn't unique.
		if repoCount[p.Repo] > 1 || !strings.Contains(strings.ToLower(p.Repo), query) {
			names = append(names, p.Name)
		} else {
			names = append(names, p.Repo+"\t"+p.Name)
		}
	}
	return names, cobra.ShellCompDirectiveNoFileComp
}
