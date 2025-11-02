/**
 * This file is for placeholder purposes only,
 * so we can utilize the unocss plugin in vscode.
 */
import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetVinicunca({
      akar: {
        enableDynamicBrands: true,
      },
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
      },
    }),
  ],
});
