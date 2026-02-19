import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import {
  extractorBrandColors,
  preflightCssVariables,
} from './app/designs/unocss';

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['**/node_modules/**'],
    },
  },

  extractors: [
    extractorBrandColors,
  ],

  layers: {
    pohon: 20,
  },

  theme: {
    colors: {
      background: {
        accented: 'var(--pohon-bg-accented)',
        border: 'var(--pohon-border)',
        DEFAULT: 'var(--pohon-bg)',
        elevated: 'var(--pohon-bg-elevated)',
        inverted: 'var(--pohon-bg-inverted)',
        muted: 'var(--pohon-bg-muted)',
      },
      border: {
        accented: 'var(--pohon-border-accented)',
        bg: 'var(--pohon-bg)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
      },
      divide: {
        accented: 'var(--pohon-border-accented)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
      },
      fill: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      outline: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      ring: {
        accented: 'var(--pohon-border-accented)',
        bg: 'var(--pohon-bg)',
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
        muted: 'var(--pohon-border-muted)',
        offset: {
          accented: 'var(--pohon-border-accented)',
          bg: 'var(--pohon-bg)',
          DEFAULT: 'var(--pohon-border)',
          inverted: 'var(--pohon-border-inverted)',
          muted: 'var(--pohon-border-muted)',
        },
      },
      stroke: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      text: {
        DEFAULT: 'var(--pohon-text)',
        dimmed: 'var(--pohon-text-dimmed)',
        highlighted: 'var(--pohon-text-highlighted)',
        inverted: 'var(--pohon-text-inverted)',
        muted: 'var(--pohon-text-muted)',
        toned: 'var(--pohon-text-toned)',
      },
    },

    container: {
      '8xl': '90rem',
    },

    font: {
      sans: 'Inter',
    },
  },

  outputToCssLayers: true,

  preflights: [
    preflightCssVariables,
  ],

  presets: [
    presetVinicunca({
      fluid: {
        ranges: {
          '2xl': [30, 70],
          '3xl': [35, 80],
          '4xl': [40, 90],
          'lg': [20, 50],
          'md': [15, 40],
          'sm': [10, 30],
          'xl': [25, 60],
          'xs': [5, 15],
        },
      },

      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
      },

      typography: {
        cssExtend: {
          kbd: {
            'font-weight': 500,
          },
        },
      },
    }),
  ],

  safelist: [
    'isolate',
  ],
});
