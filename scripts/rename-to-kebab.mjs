import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toKebabCase } from '@vinicunca/perkakas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../packages/pohon');
const TARGET_FOLDERS = [
  'test',
];

function isSameInode(a, b) {
  try {
    const sa = fs.statSync(a);
    const sb = fs.statSync(b);
    return sa.ino === sb.ino && sa.dev === sb.dev;
  } catch {
    return false;
  }
}

function renameEntry(oldPath) {
  const parentPath = path.dirname(oldPath);
  const oldName = path.basename(oldPath);
  const newName = toKebabCase(oldName);

  if (!newName || oldName === newName) {
    return oldPath;
  }

  const newPath = path.join(parentPath, newName);
  if (fs.existsSync(newPath)) {
    if (!isSameInode(oldPath, newPath)) {
      throw new Error(`Cannot rename "${oldPath}" because "${newPath}" already exists.`);
    }
    // Case-only rename on a case-insensitive volume: rename via a temp path first.
    const tempPath = path.join(parentPath, `.__kebab_rename_${process.pid}_${Date.now()}_${oldName}`);
    fs.renameSync(oldPath, tempPath);
    fs.renameSync(tempPath, newPath);
    console.log(`Renamed: ${oldPath} -> ${newPath}`);
    return newPath;
  }

  fs.renameSync(oldPath, newPath);
  console.log(`Renamed: ${oldPath} -> ${newPath}`);
  return newPath;
}

function renameTreeDeep(targetPath) {
  const entries = fs.readdirSync(targetPath, { withFileTypes: true });

  for (const entry of entries) {
    const oldEntryPath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      renameTreeDeep(oldEntryPath);
      renameEntry(oldEntryPath);
      continue;
    }

    renameEntry(oldEntryPath);
  }
}

function run() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory does not exist: ${SOURCE_DIR}`);
  }

  for (const folderName of TARGET_FOLDERS) {
    const folderPath = path.join(SOURCE_DIR, folderName);
    if (!fs.existsSync(folderPath)) {
      console.log(`Skipped missing folder: ${folderPath}`);
      continue;
    }

    renameTreeDeep(folderPath);
    renameEntry(folderPath);
  }
}

run();
