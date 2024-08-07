import presetUno from '@unocss/preset-uno';
import { defineConfig } from 'unocss';

export default defineConfig({
  content: {
    filesystem: [
      'packages/akar/src/**/*.vue',
    ],
  },
  presets: [
    presetUno(),
  ],
});
