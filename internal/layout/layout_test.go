package layout

import (
	"reflect"
	"testing"
)

// cell is a pane's rectangle in a unit square, in hundredths.
type cell struct{ x, y, w, h float64 }

// place computes each pane's rectangle by replaying the splits.
func place(l Layout) []cell {
	cells := []cell{{0, 0, 100, 100}}
	for _, p := range l.Panes[1:] {
		parent := &cells[p.Parent]
		frac := float64(p.Percent) / 100
		var c cell
		if p.Dir == Right {
			c = cell{parent.x + parent.w*(1-frac), parent.y, parent.w * frac, parent.h}
			parent.w -= c.w
		} else {
			c = cell{parent.x, parent.y + parent.h*(1-frac), parent.w, parent.h * frac}
			parent.h -= c.h
		}
		cells = append(cells, c)
	}
	return cells
}

func TestGridPaneCount(t *testing.T) {
	for n := 1; n <= MaxPanes; n++ {
		if got := len(Grid(n).Panes); got != n {
			t.Errorf("Grid(%d) has %d panes", n, got)
		}
	}
}

func TestGridKeepsClassicNumbering(t *testing.T) {
	// 3-pane: 1 left, 2 top-right, 3 bottom-right.
	// grid:   1 top-left, 2 top-right, 3 bottom-right, 4 bottom-left.
	want := map[int][]Pane{
		1: {{Dir: None}},
		2: {{Dir: None}, {Parent: 0, Dir: Right, Percent: 50}},
		3: {{Dir: None}, {Parent: 0, Dir: Right, Percent: 50}, {Parent: 1, Dir: Down, Percent: 50}},
		4: {{Dir: None}, {Parent: 0, Dir: Right, Percent: 50}, {Parent: 1, Dir: Down, Percent: 50}, {Parent: 0, Dir: Down, Percent: 50}},
	}
	for n, panes := range want {
		if got := Grid(n).Panes; !reflect.DeepEqual(got, panes) {
			t.Errorf("Grid(%d).Panes = %+v, want %+v", n, got, panes)
		}
	}
}

func TestGridGeometry(t *testing.T) {
	tests := []struct {
		n    int
		want []cell
	}{
		{5, []cell{ // 1 | 2 | 3
			{0, 0, 34, 100}, {34, 0, 33, 50}, {67, 0, 33, 50}, //   | 5 | 4
			{67, 50, 33, 50}, {34, 50, 33, 50},
		}},
		{6, []cell{
			{0, 0, 34, 50}, {34, 0, 33, 50}, {67, 0, 33, 50},
			{67, 50, 33, 50}, {34, 50, 33, 50}, {0, 50, 34, 50},
		}},
		{9, []cell{
			{0, 0, 34, 34}, {34, 0, 33, 34}, {67, 0, 33, 34},
			{67, 34, 33, 33}, {34, 34, 33, 33}, {0, 34, 34, 33},
			{0, 67, 34, 33}, {34, 67, 33, 33}, {67, 67, 33, 33},
		}},
	}
	for _, tt := range tests {
		got := place(Grid(tt.n))
		for i := range got {
			if !near(got[i], tt.want[i]) {
				t.Errorf("Grid(%d) pane %d = %+v, want %+v", tt.n, i+1, got[i], tt.want[i])
			}
		}
	}
}

func near(a, b cell) bool {
	d := func(x, y float64) bool { return x-y < 2 && y-x < 2 }
	return d(a.x, b.x) && d(a.y, b.y) && d(a.w, b.w) && d(a.h, b.h)
}

func TestParse(t *testing.T) {
	for name, n := range map[string]int{"single": 1, "split": 2, "3-pane": 3, "grid": 4, "1": 1, "7": 7, "9": 9} {
		l, err := Parse(name)
		if err != nil || len(l.Panes) != n {
			t.Errorf("Parse(%q) = %d panes, %v; want %d panes", name, len(l.Panes), err, n)
		}
	}
	for _, name := range []string{"", "0", "10", "-2", "tiled"} {
		if _, err := Parse(name); err == nil {
			t.Errorf("Parse(%q) should fail", name)
		}
	}
	if got := len(Get("bogus").Panes); got != 3 {
		t.Errorf("Get(bogus) has %d panes, want the 3-pane fallback", got)
	}
}
