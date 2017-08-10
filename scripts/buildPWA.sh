#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/

# clean up previous build
rm -fr $BUILDFOLDER

# Prod build
ionic-app-scripts build --prod \
                        --wwwDir $BUILDFOLDER

# ngu-app-shell --module src/app/app.module.ts

# Generate our SW manifest
ngu-sw-manifest --in config/ngsw-manifest.json \
                --out $BUILDFOLDER"ngsw-manifest.json" \
                --dist $BUILDFOLDER
                # --module src/app/app.module.ts \

# Copy basic SW file
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js $BUILDFOLDER