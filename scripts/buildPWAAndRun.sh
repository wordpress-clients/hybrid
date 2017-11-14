#!/bin/bash
PATH=$PATH:$(npm bin)
set -e

BUILDFOLDER=www/

./scripts/buildPWA.sh

cd $BUILDFOLDER
http-server -p 3000