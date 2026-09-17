package layout

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// MaxPanes is the largest pane count a layout can have.
const MaxPanes = 9

type Direction int

const (
	None  Direction = iota // first pane, not split off anything
	Right                  // new pane to the right of its parent
	Down                   // new pane below its parent
)

type Layout struct {
	Name  string
	Panes []Pane
}

// Pane describes how a pane is created. Every pane after the first is split
// off an earlier pane; terminals create them in slice order.
type Pane struct {
	Parent  int       // index of the pane that is split
	Dir     Direction // where the new pane goes
	Percent int       // size of the new pane, as a percentage of its parent
}

var presets = map[string]int{
	"single": 1,
	"split":  2,
	"3-pane": 3,
	"grid":   4,
}

// Parse resolves a preset name or a pane count ("1" to "9").
func Parse(name string) (Layout, error) {
	n, ok := presets[name]
	if !ok {
		var err error
		if n, err = strconv.Atoi(name); err != nil {
			return Layout{}, fmt.Errorf("unknown layout %q (use %s, or a pane count 1-%d)",
				name, strings.Join(Names(), ", "), MaxPanes)
		}
	}
	if n < 1 || n > MaxPanes {
		return Layout{}, fmt.Errorf("pane count must be between 1 and %d, got %d", MaxPanes, n)
	}
	l := Grid(n)
	l.Name = name
	return l, nil
}

// Get is like Parse but falls back to the 3-pane layout for invalid names.
func Get(name string) Layout {
	if l, err := Parse(name); err == nil {
		return l
	}
	l, _ := Parse("3-pane")
	return l
}

func Names() []string {
	return []string{"single", "split", "3-pane", "grid"}
}

// Grid arranges n panes in columns of equal width. When the grid is not full,
// the leftmost columns get one pane fewer so the main pane stays large.
//
// Panes are numbered along the rows in a snake pattern: the top row left to
// right, the next row right to left, and so on. For 3 and 4 panes this is the
// classic 3-pane and grid numbering:
//
//	1 | 2      1 | 2      1 | 2 | 3
//	  | 3      4 | 3        | 5 | 4
func Grid(n int) Layout {
	if n < 1 {
		n = 1
	}
	cols := int(math.Ceil(math.Sqrt(float64(n))))
	rows := (n + cols - 1) / cols

	height := make([]int, cols)
	for c := range height {
		height[c] = rows
		if c < cols*rows-n {
			height[c]--
		}
	}

	l := Layout{Name: strconv.Itoa(n), Panes: []Pane{{Dir: None}}}
	column := make([][]int, cols) // pane indexes of each column, top to bottom
	column[0] = []int{0}

	// Top row: each column is split off its left neighbour, which still spans
	// every column to its right.
	for c := 1; c < cols; c++ {
		left := cols - c + 1
		l.Panes = append(l.Panes, Pane{Parent: column[c-1][0], Dir: Right, Percent: 100 * (left - 1) / left})
		column[c] = []int{len(l.Panes) - 1}
	}

	for r := 1; r < rows; r++ {
		for i := 0; i < cols; i++ {
			c := i
			if r%2 == 1 {
				c = cols - 1 - i
			}
			if r >= height[c] {
				continue
			}
			below := height[c] - r + 1
			l.Panes = append(l.Panes, Pane{Parent: column[c][r-1], Dir: Down, Percent: 100 * (below - 1) / below})
			column[c] = append(column[c], len(l.Panes)-1)
		}
	}

	return l
}
