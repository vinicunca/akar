import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'unocss';
import {
  coreTheme,
  extendedColors,
  extractorBrandColors,
  preflightCssVariables,
  presetVinicuncaConfig,
} from './app/designs/unocss';

export default defineConfig({
  configDeps: getAllConfigFiles('./app/designs/unocss'),

  presets: [
    presetVinicuncaConfig,
  ],

  extractors: [
    extractorBrandColors,
  ],

  theme: coreTheme,

  extendTheme: extendedColors,

  layers: {
    pohon: 20,
  },

  outputToCssLayers: true,

  preflights: [
    preflightCssVariables,
  ],

  safelist: [
    'isolate',
  ],
});

function getAllConfigFiles(dir: string) {
  const dirFull = path.join(__dirname, dir);
  const files = fs.readdirSync(dirFull);
  return files.filter((file) => path.extname(file) === '.ts').map((file) => path.join(dir, file));
}
