package services

import (
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
)

type Type string

const (
	TypeDocker  Type = "docker"
	TypeProcess Type = "process"
)

type Service struct {
	Type    Type
	ID      string // PID (process) or container ID (docker)
	Name    string // container name or process command
	Port    int    // primary listening port (0 if none)
	CWD     string // process working directory (empty for docker)
	Project string // matched project name (empty if unmatched)
}

// dbCommands are native DB processes we always include even without project match.
var dbCommands = map[string]bool{
	"postgres":     true,
	"postmaster":   true,
	"mysqld":       true,
	"mariadbd":     true,
	"mongod":       true,
	"redis-server": true,
}

// noiseCommands are processes that may match a project CWD but are not
// project-owned services (VM tooling, docker plumbing, etc.).
var noiseCommands = map[string]bool{
	"limactl":  true,
	"vpnkit":   true,
	"dockerd":  true,
	"Docker":   true,
}

// List returns running docker containers and listening processes that either
// match a known project root (by CWD prefix or container name prefix) or are
// recognized native database servers.
func List(projectPaths map[string]string) ([]Service, error) {
	var out []Service

	dockers, _ := listDocker(projectPaths)
	out = append(out, dockers...)

	procs, _ := listProcesses(projectPaths)
	out = append(out, procs...)

	return out, nil
}

func listDocker(projectPaths map[string]string) ([]Service, error) {
	cmd := exec.Command("docker", "ps", "--format", "{{.ID}}\t{{.Names}}\t{{.Ports}}")
	raw, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	var out []Service
	for _, line := range strings.Split(strings.TrimSpace(string(raw)), "\n") {
		if line == "" {
			continue
		}
		parts := strings.Split(line, "\t")
		if len(parts) < 2 {
			continue
		}
		s := Service{
			Type: TypeDocker,
			ID:   parts[0],
			Name: parts[1],
		}
		if len(parts) >= 3 {
			s.Port = firstHostPort(parts[2])
		}
		s.Project = matchContainerProject(s.Name, projectPaths)
		out = append(out, s)
	}
	return out, nil
}

func listProcesses(projectPaths map[string]string) ([]Service, error) {
	cmd := exec.Command("lsof", "-nP", "-iTCP", "-sTCP:LISTEN")
	raw, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	seen := make(map[int]bool)
	var out []Service
	lines := strings.Split(string(raw), "\n")
	if len(lines) > 0 {
		lines = lines[1:] // skip header
	}
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) < 9 {
			continue
		}
		pid, err := strconv.Atoi(fields[1])
		if err != nil {
			continue
		}
		if seen[pid] {
			continue
		}
		port := portFromAddr(fields[8])
		if port < 1024 {
			continue
		}

		cmdName := fields[0]
		if noiseCommands[cmdName] || strings.HasPrefix(cmdName, "com.docke") {
			continue
		}
		cwd := processCWD(pid)
		project := matchPathProject(cwd, projectPaths)

		// Filter: only include if matched to a project OR a known DB process.
		if project == "" && !dbCommands[cmdName] {
			continue
		}

		seen[pid] = true
		out = append(out, Service{
			Type:    TypeProcess,
			ID:      strconv.Itoa(pid),
			Name:    cmdName,
			Port:    port,
			CWD:     cwd,
			Project: project,
		})
	}
	return out, nil
}

func processCWD(pid int) string {
	cmd := exec.Command("lsof", "-p", strconv.Itoa(pid), "-a", "-d", "cwd", "-Fn")
	raw, err := cmd.Output()
	if err != nil {
		return ""
	}
	for _, line := range strings.Split(string(raw), "\n") {
		if strings.HasPrefix(line, "n") {
			return strings.TrimPrefix(line, "n")
		}
	}
	return ""
}

func portFromAddr(addr string) int {
	i := strings.LastIndex(addr, ":")
	if i < 0 {
		return 0
	}
	p, _ := strconv.Atoi(addr[i+1:])
	return p
}

// firstHostPort parses a docker ports string like:
//
//	"0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp"
//
// and returns the first published host port (5432 here).
func firstHostPort(s string) int {
	for _, part := range strings.Split(s, ",") {
		part = strings.TrimSpace(part)
		i := strings.Index(part, "->")
		if i <= 0 {
			continue
		}
		host := part[:i]
		j := strings.LastIndex(host, ":")
		if j < 0 {
			continue
		}
		if p, err := strconv.Atoi(host[j+1:]); err == nil && p > 0 {
			return p
		}
	}
	return 0
}

func matchPathProject(cwd string, projectPaths map[string]string) string {
	if cwd == "" {
		return ""
	}
	cwdSlash := cwd + "/"
	best := ""
	bestLen := 0
	for path, name := range projectPaths {
		if path == "" {
			continue
		}
		if strings.HasPrefix(cwdSlash, path+"/") && len(path) > bestLen {
			best = name
			bestLen = len(path)
		}
	}
	return best
}

func matchContainerProject(containerName string, projectPaths map[string]string) string {
	// Compose containers are typically named "<project>-<service>-<n>".
	// Try to match the container name prefix against any known project repo name.
	best := ""
	bestLen := 0
	for _, name := range projectPaths {
		repo := name
		if i := strings.LastIndex(name, "/"); i >= 0 {
			repo = name[i+1:]
		}
		if repo == "" {
			continue
		}
		if strings.HasPrefix(containerName, repo+"-") || strings.HasPrefix(containerName, repo+"_") || containerName == repo {
			if len(repo) > bestLen {
				best = name
				bestLen = len(repo)
			}
		}
	}
	return best
}

// Stop terminates the given service. Docker containers are stopped via
// `docker stop`; processes receive SIGTERM.
func Stop(s Service) error {
	switch s.Type {
	case TypeDocker:
		out, err := exec.Command("docker", "stop", s.ID).CombinedOutput()
		if err != nil {
			return fmt.Errorf("docker stop: %s", strings.TrimSpace(string(out)))
		}
		return nil
	case TypeProcess:
		pid, err := strconv.Atoi(s.ID)
		if err != nil {
			return err
		}
		proc, err := os.FindProcess(pid)
		if err != nil {
			return err
		}
		return proc.Signal(syscall.SIGTERM)
	}
	return fmt.Errorf("unknown service type: %s", s.Type)
}
