VERSION ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo "dev")
LDFLAGS = -ldflags "-X github.com/abdussamet032/son/internal/config.Version=$(VERSION)"

.PHONY: build install clean test completions

build:
	go build $(LDFLAGS) -o son .

install: build
	cp son /usr/local/bin/son
	@echo "son installed to /usr/local/bin/son"

install-home: build
	mkdir -p $(HOME)/bin
	cp son $(HOME)/bin/son
	@echo "son installed to $(HOME)/bin/son"

clean:
	rm -f son
	rm -rf dist/

test:
	go test ./...

completions:
	mkdir -p completions
	./son completion bash > completions/son.bash
	./son completion zsh > completions/_son
	./son completion fish > completions/son.fish
	@echo "Completions generated in completions/"

release:
	goreleaser release --clean

snapshot:
	goreleaser release --snapshot --clean
