package layout

type Layout struct {
	Name  string
	Panes []Pane
}

type Pane struct {
	Split string // "vertical", "horizontal", "none" (first pane)
}

var Presets = map[string]Layout{
	"single": {
		Name:  "single",
		Panes: []Pane{{Split: "none"}},
	},
	"split": {
		Name: "split",
		Panes: []Pane{
			{Split: "none"},
			{Split: "vertical"},
		},
	},
	"3-pane": {
		Name: "3-pane",
		Panes: []Pane{
			{Split: "none"},
			{Split: "vertical"},
			{Split: "horizontal"},
		},
	},
	"grid": {
		Name: "grid",
		Panes: []Pane{
			{Split: "none"},
			{Split: "vertical"},
			{Split: "horizontal"},
			{Split: "horizontal"},
		},
	},
}

func Get(name string) Layout {
	if l, ok := Presets[name]; ok {
		return l
	}
	return Presets["3-pane"]
}

func Names() []string {
	return []string{"single", "split", "3-pane", "grid"}
}
