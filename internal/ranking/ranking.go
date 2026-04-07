package ranking

import (
	"math"
	"sort"
	"time"

	"github.com/abdussamet032/son/internal/discovery"
	"github.com/abdussamet032/son/internal/history"
)

type Method string

const (
	Frecency Method = "frecency"
	MTime    Method = "mtime"
	Alpha    Method = "alpha"
)

func Sort(projects []discovery.Project, entries map[string]history.Entry, method Method) []discovery.Project {
	sorted := make([]discovery.Project, len(projects))
	copy(sorted, projects)

	switch method {
	case Frecency:
		sortFrecency(sorted, entries)
	case MTime:
		sortMTime(sorted)
	case Alpha:
		sortAlpha(sorted)
	default:
		sortFrecency(sorted, entries)
	}

	return sorted
}

func sortFrecency(projects []discovery.Project, entries map[string]history.Entry) {
	sort.SliceStable(projects, func(i, j int) bool {
		ei := entries[projects[i].Path]
		ej := entries[projects[j].Path]

		// Pinned items always come first
		if ei.Pinned != ej.Pinned {
			return ei.Pinned
		}

		si := frecencyScore(ei, projects[i].Timestamp)
		sj := frecencyScore(ej, projects[j].Timestamp)
		return si > sj
	})
}

func frecencyScore(e history.Entry, gitTime time.Time) float64 {
	now := time.Now()

	// Base score from access count with logarithmic scaling
	accessScore := math.Log2(float64(e.AccessCount) + 1)

	// Recency score from last access (history)
	var recencyScore float64
	if !e.LastAccess.IsZero() {
		hoursSinceAccess := now.Sub(e.LastAccess).Hours()
		recencyScore = 10.0 / (1.0 + hoursSinceAccess/24.0)
	}

	// Git activity score
	var gitScore float64
	if !gitTime.IsZero() {
		hoursSinceGit := now.Sub(gitTime).Hours()
		gitScore = 5.0 / (1.0 + hoursSinceGit/24.0)
	}

	return accessScore*3 + recencyScore*2 + gitScore
}

func sortMTime(projects []discovery.Project) {
	sort.SliceStable(projects, func(i, j int) bool {
		return projects[i].Timestamp.After(projects[j].Timestamp)
	})
}

func sortAlpha(projects []discovery.Project) {
	sort.SliceStable(projects, func(i, j int) bool {
		return projects[i].Name < projects[j].Name
	})
}
