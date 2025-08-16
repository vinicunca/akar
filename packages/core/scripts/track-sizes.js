#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const historyFile = resolve(rootDir, 'size-history.json');
const summaryFile = resolve(rootDir, 'size-summary.json');

// Recursively find all JS/CJS files in dist
function findDistFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findDistFiles(fullPath, files);
    } else if (entry.endsWith('.js') || entry.endsWith('.cjs')) {
      // Use relative path from dist directory
      const relativePath = relative(distDir, fullPath);
      files.push(relativePath);
    }
  }

  return files.sort();
}

function getFileSize(filePath) {
  try {
    const stats = readFileSync(filePath);
    return {
      bytes: stats.length,
      kb: +(stats.length / 1024).toFixed(2),
    };
  } catch {
    return null;
  }
}

function getCurrentSizes() {
  const filesToTrack = findDistFiles(distDir);
  const sizes = {};

  for (const file of filesToTrack) {
    const filePath = resolve(distDir, file);
    const size = getFileSize(filePath);

    if (size) {
      sizes[file] = size;
    }
  }

  return {
    timestamp: new Date().toISOString(),
    commit: process.env.GITHUB_SHA || getGitCommit() || 'local',
    branch: process.env.GITHUB_REF_NAME || getGitBranch() || 'unknown',
    sizes,
    totalFiles: Object.keys(sizes).length,
    totalSize: Object.values(sizes).reduce((acc, s) => acc + s.bytes, 0),
  };
}

function getGitCommit() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function loadHistory() {
  if (!existsSync(historyFile)) {
    return [];
  }

  try {
    return JSON.parse(readFileSync(historyFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveHistory(history) {
  writeFileSync(historyFile, JSON.stringify(history, null, 2));
}

function loadSummary() {
  if (!existsSync(summaryFile)) {
    return { entries: [], lastUpdate: null };
  }

  try {
    return JSON.parse(readFileSync(summaryFile, 'utf8'));
  } catch {
    return { entries: [], lastUpdate: null };
  }
}

function saveSummary(summary) {
  writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
}

function formatSizeChange(current, previous) {
  if (!previous) {
    return '';
  }

  const diff = current - previous;
  const percent = ((diff / previous) * 100).toFixed(1);

  if (diff === 0) {
    return ' (no change)';
  }

  const sign = diff > 0 ? '+' : '';
  const color = diff > 0 ? '\x1B[31m' : '\x1B[32m'; // red for increase, green for decrease
  const reset = '\x1B[0m';

  return ` (${color}${sign}${diff}B / ${sign}${percent}%${reset})`;
}

function getSignificantChanges(current, previous) {
  if (!previous) {
    return [];
  }

  const changes = [];

  for (const [file, currentSize] of Object.entries(current.sizes)) {
    const prevSize = previous.sizes[file];
    if (!prevSize) {
      changes.push({ file, type: 'added', current: currentSize.bytes, change: currentSize.bytes });
      continue;
    }

    const diff = currentSize.bytes - prevSize.bytes;
    const percentChange = Math.abs((diff / prevSize.bytes) * 100);

    // Consider significant if > 1% change or > 1KB change
    if (percentChange > 1 || Math.abs(diff) > 1024) {
      changes.push({
        file,
        type: diff > 0 ? 'increased' : 'decreased',
        current: currentSize.bytes,
        previous: prevSize.bytes,
        change: diff,
        percentChange: +percentChange.toFixed(1),
      });
    }
  }

  // Check for removed files
  for (const [file, prevSize] of Object.entries(previous.sizes)) {
    if (!current.sizes[file]) {
      changes.push({ file, type: 'removed', previous: prevSize.bytes, change: -prevSize.bytes });
    }
  }

  return changes.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
}

function main() {
  const currentSnapshot = getCurrentSizes();
  const history = loadHistory();
  const previousSnapshot = history[history.length - 1];

  // Add current snapshot to history
  history.push(currentSnapshot);

  // Keep only last 50 entries to prevent file from getting too large
  if (history.length > 50) {
    history.splice(0, history.length - 50);
  }

  console.log('📦 Bundle Size Report\n');

  // Show summary
  const totalKB = (currentSnapshot.totalSize / 1024).toFixed(2);
  console.log(`Total files: ${currentSnapshot.totalFiles}`);
  console.log(`Total size: ${totalKB} KB`);
  console.log(`Commit: ${currentSnapshot.commit} (${currentSnapshot.branch})`);

  if (previousSnapshot) {
    const prevTotalKB = (previousSnapshot.totalSize / 1024).toFixed(2);
    const totalChange = formatSizeChange(currentSnapshot.totalSize, previousSnapshot.totalSize);
    console.log(`Previous: ${prevTotalKB} KB${totalChange}`);
  }

  console.log('');

  // Show significant changes
  if (previousSnapshot) {
    const changes = getSignificantChanges(currentSnapshot, previousSnapshot);

    if (changes.length > 0) {
      console.log('🔍 Significant Changes (>1% or >1KB):');
      console.log(`${'File'.padEnd(35)}${'Change'.padEnd(15)}Type`);
      console.log('─'.repeat(65));

      for (const change of changes.slice(0, 10)) { // Show top 10
        let changeStr;
        if (change.type === 'added') {
          changeStr = `+${(change.change / 1024).toFixed(2)} KB`;
        } else if (change.type === 'removed') {
          changeStr = `-${Math.abs(change.change / 1024).toFixed(2)} KB`;
        } else {
          const sign = change.change > 0 ? '+' : '';
          changeStr = `${sign}${(change.change / 1024).toFixed(2)} KB (${change.percentChange}%)`;
        }

        let typeColor;
        if (change.type === 'increased') {
          typeColor = '\x1B[31m';
        } else if (change.type === 'decreased') {
          typeColor = '\x1B[32m';
        } else if (change.type === 'added') {
          typeColor = '\x1B[33m';
        } else {
          typeColor = '\x1B[90m';
        }
        const reset = '\x1B[0m';

        const displayLine = `${change.file.padEnd(35)}${changeStr.padEnd(15)}${typeColor}${change.type}${reset}`;
        console.log(displayLine);
      }
      console.log('');
    }
  }

  // Update summary for trending
  const summary = loadSummary();
  summary.entries.push({
    timestamp: currentSnapshot.timestamp,
    commit: currentSnapshot.commit,
    branch: currentSnapshot.branch,
    totalSize: currentSnapshot.totalSize,
    totalFiles: currentSnapshot.totalFiles,
  });

  // Keep last 100 summary entries
  if (summary.entries.length > 100) {
    summary.entries.splice(0, summary.entries.length - 100);
  }

  summary.lastUpdate = currentSnapshot.timestamp;

  // Save files
  saveHistory(history);
  saveSummary(summary);

  console.log('─'.repeat(65));
  console.log(`Full history: ${history.length} snapshots in size-history.json`);
  console.log(`Summary trend: ${summary.entries.length} entries in size-summary.json`);
  console.log('Use --verbose to see all files');

  // Exit with error code if any file increased significantly (for CI)
  if (process.argv.includes('--fail-on-increase') && previousSnapshot) {
    const increases = getSignificantChanges(currentSnapshot, previousSnapshot)
      .filter((c) => c.type === 'increased');

    if (increases.length > 0) {
      console.log('\n❌ Significant size increases detected!');
      process.exit(1);
    }
  }

  console.log('\n✅ Size check complete');
}

main();
