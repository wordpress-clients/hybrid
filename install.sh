#!/bin/sh

set -e

npm install

# Dev App config
cp config.json.dist config.json
# Prod App config
cp config.json.dist config.prod.json
# Hybrid config
cp config.xml.dist config.xml
# Sass config
cp config.scss.dist config.scss
# Release script
cp release.sh.dist release.sh
# About page
cp about.md.dist about.md
