import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import { theme } from 'unocss/preset-wind4';

import { BRANDS } from './app/themes/constant';

export default defineConfig({
  outputToCssLayers: true,

  presets: [
    presetVinicunca({
      akar: true,
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
    'bg-background-accented',
    ...BRANDS.flatMap((color) => [
      `border-${color}`,
      `border-${color}/25`,
      `bg-${color}/10`,
      `color-${color}`,
      `color-${color}/50`,
      `dark:color-${color}-300`,
      `dark:[&_code]:color-${color}-300`,
      `color-${color}-600`,
      `[&_code]:color-${color}-600`,
    ]),
  ],

  preflights: [
    {
      getCSS: () => {
        const slateColors = theme.colors.slate;
        return `
          :root {
            --pohon-text-dimmed: ${slateColors[400]};
            --pohon-text-muted: ${slateColors[500]};
            --pohon-text-toned: ${slateColors[600]};
            --pohon-text: ${slateColors[700]};
            --pohon-text-highlighted: ${slateColors[900]};
            --pohon-text-inverted: ${slateColors[100]};

            --pohon-bg: ${slateColors[100]};
            --pohon-bg-muted: ${slateColors[50]};
            --pohon-bg-elevated: ${slateColors[100]};
            --pohon-bg-accented: ${slateColors[200]};
            --pohon-bg-inverted: ${slateColors[900]};

            --pohon-border: ${slateColors[200]};
            --pohon-border-muted: ${slateColors[200]};
            --pohon-border-accented: ${slateColors[300]};
            --pohon-border-inverted: ${slateColors[900]};
          }

          .dark {
            --pohon-text-dimmed: ${slateColors[500]};
            --pohon-text-muted: ${slateColors[400]};
            --pohon-text-toned: ${slateColors[300]};
            --pohon-text: ${slateColors[200]};
            --pohon-text-highlighted: ${slateColors[100]};
            --pohon-text-inverted: ${slateColors[900]};

            --pohon-bg: hsl(285 37% 5%);
            --pohon-bg-muted: ${slateColors[800]};
            --pohon-bg-elevated: ${slateColors[800]};
            --pohon-bg-accented: ${slateColors[700]};
            --pohon-bg-inverted: ${slateColors[100]};

            --pohon-border: ${slateColors[800]};
            --pohon-border-muted: ${slateColors[700]};
            --pohon-border-accented: ${slateColors[700]};
            --pohon-border-inverted: ${slateColors[100]};
          }
        `;
      },
    },
  ],

  theme: {
    colors: {
      card: 'hsl(var(--pohon-card))',
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
  },

  extendTheme: (theme) => {
    return {
      ...theme,
      font: {
        sans: `'Geist', ${theme.font?.sans}`,
        mono: `'Geist Mono', ${theme.font?.mono}`,
      },
    };
  },
});
