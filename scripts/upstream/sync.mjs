#!/usr/bin/env node
/**
 * Mirrors Reka UI history into Akar vendor branches, normalized to Akar's conventions.
 *
 * Each upstream commit becomes one vendor commit with the same author and message.
 * Its files are renamed (reka -> akar) and formatted with Akar's ESLint config.
 * Merging a vendor branch into an Akar branch is then a normal three-way merge.
 *
 * Usage:
 *   node scripts/upstream/sync.mjs status
 *   node scripts/upstream/sync.mjs sync <line|all> [--to <upstream-commit>] [--dry-run]
 *   node scripts/upstream/sync.mjs init <line> <upstream-commit>
 *   node scripts/upstream/sync.mjs tree <upstream-commit>
 *
 * See UPSTREAM.md for the workflow.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import config from './config.mjs';

// Bump when a change to this script changes the normalized output, so the cache is rebuilt.
const SCRIPT_VERSION = 1;
const ESLINT_CHUNK = 300;

const here = path.dirname(fileURLToPath(import.meta.url));
const root = git(['rev-parse', '--show-toplevel'], { cwd: here });
const commonDir = path.resolve(root, git(['rev-parse', '--git-common-dir'], { cwd: root }));
const stateDir = path.join(commonDir, 'akar-upstream');
const upstreamDir = path.join(stateDir, 'reka.git');
const workDir = path.join(stateDir, 'work');

// ---------------------------------------------------------------------------
// Process helpers

function run(cmd, args, { cwd = root, input, env, allowedStatus = [0] } = {}) {
  const result = spawnSync(cmd, args, {
    cwd,
    input,
    env: env
      ? {
          ...process.env,
          ...env,
        }
      : process.env,
    maxBuffer: 1024 * 1024 * 1024,
  });
  if (result.error) {
    throw result.error;
  }
  if (!allowedStatus.includes(result.status)) {
    throw new Error(`${cmd} ${args.join(' ')} exited with ${result.status}\n${result.stderr.toString()}${result.stdout.toString()}`);
  }
  return result;
}

function git(args, options = {}) {
  return run('git', args, options).stdout.toString().trim();
}

function up(args, options = {}) {
  return git(args, { ...options, cwd: upstreamDir });
}

function refExists(ref, cwd = root) {
  return run('git', ['show-ref', '--verify', '--quiet', ref], {
    cwd,
    allowedStatus: [0, 1],
  }).status === 0;
}

function isAncestor(ancestor, descendant, cwd = root) {
  return run('git', [
    'merge-base',
    '--is-ancestor',
    ancestor,
    descendant,
  ], {
    cwd,
    allowedStatus: [0, 1],
  }).status === 0;
}

function short(sha) {
  return sha.slice(0, 8);
}

function log(message) {
  process.stderr.write(`${message}\n`);
}

// ---------------------------------------------------------------------------
// Upstream clone and lint work tree

function ensureUpstream({ fetch }) {
  if (!fs.existsSync(upstreamDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
    log(`Cloning ${config.repository}`);
    git([
      'clone',
      '--bare',
      '--no-tags',
      config.repository,
      upstreamDir,
    ], { cwd: stateDir });
  }
  if (fetch) {
    const refspecs = Object.values(config.lines).map((line) => `+refs/heads/${line.upstreamBranch}:refs/heads/${line.upstreamBranch}`);
    up([
      'fetch',
      '--quiet',
      '--no-tags',
      config.repository,
      ...refspecs,
    ]);
  }
}

function primaryWorktree() {
  const first = git(['worktree', 'list', '--porcelain']).split('\n')[0];
  return first.replace(/^worktree /, '');
}

let workReady = false;

function ensureWork() {
  if (workReady) {
    return;
  }
  const lintCommit = git(['rev-parse', '--verify', `${config.lintRef}^{commit}`]);
  if (fs.existsSync(path.join(workDir, '.git'))) {
    git([
      'checkout',
      '--quiet',
      '--detach',
      '--force',
      lintCommit,
    ], { cwd: workDir });
  } else {
    git(['worktree', 'prune']);
    git([
      'worktree',
      'add',
      '--quiet',
      '--detach',
      '--force',
      workDir,
      lintCommit,
    ]);
  }
  const modules = path.join(workDir, 'node_modules');
  if (!fs.existsSync(modules)) {
    const source = [
      root,
      primaryWorktree(),
    ].map((dir) => path.join(dir, 'node_modules')).find((dir) => fs.existsSync(dir));
    if (!source) {
      throw new Error('node_modules not found. Run `pnpm install` first.');
    }
    fs.symlinkSync(fs.realpathSync(source), modules);
  }
  cleanWork();
  workReady = true;
}

function cleanWork() {
  git(['reset', '--quiet', '--hard'], { cwd: workDir });
  git(['clean', '-fdq', '-e', 'node_modules'], { cwd: workDir });
}

// ---------------------------------------------------------------------------
// Normalization

function globToRegExp(glob) {
  let source = '';
  for (let index = 0; index < glob.length; index++) {
    const char = glob[index];
    if (char === '*' && glob[index + 1] === '*') {
      const slash = glob[index + 2] === '/';
      source += slash ? '(?:.*/)?' : '.*';
      index += slash ? 2 : 1;
    } else if (char === '*') {
      source += '[^/]*';
    } else {
      source += char.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    }
  }
  return new RegExp(`^${source}$`);
}

const excludePatterns = config.exclude.map(globToRegExp);

function isExcluded(file) {
  return excludePatterns.some((pattern) => pattern.test(file));
}

function transformText(file, text) {
  const kept = [];
  let output = text;
  for (const pattern of config.keep) {
    output = output.replace(pattern, (match) => {
      kept.push(match);
      return `\u0000${kept.length - 1}\u0000`;
    });
  }
  for (const [pattern, replacement] of config.replacements) {
    output = output.replace(pattern, replacement);
  }
  output = output.replace(/\0(\d+)\0/g, (_, index) => kept[Number(index)]);

  if (path.basename(file) === 'package.json' && config.pinnedVersion) {
    output = output.replace(/^(\s*"version":\s*)"[^"]*"/m, `$1"${config.pinnedVersion}"`);
  }
  return output;
}

let cache;
let cacheFile;

function loadCache() {
  if (cache) {
    return;
  }
  ensureWork();
  const hash = createHash('sha256');
  hash.update(String(SCRIPT_VERSION));
  const { exclude, keep, pinnedVersion, replacements } = config;
  hash.update(JSON.stringify({
    exclude,
    keep,
    pinnedVersion,
    replacements,
  }, (_, value) => value instanceof RegExp
    ? String(value)
    : value));
  for (const file of fs.readdirSync(workDir).filter((name) => /^eslint\.config\./.test(name))) {
    hash.update(fs.readFileSync(path.join(workDir, file)));
  }
  for (const pkg of ['eslint', '@vinicunca/eslint-config']) {
    const manifest = path.join(workDir, 'node_modules', pkg, 'package.json');
    hash.update(fs.existsSync(manifest)
      ? JSON.parse(fs.readFileSync(manifest, 'utf8')).version
      : 'missing');
  }
  cacheFile = path.join(stateDir, 'cache', `${hash.digest('hex').slice(0, 16)}.json`);
  cache = fs.existsSync(cacheFile)
    ? new Map(Object.entries(JSON.parse(fs.readFileSync(cacheFile, 'utf8'))))
    : new Map();
}

function saveCache() {
  fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(Object.fromEntries(cache)));
}

function readBlobs(shas) {
  const output = run('git', ['cat-file', '--batch'], { cwd: upstreamDir, input: `${shas.join('\n')}\n` }).stdout;
  const blobs = new Map();
  let position = 0;
  for (const sha of shas) {
    const newline = output.indexOf(10, position);
    const [, type, size] = output.subarray(position, newline).toString().split(' ');
    if (type !== 'blob') {
      throw new Error(`Upstream object ${sha} is ${type}`);
    }
    const start = newline + 1;
    const end = start + Number(size);
    blobs.set(sha, output.subarray(start, end));
    position = end + 1;
  }
  return blobs;
}

const treeMemo = new Map();

/** Returns the Akar tree object holding the normalized files of an upstream commit. */
function transformTree(upstreamSha) {
  if (treeMemo.has(upstreamSha)) {
    return treeMemo.get(upstreamSha);
  }
  loadCache();
  const listing = run('git', [
    'ls-tree',
    '-r',
    '-z',
    '--full-tree',
    upstreamSha,
    '--',
    ...config.include,
  ], { cwd: upstreamDir }).stdout.toString();
  const entries = [];
  for (const record of listing.split('\0').filter(Boolean)) {
    const tab = record.indexOf('\t');
    const [mode, type, sha] = record.slice(0, tab).split(' ');
    const file = record.slice(tab + 1);
    if (type === 'blob' && !isExcluded(file)) {
      entries.push({
        mode,
        sha,
        file,
        key: `${file}\0${sha}`,
      });
    }
  }

  const misses = entries.filter((entry) => !cache.has(entry.key));
  if (misses.length > 0) {
    normalizeFiles(misses);
  }

  const index = path.join(stateDir, 'index.tmp');
  fs.rmSync(index, { force: true });
  const env = { GIT_INDEX_FILE: index };
  const info = entries.map((entry) => `${entry.mode} ${cache.get(entry.key)}\t${entry.file}\0`).join('');
  git(['update-index', '-z', '--index-info'], { input: info, env });
  const tree = git(['write-tree'], { env });
  fs.rmSync(index, { force: true });
  treeMemo.set(upstreamSha, tree);
  return tree;
}

function normalizeFiles(entries) {
  ensureWork();
  const unique = [
    ...new Map(entries.map((entry) => [entry.key, entry])).values(),
  ];
  const blobs = readBlobs(unique.map((entry) => entry.sha));
  const lintable = [];
  for (const entry of unique) {
    const target = path.join(workDir, entry.file);
    fs.rmSync(target, { force: true, recursive: true });
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const content = blobs.get(entry.sha);
    if (entry.mode === '120000' || content.subarray(0, 8000).includes(0)) {
      fs.writeFileSync(target, content);
    } else {
      fs.writeFileSync(target, transformText(entry.file, content.toString('utf8')));
      lintable.push(entry.file);
    }
  }

  log(`  normalizing ${unique.length} file(s)`);
  const eslint = path.join(workDir, 'node_modules', '.bin', 'eslint');
  for (let start = 0; start < lintable.length; start += ESLINT_CHUNK) {
    run(eslint, [
      '--fix',
      '--no-warn-ignored',
      '--',
      ...lintable.slice(start, start + ESLINT_CHUNK),
    ], {
      cwd: workDir,
      allowedStatus: [0, 1],
    });
  }

  const hashes = git([
    'hash-object',
    '-w',
    '--no-filters',
    '--stdin-paths',
  ], {
    cwd: workDir,
    input: unique.map((entry) => entry.file).join('\n'),
  }).split('\n');
  for (const [index, entry] of unique.entries()) {
    cache.set(entry.key, hashes[index]);
  }
  saveCache();
  cleanWork();
}

// ---------------------------------------------------------------------------
// Vendor branches

function getLine(name) {
  const line = config.lines[name];
  if (!line) {
    throw new Error(`Unknown line "${name}". Use one of: ${Object.keys(config.lines).join(', ')}`);
  }
  return line;
}

const vendorMaps = new Map();

/** Maps upstream commits to the vendor commits imported from them. */
function vendorMap(name) {
  if (vendorMaps.has(name)) {
    return vendorMaps.get(name);
  }
  const ref = `refs/heads/${getLine(name).vendorBranch}`;
  const map = new Map();
  if (refExists(ref)) {
    const output = git(['log', '--format=%H%x1f%(trailers:key=Upstream-Commit,valueonly,separator=)%x1e', ref]);
    for (const record of output.split('\x1E')) {
      const [vendor, upstream] = record.trim().split('\x1F');
      if (vendor && upstream && !map.has(upstream.trim())) {
        map.set(upstream.trim(), vendor);
      }
    }
  }
  vendorMaps.set(name, map);
  return map;
}

function upstreamOf(vendorCommit) {
  const value = git([
    'log',
    '-1',
    '--format=%(trailers:key=Upstream-Commit,valueonly,separator=)',
    vendorCommit,
  ]);
  if (!value) {
    throw new Error(`${short(vendorCommit)} has no Upstream-Commit trailer`);
  }
  return value;
}

/**
 * Finds the vendor commit of a line that has the same normalized files as an upstream commit.
 * Upstream commits that changed nothing in the mirrored paths have no vendor commit of their own,
 * so this walks back to the closest imported ancestor and checks that the files match.
 */
function resolveVendor(upstreamSha, name) {
  const line = getLine(name);
  const map = vendorMap(name);
  const chain = up([
    'rev-list',
    '--first-parent',
    '--max-count=2000',
    upstreamSha,
  ]).split('\n');
  for (const candidate of chain) {
    if (!map.has(candidate)) {
      continue;
    }
    const vendor = map.get(candidate);
    if (transformTree(upstreamSha) === git(['rev-parse', `${vendor}^{tree}`])) {
      return vendor;
    }
    break;
  }
  throw new Error(`Upstream ${short(upstreamSha)} is not in ${line.vendorBranch} yet. Run \`sync ${name}\` first.`);
}

function rewriteMessage(message) {
  return message
    .split('\n')
    .map((text) => {
      if (/^(?:co-authored-by|signed-off-by):/i.test(text)) {
        return text;
      }
      return text
        // Point issue and PR references at Reka UI instead of Akar.
        .replace(/(^|[\s(])#(\d+)\b/g, '$1unovue/reka-ui#$2')
        // Avoid mentioning upstream users from Akar's history.
        .replace(/(^|\s)@([a-z\d](?:[a-z\d-]*[a-z\d])?)\b(?!\/)/gi, '$1`@$2`');
    })
    .join('\n');
}

function addTrailers(message, trailers) {
  const args = ['interpret-trailers', '--trim-empty'];
  for (const [key, value] of trailers) {
    args.push('--trailer', `${key}: ${value}`);
  }
  return git(args, { input: `${message.trim()}\n` });
}

function commit({ tree, parents, message, author }) {
  const env = author
    ? { GIT_AUTHOR_NAME: author.name, GIT_AUTHOR_EMAIL: author.email, GIT_AUTHOR_DATE: author.date }
    : undefined;
  const args = [
    'commit-tree',
    tree,
    ...parents.flatMap((parent) => ['-p', parent]),
    '-F',
    '-',
  ];
  return git(args, { input: `${message.trim()}\n`, env });
}

function upstreamAuthor(sha) {
  const [name, email, date] = up([
    'log',
    '-1',
    '--format=%an%x00%ae%x00%aI',
    sha,
  ]).split('\0');
  return { name, email, date };
}

// ---------------------------------------------------------------------------
// Commands

function cmdInit(name, ref) {
  if (!ref) {
    throw new Error('Usage: init <line> <upstream-commit>');
  }
  const line = getLine(name);
  const vendorRef = `refs/heads/${line.vendorBranch}`;
  if (refExists(vendorRef)) {
    throw new Error(`${line.vendorBranch} already exists`);
  }
  ensureUpstream({ fetch: true });
  const sha = up(['rev-parse', '--verify', `${ref}^{commit}`]);
  const parents = [];
  let body;
  if (line.parentLine) {
    const parentLine = getLine(line.parentLine);
    const base = up(['merge-base', sha, `refs/heads/${parentLine.upstreamBranch}`]);
    parents.push(resolveVendor(base, line.parentLine));
    const subjects = up([
      'log',
      '--first-parent',
      '--format=- %s',
      `${base}..${sha}`,
    ]);
    body = [
      `Squashes the Reka UI \`${line.upstreamBranch}\` changes on top of \`${parentLine.upstreamBranch}\` at ${short(base)}.`,
      'Later upstream commits are imported one by one.',
      '',
      rewriteMessage(subjects),
    ].join('\n');
  } else {
    body = [
      `Snapshot of Reka UI \`${line.upstreamBranch}\` at ${short(sha)}.`,
      'Akar already contains these changes; merge this commit with `-s ours` to record that.',
    ].join('\n');
  }
  const message = addTrailers(
    `chore(upstream): import reka-ui ${line.upstreamBranch} at ${short(sha)}\n\n${body}`,
    [
      ['Upstream-Branch', line.upstreamBranch],
      ['Upstream-Commit', sha],
    ],
  );
  const vendor = commit({
    tree: transformTree(sha),
    parents,
    message,
  });
  git([
    'update-ref',
    '-m',
    `upstream: init ${name}`,
    vendorRef,
    vendor,
    '',
  ]);
  log(`Created ${line.vendorBranch} at ${short(vendor)} from upstream ${short(sha)}`);
}

function cmdSync(name, { to, dryRun }) {
  if (name === 'all') {
    for (const each of Object.keys(config.lines)) {
      cmdSync(each, { dryRun });
    }
    return;
  }
  const line = getLine(name);
  const vendorRef = `refs/heads/${line.vendorBranch}`;
  if (!refExists(vendorRef)) {
    throw new Error(`${line.vendorBranch} does not exist. Run \`init ${name} <upstream-commit>\` first.`);
  }
  ensureUpstream({ fetch: true });
  let tip = git(['rev-parse', vendorRef]);
  const last = upstreamOf(tip);
  const target = up(['rev-parse', '--verify', `${to ?? `refs/heads/${line.upstreamBranch}`}^{commit}`]);
  if (!isAncestor(last, target, upstreamDir)) {
    throw new Error(`Upstream ${short(target)} does not contain the last imported commit ${short(last)}`);
  }
  const commits = up([
    'rev-list',
    '--reverse',
    '--first-parent',
    `${last}..${target}`,
  ]).split('\n').filter(Boolean);
  log(`${line.vendorBranch}: ${commits.length} upstream commit(s) after ${short(last)}`);

  let created = 0;
  for (const sha of commits) {
    const subject = up(['log', '-1', '--format=%s', sha]);
    const tree = transformTree(sha);
    const parents = [tip];
    const upstreamParents = up([
      'rev-list',
      '--parents',
      '-n',
      '1',
      sha,
    ]).split(' ').slice(2);
    if (line.parentLine) {
      for (const parent of upstreamParents) {
        const vendor = resolveVendor(parent, line.parentLine);
        if (!isAncestor(vendor, tip)) {
          parents.push(vendor);
        }
      }
    }
    if (parents.length === 1 && tree === git(['rev-parse', `${tip}^{tree}`])) {
      log(`  skip   ${short(sha)} ${subject}`);
      continue;
    }
    log(`  import ${short(sha)} ${subject}`);
    if (dryRun) {
      continue;
    }
    const message = addTrailers(rewriteMessage(up(['log', '-1', '--format=%B', sha])), [
      ['Upstream-Commit', sha],
    ]);
    const vendor = commit({
      tree,
      parents,
      message,
      author: upstreamAuthor(sha),
    });
    git([
      'update-ref',
      '-m',
      `upstream: sync ${name}`,
      vendorRef,
      vendor,
      tip,
    ]);
    tip = vendor;
    created++;
  }
  vendorMaps.delete(name);
  if (created > 0) {
    log(`${line.vendorBranch}: imported ${created} commit(s). Merge it into ${line.target}:`);
    log(`  git switch ${line.target} && git merge ${line.vendorBranch}`);
  }
}

function cmdStatus() {
  ensureUpstream({ fetch: true });
  for (const [name, line] of Object.entries(config.lines)) {
    const vendorRef = `refs/heads/${line.vendorBranch}`;
    if (!refExists(vendorRef)) {
      log(`${name}: ${line.vendorBranch} not created`);
      continue;
    }
    const tip = git(['rev-parse', vendorRef]);
    const last = upstreamOf(tip);
    const pending = up([
      'rev-list',
      '--count',
      '--first-parent',
      `${last}..refs/heads/${line.upstreamBranch}`,
    ]);
    const targetRef = `refs/heads/${line.target}`;
    let merged = `${line.target} does not exist`;
    if (refExists(targetRef)) {
      merged = isAncestor(tip, targetRef)
        ? `merged into ${line.target}`
        : `NOT merged into ${line.target}`;
    }
    log(`${name}: ${line.vendorBranch} at reka-ui ${short(last)}, ${pending} upstream commit(s) pending, ${merged}`);
  }
}

function cmdTree(ref) {
  ensureUpstream({ fetch: false });
  process.stdout.write(`${transformTree(up(['rev-parse', '--verify', `${ref}^{commit}`]))}\n`);
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const flags = {
    dryRun: rest.includes('--dry-run'),
  };
  const toIndex = rest.indexOf('--to');
  if (toIndex !== -1) {
    flags.to = rest[toIndex + 1];
  }
  const positional = rest.filter((arg, index) => !arg.startsWith('--') && (toIndex === -1 || index !== toIndex + 1));

  switch (command) {
    case 'init':
      return cmdInit(positional[0], positional[1]);
    case 'sync':
      return cmdSync(positional[0] ?? 'all', flags);
    case 'status':
      return cmdStatus();
    case 'tree':
      return cmdTree(positional[0]);
    default:
      log('Usage: sync.mjs <status|sync <line|all> [--to <sha>] [--dry-run]|init <line> <sha>|tree <sha>>');
      process.exitCode = command ? 1 : 0;
  }
}

try {
  main();
} catch (error) {
  log(error.message);
  process.exitCode = 1;
}
