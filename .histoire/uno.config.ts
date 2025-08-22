import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetVinicunca({
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
      },

      theme: {
        extend: {
          keyframes: {
            'collapsible-down': {
              from: { height: 0 },
              to: { height: 'var(--akar-collapsible-content-height)' },
            },
            'collapsible-up': {
              from: { height: 'var(--akar-collapsible-content-height)' },
              to: { height: 0 },
            },
          },
          animation: {
            'collapsible-down': 'collapsible-down 0.2s ease-in-out',
            'collapsible-up': 'collapsible-up 0.2s ease-in-out',
          },
        },
      },
    }),
  ],

  // outputToCssLayers: true,

  theme: {
  },

  extendTheme: (theme) => {
    return {
      ...theme,
      font: {
        sans: `var(--font-geist-sans),${theme.font?.sans}`,
        mono: `var(--font-geist-mono),${theme.font?.mono}`,
      },
    };
  },
});
