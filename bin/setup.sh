#!/usr/bin/env sh

set -e

sudo gem install bundler --conservative

bundle check || bundle install
bundle update

npm install

node_modules/webpack/bin/webpack.js

