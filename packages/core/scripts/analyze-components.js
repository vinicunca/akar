#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

function getComponentSizes() {
  const components = {};

  // Get all subdirectories in dist (components)
  const entries = readdirSync(distDir);

  for (const entry of entries) {
    const fullPath = resolve(distDir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      let totalSize = 0;
      let fileCount = 0;

      // Get all JS/CJS files in this component
      try {
        const files = readdirSync(fullPath);
        for (const file of files) {
          if (file.endsWith('.js') || file.endsWith('.cjs')) {
            const filePath = resolve(fullPath, file);
            const fileSize = readFileSync(filePath).length;
            totalSize += fileSize;
            fileCount += 1;
          }
        }

        if (fileCount > 0) {
          components[entry] = {
            totalSize,
            fileCount,
            avgSize: totalSize / fileCount,
            kb: +(totalSize / 1024).toFixed(2),
          };
        }
      } catch {
        // Skip if can't read directory
      }
    }
  }

  return components;
}

function main() {
  const components = getComponentSizes();
  const sorted = Object.entries(components).sort(([, a], [, b]) => b.totalSize - a.totalSize);

  console.log('🎯 Component Size Analysis\n');
  console.log(`${'Component'.padEnd(25)}${'Total Size'.padEnd(15)}${'Files'.padEnd(10)}Avg/File`);
  console.log('─'.repeat(75));

  let totalSize = 0;
  let totalFiles = 0;

  for (const [name, data] of sorted) {
    totalSize += data.totalSize;
    totalFiles += data.fileCount;

    const avgKB = +(data.avgSize / 1024).toFixed(2);

    const sizeStr = `${data.kb} KB`.padEnd(15);
    const filesStr = `${data.fileCount}`.padEnd(10);
    const avgStr = `${avgKB} KB`;

    console.log(
      `${name.padEnd(25)}${sizeStr}${filesStr}${avgStr}`,
    );
  }

  console.log('─'.repeat(75));
  const totalKB = +(totalSize / 1024).toFixed(2);
  const avgTotalKB = +(totalSize / totalFiles / 1024).toFixed(2);
  const totalSizeStr = `${totalKB} KB`.padEnd(15);
  const totalFilesStr = `${totalFiles}`.padEnd(10);
  console.log(`${'TOTAL'.padEnd(25)}${totalSizeStr}${totalFilesStr}${avgTotalKB} KB`);

  // Show top 5 largest components
  console.log('\n🔍 Top 5 Largest Components:');
  for (let i = 0; i < Math.min(5, sorted.length); i++) {
    const [name, data] = sorted[i];
    const percentage = ((data.totalSize / totalSize) * 100).toFixed(1);
    console.log(`${i + 1}. ${name}: ${data.kb} KB (${percentage}%)`);
  }

  console.log('\n✅ Analysis complete');
}

main();
