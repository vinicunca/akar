import { blackA, grass, green, indigo, mauve, purple, red, slate, teal, violet } from '@radix-ui/colors';
import { presetVinicunca } from '@vinicunca/unocss-preset-vinicunca';
import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  content: {
    filesystem: [
      '../packages/akar/src/**/*.vue',
    ],
  },
  presets: [
    presetUno(),
    presetVinicunca({
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        scale: 1.25,
        warn: true,
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  theme: {
    colors: {
      ...blackA,
      ...mauve,
      ...violet,
      ...green,
      ...grass,
      ...red,
      ...indigo,
      ...purple,
      ...teal,
      ...slate,
    },

    animation: {
      keyframes: {
        'accordion-down': '{from{height:0}to{height:var(--akar-accordion-content-height)}}',
        'accordion-up': '{from{height:var(--akar-accordion-content-height)}to{height:0}}',
      },
      durations: {
        'accordion-down': '0.3s',
        'accordion-up': '0.3s',
      },
      timingFns: {
        'accordion-down': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'accordion-up': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
});
