package match

import (
	"testing"

	"github.com/abdussamet032/son/internal/discovery"
)

func projects(names ...[2]string) []discovery.Project {
	var ps []discovery.Project
	for _, n := range names {
		ps = append(ps, discovery.Project{Org: n[0], Repo: n[1], Name: n[0] + "/" + n[1], Path: "/src/" + n[0] + "/" + n[1]})
	}
	return ps
}

var all = projects(
	[2]string{"hayrat", "hyd-aid360-v2"},
	[2]string{"hayrat", "hyd-aid360"},
	[2]string{"hayrat", "tgsp-umre"},
	[2]string{"hayrat", "hv-osmanlica-online"},
	[2]string{"hayrat", "hv-osmanlica-platformu"},
	[2]string{"kendikralligim", "son"},
	[2]string{"kendikralligim", "tahsildarbot"},
	[2]string{"kendikralligim", "tahsildarbot-local"},
	[2]string{"other", "son"},
	[2]string{"hayrat", "hayrat-egitim-www"},
)

func TestUnique(t *testing.T) {
	tests := []struct {
		query string
		want  string // "" means ambiguous or no match
	}{
		{"tgsp", "hayrat/tgsp-umre"},                    // prefix
		{"TGSP", "hayrat/tgsp-umre"},                    // case-insensitive
		{"umre", "hayrat/tgsp-umre"},                    // substring
		{"hyd-aid360", "hayrat/hyd-aid360"},             // exact beats prefix of -v2
		{"tahsildarbot", "kendikralligim/tahsildarbot"}, // exact beats prefix of -local
		{"platformu", "hayrat/hv-osmanlica-platformu"},
		{"kendikralligim/son", "kendikralligim/son"}, // org/repo disambiguates
		{"other/", "other/son"},                      // org prefix
		{"hvop", "hayrat/hv-osmanlica-platformu"},    // fuzzy
		{"son", ""},       // same repo name in two orgs
		{"osmanlica", ""}, // two substring matches
		{"hayrat", ""},    // org name ties with the repo prefix of hayrat-egitim-www
		{"kendikralligim", ""},
		{"hayrat-e", "hayrat/hayrat-egitim-www"},
		{"nothing-like-this", ""},
	}
	for _, tt := range tests {
		p, ok := Unique(Find(all, tt.query))
		got := ""
		if ok {
			got = p.Name
		}
		if got != tt.want {
			t.Errorf("Unique(Find(%q)) = %q, want %q", tt.query, got, tt.want)
		}
	}
}

func TestFindOrder(t *testing.T) {
	got := Find(all, "hyd")
	if len(got) != 2 || got[0].Project.Repo != "hyd-aid360-v2" || got[1].Project.Repo != "hyd-aid360" {
		t.Errorf("equal scores should keep input order, got %+v", got)
	}
	if got := Find(all, "zzz"); len(got) != 0 {
		t.Errorf("Find(zzz) = %+v, want none", got)
	}
}
