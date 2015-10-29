#!/bin/sh

set -e

npm install

# Dev App config
cp ./dist/config.dev.cson ./config/config.dev.cson
# Prod App config
cp ./dist/config.prod.cson ./config/config.prod.cson

# Dev App menu
cp ./dist/menu.dev.json ./config/menu.dev.json
# Prod App menu
cp ./dist/menu.prod.json ./config/menu.prod.json

# Hybrid config
cp ./dist/config.xml config.xml
# Sass config
cp ./dist/config.scss config.scss

# Release script
cp release.sh.dist release.sh
# About page
cp about.md.dist about.md
