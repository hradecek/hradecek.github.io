#!/usr/bin/env sh

pages_branch="master"

set -e
echo "Started deploying"

if [ `git branch | grep "${pages_branch}"` ]; then
    git branch -D "${pages_branch}"
fi
git checkout -b "${pages_branch}"

bundle exec jekyll build

find . -maxdepth 1 \
    ! -name '_site' \
    ! -name '.git' \
    ! -name '.gitignore' \
    -exec rm -rf {}

mv _site/* .
rmdir _site/

echo "Deployed successfully"
exit 0
