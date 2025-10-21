#!/bin/bash

# Release script - Bumps versions, commits, tags, and pushes
# Usage: ./scripts/release.sh

set -e  # Exit on error

echo "🚀 Starting release process..."

git add .
git commit -m "chore: release" -n

echo ""

# Get the commit that was just created
COMMIT_HASH=$(git rev-parse HEAD)

# Find all package.json files in packages directory
for package_file in packages/*/package.json; do
  if [ -f "$package_file" ]; then
    PACKAGE_NAME=$(cat "$package_file" | jq -r '.name')
    PACKAGE_VERSION=$(cat "$package_file" | jq -r '.version')
    TAG="${PACKAGE_NAME}@${PACKAGE_VERSION}"
    
    # Create annotated tag pointing to the commit
    if git tag -a "$TAG" -m "Release ${TAG}" "$COMMIT_HASH" 2>/dev/null; then
      echo "✓ Created tag: $TAG"
    else
      echo "⚠️  Tag already exists: $TAG (skipping)"
    fi
  fi
done

echo ""

# git push origin $(git branch --show-current)

# git push --tags
