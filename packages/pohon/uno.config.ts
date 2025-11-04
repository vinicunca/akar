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

  theme: {
    font: {
      sans: 'Geist',
      mono: 'Geist Mono',
    },

    colors: {
      text: {
        dimmed: 'var(--pohon-text-dimmed)',
        muted: 'var(--pohon-text-muted)',
        toned: 'var(--pohon-text-toned)',
        DEFAULT: 'var(--pohon-text)',
        highlighted: 'var(--pohon-text-highlighted)',
        inverted: 'var(--pohon-text-inverted)',
      },
      background: {
        DEFAULT: 'var(--pohon-bg)',
        muted: 'var(--pohon-bg-muted)',
        elevated: 'var(--pohon-bg-elevated)',
        accented: 'var(--pohon-bg-accented)',
        inverted: 'var(--pohon-bg-inverted)',
        border: 'var(--pohon-border)',
      },
      border: {
        DEFAULT: 'var(--pohon-border)',
        muted: 'var(--pohon-border-muted)',
        accented: 'var(--pohon-border-accented)',
        inverted: 'var(--pohon-border-inverted)',
        bg: 'var(--pohon-bg)',
      },
      ring: {
        DEFAULT: 'var(--pohon-border)',
        muted: 'var(--pohon-border-muted)',
        accented: 'var(--pohon-border-accented)',
        inverted: 'var(--pohon-border-inverted)',
        bg: 'var(--pohon-bg)',
        offset: {
          DEFAULT: 'var(--pohon-border)',
          muted: 'var(--pohon-border-muted)',
          accented: 'var(--pohon-border-accented)',
          inverted: 'var(--pohon-border-inverted)',
          bg: 'var(--pohon-bg)',
        },
      },
      divide: {
        DEFAULT: 'var(--pohon-border)',
        muted: 'var(--pohon-border-muted)',
        accented: 'var(--pohon-border-accented)',
        inverted: 'var(--pohon-border-inverted)',
      },
      outline: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      stroke: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
      fill: {
        DEFAULT: 'var(--pohon-border)',
        inverted: 'var(--pohon-border-inverted)',
      },
    },

    container: {
      '8xl': '90rem',
    },

    radius: {
      'xs': 'calc(var(--pohon-ui-radius) * 0.5)',
      'sm': 'var(--pohon-ui-radius)',
      'md': 'calc(var(--pohon-ui-radius) * 1.5)',
      'lg': 'calc(var(--pohon-ui-radius) * 2)',
      'xl': 'calc(var(--pohon-ui-radius) * 3)',
      '2xl': 'calc(var(--pohon-ui-radius) * 4)',
      '3xl': 'calc(var(--pohon-ui-radius) * 6)',
    },
  },
});
