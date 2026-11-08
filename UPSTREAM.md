# Following Reka UI

Akar started as a fork of [Reka UI](https://github.com/unovue/reka-ui).
It takes upstream changes through vendor branches instead of porting commits by hand.

## Branches

| Akar branch | Contents | Merged into |
| --- | --- | --- |
| `upstream/reka-v2` | Reka UI `v2`, normalized to Akar's conventions | `main` (Akar 2.x) |
| `upstream/reka-v3` | Reka UI `v3`, normalized to Akar's conventions | `next` (Akar 3.x) |
| `main` | Akar 2.x | |
| `next` | Akar 3.x, published as prereleases until Reka UI v3 is stable | |

Only `scripts/upstream/sync.mjs` writes to the vendor branches.
Never commit to them by hand.

Each upstream commit becomes one vendor commit with the same author and message.
Its files are normalized before they are committed:

- `reka` becomes `akar` in names, data attributes, CSS variables and package imports.
- Documentation links point to `vinicunca.dev/akar`.
- Links to upstream issues, pull requests and commits stay on Reka UI.
- Package versions are pinned, so upstream release bumps never conflict with Akar's versions.
- Every file is formatted with Akar's ESLint config from `main`.

Because both sides use the same conventions, merging a vendor branch is an ordinary three-way merge.
Conflicts only appear where Akar changed the same lines on purpose.

The rules live in `scripts/upstream/config.mjs`.
Only `packages/core`, `packages/plugins` and `playground` are mirrored.
Everything else, such as the docs, CI and the root config, belongs to Akar.

## Take upstream changes

Run `pnpm install` once so the script can use ESLint.
Then, from any worktree:

```sh
pnpm upstream status           # what is pending and what is merged
pnpm upstream sync all         # import new upstream commits into both vendor branches

git switch main
git merge upstream/reka-v2

git switch next
git merge upstream/reka-v3
git merge main                 # carry Akar's own 2.x fixes into 3.x
```

`sync` imports Reka UI `v2` before `v3`.
Reka UI regularly merges `v2` into `v3`; those merges keep both parents on `upstream/reka-v3`.
So a fix merged into `main` and also into `next` through `upstream/reka-v3` does not conflict with itself.

Run the checks after each merge:

```sh
pnpm lint
pnpm test
pnpm build
```

Push the vendor branches together with the branch you merged them into:

```sh
git push origin upstream/reka-v2 upstream/reka-v3 main next
```

## Resolve conflicts

A conflict means Akar and Reka UI changed the same lines.
Keep the upstream behaviour and reapply Akar's change on top of it.
Akar's usual changes are:

- Utilities from `@vinicunca/perkakas`, such as `KEY_CODES` and `clamp`, in place of local helpers.
- Formatting the linter does not enforce, such as object literals split over several lines.

If an upstream file was deleted in Akar on purpose, `git rm` it again.

## Akar's own changes

Commit them to `main` or `next` as usual.
Prefer new files over edits to upstream files: new files never conflict.
When you must change an upstream file, keep the change small and local.

If a new convention can be applied mechanically, add it to `scripts/upstream/config.mjs` instead of changing every file.
Changing the config or Akar's ESLint config rebuilds the normalization cache automatically.
It does not rewrite commits already on the vendor branches.

## How it started

`upstream/reka-v2` starts at Reka UI `v2` commit `5d3cd529` (2026-11-05).
Akar's `main` already contained every change up to that commit, so it was merged with `-s ours`.
That merge records the commit as the common base without changing any files.

`upstream/reka-v3` continues from that base.
Its first commit squashes Reka UI `v3` up to `984eddba`, the merge that brought `5d3cd529` into `v3`.
Every later commit is imported individually.

The script keeps its clone of Reka UI, its lint work tree and its cache in `.git/akar-upstream`.
Deleting that directory is safe; the next run recreates it.
