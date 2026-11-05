# Reka UI v3 sync

Akar's `v2` branch starts from the Reka UI `v3` files at commit
[`984eddbaf91b4e84298db20a0740a9b16f3c4dd5`](https://github.com/unovue/reka-ui/commit/984eddbaf91b4e84298db20a0740a9b16f3c4dd5).
The upstream package version is `3.0.0-alpha.0`.
The import preserves the upstream files, package names, tooling, and MIT license.
Akar's existing customizations remain on `main`.

The first import commit has Akar's `main` as its parent.
The second commit records the source and this procedure.
Upstream commits are not parents of either commit.
`.upstream/reka-ui.json` records the last imported upstream commit.

## Apply the next update

Start on `v2` with no uncommitted changes.
Use a temporary repository to download upstream history outside this repository.
This keeps upstream history out of Akar's branches and tags.
Run these commands from Akar's repository root:

```sh
git switch v2
git status --short

base=$(node -p "JSON.parse(require('node:fs').readFileSync('.upstream/reka-ui.json', 'utf8')).commit")
next=$(git ls-remote https://github.com/unovue/reka-ui.git refs/heads/v3 | cut -f1)
sync_dir=$(mktemp -d)
git init --bare "$sync_dir/reka.git"
git -C "$sync_dir/reka.git" fetch --filter=blob:none https://github.com/unovue/reka-ui.git "$base" "$next"
git -C "$sync_dir/reka.git" diff --binary --full-index "$base" "$next" > "$sync_dir/reka.patch"
git apply --3way --index "$sync_dir/reka.patch"
```

If `base` equals `next`, there is no upstream update to apply.
If the patch has conflicts, resolve them and stage the resolved files with `git add`.
The patch includes upstream deletions, renames, and binary changes.
Git uses the previous file contents to preserve local changes when possible.

Review the staged changes with `git diff --cached`.
Install the locked dependencies and run the relevant upstream checks:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test:run
pnpm --filter plugins test
```

Run `pnpm test:browser:all` when the update changes browser behavior.
Install the Playwright browsers first if they are missing.
Update `commit`, `version`, and `syncedAt` in `.upstream/reka-ui.json` after all changes pass review.
Read the version from `packages/core/package.json`.
Use the full value of `next` for `commit`.
Keep that metadata update in the same commit as the upstream file changes:

```sh
git add .upstream/reka-ui.json
git diff --cached --stat
git commit -m "chore(upstream): sync Reka UI v3" -m "Upstream-Commit: $next"
git push origin v2
```

Create a fresh Akar commit for each later sync, in the order applied.
Do not merge, rebase onto, or push upstream branches or tags into Akar.
Keep the temporary repository until any patch conflicts are resolved.
