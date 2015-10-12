export SHELL := /bin/bash
export PATH  := node_modules/.bin:$(PATH)

sources    := $(wildcard src/*.js)
compats := $(sources:src/%.js=dist/%.js)

all: lint test

dist/%.js: src/%.js
	babel --plugins array-includes < $< > $@

lint:
	eslint $(sources)

test: $(compats)
	mocha -u tdd

clean:
	rm -f $(compats)

.PHONY: all lint test clean
