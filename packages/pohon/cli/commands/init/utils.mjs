import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { consola } from 'consola';
import { dirname, join } from 'pathe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Copy layer files from the package to the user's project
 */
export async function copyLayerFiles(targetDir, force = false) {
  // Get the path to the layer directory in the package
  const layerPath = join(__dirname, '..', '..', '..', 'layer');
  const targetPath = join(targetDir, 'layers', 'pohon-ui');

  // Ensure target directory exists
  await fs.mkdir(targetPath, { recursive: true });

  // Copy app.config.ts
  // const appConfigSource = join(layerPath, 'app.config.ts');
  // const appConfigTarget = join(targetPath, 'app.config.ts');

  // await copyFile(appConfigSource, appConfigTarget, force);
  // consola.success('Copied app.config.ts');

  // // Copy themes directory
  // const themesSource = join(layerPath, 'themes');
  // const themesTarget = join(targetPath, 'themes');

  await copyDirectory(layerPath, targetPath, force);
  consola.success('Copied themes directory');
}

/**
 * Copy a single file
 */
async function copyFile(source, target, force = false) {
  try {
    if (!force) {
      await fs.access(target);
      // File exists, skip if not force
      return;
    }
  } catch {
    // File doesn't exist, proceed
  }

  await fs.copyFile(source, target);
}

/**
 * Recursively copy a directory
 */
async function copyDirectory(source, target, force = false) {
  await fs.mkdir(target, { recursive: true });

  const entries = await fs.readdir(source, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath, force);
    } else {
      await copyFile(sourcePath, targetPath, force);
    }
  }));
}
