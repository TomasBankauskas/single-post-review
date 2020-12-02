#!/usr/bin/env bash

set -e
set -o pipefail
set -v

curl -s -X POST https://stg-api.stackbit.com/project/5ede1cce09cc5f1572cf9161/webhook/build/pull > /dev/null
curl -s -X POST https://stg-api.stackbit.com/project/5ede1cce09cc5f1572cf9161/webhook/build/ssgbuild > /dev/null

# Building main site
npm run build

# Pulling docs repo
rm -rf __docs
git clone https://$GITHUB_TOKEN:x-oauth-basic@github.com/stackbithq/stackbit-docs.git __docs

used_cache=0

if [ -n "$NETLIFY_BUILD_BASE" ] && [ -d "$NETLIFY_BUILD_BASE/cache/__docs" ]; then
  echo "Netlify cache detected."

  old_commit=$(git -C $NETLIFY_BUILD_BASE/cache/__docs rev-parse HEAD)
  echo $old_commit
  new_commit=$(git -C __docs/ rev-parse HEAD)
  echo $new_commit

  if [ "$old_commit" == "$new_commit" ]; then
    echo "No changes in the docs site. Using cached version."

    used_cache=1

    cp -R $NETLIFY_BUILD_BASE/cache/__docs/public public/docs
  else
    echo "Detected changes in the docs site. Will rebuild."
  fi
else
  echo "Netlify cache not found or docs site not present."
fi

if [ "$used_cache" == 0 ]; then
  echo "Building docs site."

  cd __docs
  npm install && npm run build --prefix-paths
  cd ..
  cp -R __docs/public public/docs

  if [ -n "$NETLIFY_BUILD_BASE" ]; then
    echo "Copying docs repository to Netlify cache."
    rm -rf $NETLIFY_BUILD_BASE/cache/__docs
    mv __docs/ $NETLIFY_BUILD_BASE/cache/__docs
  else
    rm -rf __docs/
  fi  
fi

curl -s -X POST https://stg-api.stackbit.com/project/5ede1cce09cc5f1572cf9161/webhook/build/publish > /dev/null
