# Hradecek's personal blog
Simple personal blog made of
 - [Jekyll](https://github.com/jekyll/jekyll),
 - [Webpack](https://github.com/webpack),
 - [Chalk theme](https://github.com/nielsenramon/chalk).

## Build and source changes
All sources files (`.scss`, `.js`, ...) are stored under `src/` directory. These files are processed by `webpack` (see `webpack.conf.js`). Resulting resources, such as stylesheets, bundles etc. are stored under standard jekyll's `_assets` folder and can be used as usual.

This implies that any change made under `src/` requires recompilation (running `webpack`) and commit to the repository.
