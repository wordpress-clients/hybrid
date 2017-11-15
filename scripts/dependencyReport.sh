#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/
SRCFOLDER=src/
CONFIGFOLDER=config/

# clean up previous build
rm -fr www/

# Compile config folder manually https://github.com/ionic-team/ionic-app-scripts/issues/1284
tsc --sourceMap true --project tsconfig_config.json

ionic-app-scripts build --prod \
                        --generateSourceMap true \
                        --wwwDir $BUILDFOLDER

source-map-explorer www/build/main.js www/build/main.js.map
source-map-explorer www/build/vendor.js www/build/vendor.js.map


# Cleanup config folder because of https://github.com/ionic-team/ionic-app-scripts/issues/1284
find $CONFIGFOLDER -name "*.js" -type f -delete
find $CONFIGFOLDER -name "*.js.map" -type f -delete
find $SRCFOLDER -name "*.js" -type f -delete
find $SRCFOLDER -name "*.js.map" -type f -delete