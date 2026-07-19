#!/bin/bash
set -e

cd "$(dirname "$0")"

git pull

npm install --no-audit --no-fund --legacy-peer-deps

rm -rf dist_new
node --max_old_space_size=512 node_modules/.bin/webpack --mode=production --output-path="$(pwd)/dist_new"

# Troca atômica: só substitui o dist/ em produção depois que o build novo
# terminou por completo, para o site nunca ficar sem index.html no ar.
mv dist "dist_old_$$" 2>/dev/null || true
mv dist_new dist
rm -rf "dist_old_$$"
