#!/bin/sh

git config --global --add safe.directory "$(pwd)"

tag="v$(jq -r '.version' package.json)"
if git describe --tags --abbrev=0 > /dev/null 2>&1; then
	tag="$(git describe --tags --abbrev=0)"
fi

tag_commit="$(git rev-parse --short "$tag")"
cur_commit="$(git rev-parse --short HEAD)"

commit="$([ "$tag_commit" != "$cur_commit" ] && echo "+$cur_commit")"

status="$([ "$(git status --porcelain | wc -l)" -gt 0 ] && echo "-dirty")"
version="$tag${commit}${status}"

echo "export default \"${version}\""
