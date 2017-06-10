#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

./scripts/buildPWA.sh

cd www/
http-server -p 3000