#!/bin/bash

git pull

npm install --no-audit --no-fund --legacy-peer-deps

rm -rf dist/

node --max_old_space_size=512 node_modules/.bin/webpack --mode=production
