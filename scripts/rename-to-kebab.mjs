import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../packages/core/src');
const TARGET_FOLDERS = ['MonthPicker', 'MonthRangePicker', 'YearPicker', 'YearRangePicker'];

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
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
    throw new Error(`Cannot rename "${oldPath}" because "${newPath}" already exists.`);
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
