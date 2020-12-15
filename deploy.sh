#!/bin/bash

git pull

yarn install

# rm -rf dist/

echo "dist folder removed";

node --max_old_space_size=512 node_modules/.bin/webpack --mode=production

# yarn build
