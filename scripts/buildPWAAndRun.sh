#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/

./scripts/buildPWA.sh

cd $BUILDFOLDER
http-server -p 3000