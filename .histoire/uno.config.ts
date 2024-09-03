import presetUno from '@unocss/preset-uno';
import { presetVinicunca } from '@vinicunca/unocss-preset-vinicunca';
import { defineConfig } from 'unocss';

export default defineConfig({
  content: {
    filesystem: [
      '../packages/akar/src/**/*.vue',
    ],
  },
  presets: [
    presetUno(),
    presetVinicunca(),
  ],
});
