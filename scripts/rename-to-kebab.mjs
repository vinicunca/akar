import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIR = '/Users/praburangki/Dev/@vinicunca/akar/docs/app/components/content/examples/pohon/table';

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function renameFiles() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Directory not found: ${TARGET_DIR}`);
    return;
  }

  const files = fs.readdirSync(TARGET_DIR);

  files.forEach((file) => {
    const oldPath = path.join(TARGET_DIR, file);
    if (!fs.statSync(oldPath).isFile()) {
      return;
    }

    const ext = path.extname(file);
    const basename = path.basename(file, ext);

    const newBasename = toKebabCase(basename);
    const newFile = `${newBasename}${ext}`;
    const newPath = path.join(TARGET_DIR, newFile);

    if (file !== newFile) {
      console.log(`Renaming: ${file} -> ${newFile}`);
      fs.renameSync(oldPath, newPath);
    } else {
      console.log(`Skipping: ${file} (already kebab-case)`);
    }
  });
}

renameFiles();
