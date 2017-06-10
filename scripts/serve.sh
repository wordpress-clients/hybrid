#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

ionic-app-scripts serve &
cd server/ && node ./index.js