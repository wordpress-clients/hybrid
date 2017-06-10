#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

# clean up previous build
rm -fr www/

ionic-app-scripts build --prod \
                        --generateSourceMap true

source-map-explorer www/build/main.js www/build/main.js.map