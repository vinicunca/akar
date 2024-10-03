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
  },
});
