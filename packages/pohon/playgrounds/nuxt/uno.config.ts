import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

import { BRANDS } from './app/themes/constant';

export default defineConfig({
  outputToCssLayers: true,

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

      wind4: {
        preflights: {
          theme: true,
        },
      },
    }),
  ],

  safelist: [
    'isolate',

    ...BRANDS.flatMap((color) => [
      `color-${color}`,
      `color-${color}/75`,
      `before:bg-${color}/10`,
      `data-[highlighted]:color-${color}`,
      `group-data-[highlighted]:color-${color}`,
      `group-data-[state=open]:color-${color}`,
      `hover:color-${color}/75`,
      `active:color-${color}/75`,
      `disabled:color-${color}`,
      `aria-disabled:color-${color}`,

      `data-[highlighted]:before:bg-${color}/10`,
      `bg-${color}`,
      `bg-${color}/10`,
      `hover:bg-${color}/10`,
      `hover:bg-${color}/15`,
      `hover:bg-${color}/75`,
      `active:bg-${color}/10`,
      `active:bg-${color}/15`,
      `active:bg-${color}/75`,
      `active:bg-${color}-800`,
      `disabled:bg-${color}`,
      `disabled:bg-${color}/10`,
      `aria-disabled:bg-${color}`,
      `aria-disabled:bg-${color}/10`,
      `focus-visible:bg-${color}/10`,
      `focus-visible:bg-${color}/15`,
      `after:bg-${color}`,

      `ring-${color}/25`,
      `ring-${color}/50`,
      `focus-visible:ring-${color}`,

      `focus-visible:before:ring-${color}`,

      `focus-visible:outline-${color}`,
    ]),
  ],
});
