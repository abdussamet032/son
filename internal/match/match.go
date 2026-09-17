package match

import (
	"sort"
	"strings"

	"github.com/abdussamet032/son/internal/discovery"
)

// Scores, best first.
const (
	Exact        = 5 // repo or org/repo equals the query
	Prefix       = 4 // repo starts with the query, or the org equals it
	Contains     = 3 // repo contains the query
	NameContains = 2 // org/repo contains the query, e.g. "org/re" or the org
	Fuzzy        = 1 // query letters appear in order in org/repo
)

type Result struct {
	Project discovery.Project
	Score   int
}

// Find returns the projects matching query, best score first. Projects with
// equal scores keep their input order. Matching ignores case.
func Find(projects []discovery.Project, query string) []Result {
	q := strings.ToLower(query)
	var results []Result
	for _, p := range projects {
		if s := score(p, q); s > 0 {
			results = append(results, Result{Project: p, Score: s})
		}
	}
	sort.SliceStable(results, func(i, j int) bool {
		return results[i].Score > results[j].Score
	})
	return results
}

// Unique returns the single best match, or false when there is no match or
// several projects tie for the best score.
func Unique(results []Result) (discovery.Project, bool) {
	if len(results) == 0 || len(results) > 1 && results[1].Score == results[0].Score {
		return discovery.Project{}, false
	}
	return results[0].Project, true
}

func score(p discovery.Project, q string) int {
	repo := strings.ToLower(p.Repo)
	name := strings.ToLower(p.Name)
	switch {
	case repo == q || name == q:
		return Exact
	case strings.HasPrefix(repo, q) || strings.ToLower(p.Org) == q:
		return Prefix
	case strings.Contains(repo, q):
		return Contains
	case strings.Contains(name, q):
		return NameContains
	case isSubsequence(q, name):
		return Fuzzy
	}
	return 0
}

func isSubsequence(q, s string) bool {
	rest := []rune(q)
	for _, r := range s {
		if len(rest) == 0 {
			break
		}
		if r == rest[0] {
			rest = rest[1:]
		}
	}
	return len(rest) == 0
}
