#!/usr/bin/env sh

pages_branch="master"

set -e
echo "Started deploying"

if [ "`git branch | grep ${pages_branch}`" ]; then
    git branch -D "${pages_branch}"
fi
git checkout -b "${pages_branch}"

bundle exec jekyll build

find . -maxdepth 1 \
    ! -name '_site' \
    ! -name '.git' \
    ! -name '.gitignore' \
    ! -name 'node_modules' \
    ! -name 'bin' \
    -exec rm -rf {} \;

mv _site/* .
rmdir _site/

git add -A
git reset bin/

git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f -q origin ${pages_branch}

git checkout -

echo "Deployed successfully"
exit 0
