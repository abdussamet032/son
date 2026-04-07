package discovery

import (
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/abdussamet032/son/internal/config"
)

type Project struct {
	Path      string
	Name      string // org/repo format
	Org       string
	Repo      string
	Timestamp time.Time
	IsGit     bool
	Config    *config.ProjectConfig
}

func Discover(roots []config.Root) ([]Project, error) {
	var projects []Project

	for _, root := range roots {
		found, err := scanRoot(root)
		if err != nil {
			continue
		}
		projects = append(projects, found...)
	}

	return projects, nil
}

func scanRoot(root config.Root) ([]Project, error) {
	var projects []Project
	rootPath := root.Path

	if _, err := os.Stat(rootPath); os.IsNotExist(err) {
		return nil, err
	}

	entries, err := walkDepth(rootPath, root.Depth)
	if err != nil {
		return nil, err
	}

	for _, dir := range entries {
		p, err := inspectProject(dir, rootPath)
		if err != nil {
			continue
		}
		projects = append(projects, p)
	}

	return projects, nil
}

func walkDepth(root string, depth int) ([]string, error) {
	if depth <= 0 {
		depth = 2
	}

	var dirs []string

	if depth == 1 {
		entries, err := os.ReadDir(root)
		if err != nil {
			return nil, err
		}
		for _, e := range entries {
			if e.IsDir() && !strings.HasPrefix(e.Name(), ".") {
				dirs = append(dirs, filepath.Join(root, e.Name()))
			}
		}
		return dirs, nil
	}

	// depth 2: org/repo pattern
	orgs, err := os.ReadDir(root)
	if err != nil {
		return nil, err
	}

	for _, org := range orgs {
		if !org.IsDir() || strings.HasPrefix(org.Name(), ".") {
			continue
		}
		orgPath := filepath.Join(root, org.Name())

		if depth == 2 {
			repos, err := os.ReadDir(orgPath)
			if err != nil {
				continue
			}
			for _, repo := range repos {
				if repo.IsDir() && !strings.HasPrefix(repo.Name(), ".") {
					dirs = append(dirs, filepath.Join(orgPath, repo.Name()))
				}
			}
		}
	}

	return dirs, nil
}

func inspectProject(dir, rootPath string) (Project, error) {
	rel, _ := filepath.Rel(rootPath, dir)
	parts := strings.SplitN(rel, string(filepath.Separator), 2)

	var org, repo string
	if len(parts) == 2 {
		org = parts[0]
		repo = parts[1]
	} else {
		org = ""
		repo = parts[0]
	}

	p := Project{
		Path: dir,
		Repo: repo,
		Org:  org,
	}

	if org != "" {
		p.Name = org + "/" + repo
	} else {
		p.Name = repo
	}

	// Check git
	gitDir := filepath.Join(dir, ".git")
	if _, err := os.Stat(gitDir); err == nil {
		p.IsGit = true
		p.Timestamp = gitTimestamp(dir)
	} else {
		p.IsGit = false
		p.Timestamp = fsTimestamp(dir)
	}

	// Load project config
	pc, _ := config.LoadProjectConfig(dir)
	p.Config = pc

	return p, nil
}

func gitTimestamp(dir string) time.Time {
	cmd := exec.Command("git", "-C", dir, "log", "-1", "--format=%ct")
	out, err := cmd.Output()
	if err != nil {
		return fsTimestamp(dir)
	}

	ts, err := strconv.ParseInt(strings.TrimSpace(string(out)), 10, 64)
	if err != nil {
		return fsTimestamp(dir)
	}

	return time.Unix(ts, 0)
}

func fsTimestamp(dir string) time.Time {
	info, err := os.Stat(dir)
	if err != nil {
		return time.Time{}
	}
	return info.ModTime()
}
