#!/bin/sh

tag="0.0.0"
if git describe --tags --abbrev=0 > /dev/null 2>&1; then
	tag="$(git describe --tags --abbrev=0)"
fi
status=$([ "$(git status --porcelain | wc -l)" -gt 0 ] && echo "-dirty")
version="$tag+$(git rev-parse --short HEAD)${status}"

echo "export default \"${version}\""
