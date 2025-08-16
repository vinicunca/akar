#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const sizesFile = resolve(rootDir, 'bundle-sizes.json');

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
    commit: process.env.GITHUB_SHA || 'local',
    sizes,
  };
}

function loadPreviousSizes() {
  if (!existsSync(sizesFile)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(sizesFile, 'utf8'));
  } catch {
    return null;
  }
}

function saveSizes(sizes) {
  writeFileSync(sizesFile, JSON.stringify(sizes, null, 2));
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

function main() {
  const currentSizes = getCurrentSizes();
  const previousSizes = loadPreviousSizes();

  console.log('📦 Bundle Size Report\n');

  const fileEntries = Object.entries(currentSizes.sizes);
  const totalFiles = fileEntries.length;

  // Group files by component/folder
  const grouped = {};
  for (const [file, size] of fileEntries) {
    const folder = file.includes('/') ? file.split('/')[0] : 'root';
    if (!grouped[folder]) {
      grouped[folder] = [];
    }
    grouped[folder].push([file, size]);
  }

  // Show summary first
  const totalSize = fileEntries.reduce((acc, [, size]) => acc + size.bytes, 0);
  const totalKB = (totalSize / 1024).toFixed(2);

  console.log(`Total files: ${totalFiles}`);
  console.log(`Total size: ${totalKB} KB\n`);

  // Show main bundles first
  if (grouped.root) {
    console.log('📁 Main Bundles');
    console.log(`${'File'.padEnd(25)}${'Size'.padEnd(12)}Change`);
    console.log('─'.repeat(55));

    for (const [file, current] of grouped.root) {
      const previous = previousSizes?.sizes[file]?.bytes;
      const change = formatSizeChange(current.bytes, previous);

      console.log(
        file.padEnd(25)
        + `${current.kb} KB`.padEnd(12)
        + change,
      );
    }
    console.log('');
    delete grouped.root;
  }

  // Show components with changes or if --verbose
  const showAll = process.argv.includes('--verbose');
  let hasIncrease = false;

  for (const [folder, files] of Object.entries(grouped).sort()) {
    const folderHasChanges = files.some(([file]) => {
      const previous = previousSizes?.sizes[file]?.bytes;
      const current = currentSizes.sizes[file].bytes;
      return previous && current !== previous;
    });

    if (!folderHasChanges && !showAll) {
      continue;
    }

    console.log(`📁 ${folder}/`);
    console.log(`${'File'.padEnd(25)}${'Size'.padEnd(12)}Change`);
    console.log('─'.repeat(55));

    for (const [file, current] of files) {
      const previous = previousSizes?.sizes[file]?.bytes;
      const change = formatSizeChange(current.bytes, previous);

      if (previous && current.bytes > previous) {
        hasIncrease = true;
      }

      // Only show if there's a change or if verbose
      if (change || showAll) {
        const displayFile = file.includes('/') ? file.split('/').slice(1).join('/') : file;
        console.log(
          displayFile.padEnd(25)
          + `${current.kb} KB`.padEnd(12)
          + change,
        );
      }
    }
    console.log('');
  }

  console.log('─'.repeat(55));
  console.log(`Report generated at: ${currentSizes.timestamp}`);
  console.log(`Use --verbose to show all ${totalFiles} files`);

  // Save current sizes for next comparison
  saveSizes(currentSizes);

  // Exit with error code if any file increased (for CI)
  if (process.argv.includes('--fail-on-increase') && hasIncrease) {
    console.log('\n❌ Some files increased in size!');
    process.exit(1);
  }

  console.log('\n✅ Size check complete');
}

main();
