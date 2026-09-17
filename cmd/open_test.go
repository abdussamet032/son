package cmd

import (
	"reflect"
	"testing"
)

func TestExpandArgs(t *testing.T) {
	tests := []struct{ in, want []string }{
		{[]string{"tgsp", "-2"}, []string{"tgsp", "--layout=2"}},
		{[]string{"-4", "tgsp", "-n"}, []string{"--layout=4", "tgsp", "-n"}},
		{[]string{"-12"}, []string{"--layout=12"}}, // rejected later by layout.Parse
		{[]string{"-"}, []string{"-"}},
		{[]string{"-l", "grid", "-e", "code"}, []string{"-l", "grid", "-e", "code"}},
		{[]string{"x", "--", "-2"}, []string{"x", "--", "-2"}},
	}
	for _, tt := range tests {
		if got := ExpandArgs(tt.in); !reflect.DeepEqual(got, tt.want) {
			t.Errorf("ExpandArgs(%q) = %q, want %q", tt.in, got, tt.want)
		}
	}
}
