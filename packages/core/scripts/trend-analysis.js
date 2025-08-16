#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const historyFile = resolve(rootDir, 'size-history.json');
const summaryFile = resolve(rootDir, 'size-summary.json');

function loadHistory() {
  if (!existsSync(historyFile)) {
    console.log('❌ No history found. Run `pnpm track-sizes` first.');
    process.exit(1);
  }

  try {
    return JSON.parse(readFileSync(historyFile, 'utf8'));
  } catch {
    console.log('❌ Could not read history file.');
    process.exit(1);
  }
}

function loadSummary() {
  if (!existsSync(summaryFile)) {
    console.log('❌ No summary found. Run `pnpm track-sizes` first.');
    process.exit(1);
  }

  try {
    return JSON.parse(readFileSync(summaryFile, 'utf8'));
  } catch {
    console.log('❌ Could not read summary file.');
    process.exit(1);
  }
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function createSparkline(values, width = 20) {
  if (values.length < 2) {
    return '─'.repeat(width);
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  if (range === 0) {
    return '─'.repeat(width);
  }

  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

  return values.slice(-width).map((val) => {
    const normalized = (val - min) / range;
    const index = Math.floor(normalized * (chars.length - 1));
    return chars[Math.max(0, Math.min(chars.length - 1, index))];
  }).join('');
}

function analyzeTrends() {
  const summary = loadSummary();
  const entries = summary.entries;

  if (entries.length < 2) {
    console.log('📊 Size Trend Analysis\n');
    console.log('Need at least 2 data points for trend analysis.');
    console.log(`Current entries: ${entries.length}`);
    return;
  }

  console.log('📊 Size Trend Analysis\n');

  // Overall trend
  const sizes = entries.map((e) => e.totalSize);
  const first = sizes[0];
  const last = sizes[sizes.length - 1];
  const change = last - first;
  const changeKB = (change / 1024).toFixed(2);
  const changePercent = ((change / first) * 100).toFixed(1);

  const trendIcon = change > 0 ? '📈' : change < 0 ? '📉' : '➡️';
  const changeColor = change > 0 ? '\x1B[31m' : change < 0 ? '\x1B[32m' : '\x1B[33m';
  const reset = '\x1B[0m';

  console.log(`${trendIcon} Overall Trend (${entries.length} snapshots)`);
  console.log(`First: ${(first / 1024).toFixed(2)} KB → Last: ${(last / 1024).toFixed(2)} KB`);
  console.log(`Change: ${changeColor}${change > 0 ? '+' : ''}${changeKB} KB (${changePercent}%)${reset}`);
  console.log(`Sparkline: ${createSparkline(sizes)}`);
  console.log('');

  // Recent entries table
  const recent = entries.slice(-10);
  console.log('📅 Recent History (last 10 snapshots):');
  console.log(`${'Date'.padEnd(20)}${'Commit'.padEnd(10)}${'Size'.padEnd(12)}Change`);
  console.log('─'.repeat(60));

  for (let i = 0; i < recent.length; i++) {
    const entry = recent[i];
    const prev = i > 0 ? recent[i - 1] : null;

    const date = formatDate(entry.timestamp);
    const commit = entry.commit.slice(0, 8);
    const size = `${(entry.totalSize / 1024).toFixed(2)} KB`;

    let changeStr = '';
    if (prev) {
      const diff = entry.totalSize - prev.totalSize;
      const diffKB = (diff / 1024).toFixed(2);
      const diffPercent = ((diff / prev.totalSize) * 100).toFixed(1);

      if (diff !== 0) {
        const color = diff > 0 ? '\x1B[31m' : '\x1B[32m';
        changeStr = ` ${color}${diff > 0 ? '+' : ''}${diffKB} KB (${diffPercent}%)${reset}`;
      }
    }

    console.log(`${date.padEnd(20)}${commit.padEnd(10)}${size.padEnd(12)}${changeStr}`);
  }

  console.log('');

  // File count trend
  const fileCounts = entries.map((e) => e.totalFiles);
  const fileChange = fileCounts[fileCounts.length - 1] - fileCounts[0];

  if (fileChange !== 0) {
    console.log('📁 File Count Trend');
    console.log(`Files: ${fileCounts[0]} → ${fileCounts[fileCounts.length - 1]} (${fileChange > 0 ? '+' : ''}${fileChange})`);
    console.log(`Sparkline: ${createSparkline(fileCounts)}`);
    console.log('');
  }

  // Statistics
  const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
  const maxSize = Math.max(...sizes);
  const minSize = Math.min(...sizes);

  console.log('📊 Statistics');
  console.log(`Average size: ${(avgSize / 1024).toFixed(2)} KB`);
  console.log(`Peak size: ${(maxSize / 1024).toFixed(2)} KB`);
  console.log(`Smallest size: ${(minSize / 1024).toFixed(2)} KB`);
  console.log(`Variance: ${((maxSize - minSize) / 1024).toFixed(2)} KB`);

  // Export options
  console.log('');
  console.log('💾 Export Options:');
  console.log('• JSON history: size-history.json');
  console.log('• Summary data: size-summary.json');
  console.log('• Run with --csv to export CSV format');
}

function exportCSV() {
  const summary = loadSummary();
  const entries = summary.entries;

  console.log('timestamp,commit,branch,totalSize,totalFiles');
  for (const entry of entries) {
    console.log(`${entry.timestamp},${entry.commit},${entry.branch},${entry.totalSize},${entry.totalFiles}`);
  }
}

function main() {
  if (process.argv.includes('--csv')) {
    exportCSV();
    return;
  }

  analyzeTrends();
}

main();
