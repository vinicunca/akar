#!/usr/bin/env node
/**
 * pre-push guard: refuse to push a tag whose commit is not on any local or
 * remote-tracking branch.
 *
 * Akar release tags always point at a commit on one of its branches. Tags
 * fetched from Reka UI point at commits that only exist upstream, and their
 * names (v2.1.0, v2.2.0, ...) collide with Akar versions. `bumpp` runs
 * `git push --tags`, so any such tag in the local repo would be pushed with
 * the next release.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import process from 'node:process';

const ZERO = /^0+$/;

function git(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  return result.status === 0
    ? result.stdout.trim()
    : '';
}

const offending = [];

// Git passes "<local ref> <local sha> <remote ref> <remote sha>" lines on stdin.
for (const line of fs.readFileSync(0, 'utf8').split('\n')) {
  const [localRef, localSha] = line.trim().split(/\s+/);
  if (!localRef?.startsWith('refs/tags/') || !localSha || ZERO.test(localSha)) {
    continue; // not a tag, or a tag deletion
  }
  const commit = git([
    'rev-parse',
    '--verify',
    '--quiet',
    `${localSha}^{commit}`,
  ]);
  if (!commit) {
    continue; // tag on a non-commit object
  }
  const branches = git([
    'for-each-ref',
    '--count=1',
    '--contains',
    commit,
    'refs/heads',
    'refs/remotes',
  ]);
  if (!branches) {
    offending.push(`  ${localRef.slice('refs/tags/'.length)} -> ${commit.slice(0, 8)} ${git(['log', '-1', '--format=%s', commit])}`);
  }
}

if (offending.length > 0) {
  process.stderr.write([
    '',
    `pre-push: refusing to push ${offending.length} tag(s) whose commit is on no branch (likely fetched from Reka UI):`,
    ...offending.slice(0, 20),
    ...(offending.length > 20
      ? [`  ... and ${offending.length - 20} more`]
      : []),
    '',
    'Remove local tags that are not on origin with:',
    '  git fetch --prune --prune-tags origin',
    '',
  ].join('\n'));
  process.exit(1);
}
