import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import { theme } from 'unocss/preset-wind4';
import { BRANDS } from './app/themes/constant';

const COLOR_PATTERN = /([^\s`]*\$\{color\}[^\s`]*)/g;

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['**/node_modules/**'],
    },
  },

  extractors: [
    {
      extract({ code }) {
        const matches = code.match(COLOR_PATTERN);

        if (matches !== null) {
          return matches.flatMap((match) => {
            // eslint-disable-next-line no-template-curly-in-string
            return BRANDS.map((brand) => match.replace('${color}', brand));
          });
        }
      },
      name: 'pohon-colors-extractor',
    },
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
  },

  outputToCssLayers: true,

  preflights: [
    {
      getCSS: () => {
        return `
          :root {
            --pohon-text-dimmed: var(--akar-neutral-400);
            --pohon-text-muted: var(--akar-neutral-500);
            --pohon-text-toned: var(--akar-neutral-600);
            --pohon-text: var(--akar-neutral-700);
            --pohon-text-highlighted: var(--akar-neutral-900);
            --pohon-text-inverted: ${theme.colors.white};

            --pohon-bg: ${theme.colors.white};
            --pohon-bg-muted: var(--akar-neutral-50);
            --pohon-bg-elevated: var(--akar-neutral-100);
            --pohon-bg-accented: var(--akar-neutral-200);
            --pohon-bg-inverted: var(--akar-neutral-900);

            --pohon-border: var(--akar-neutral-200);
            --pohon-border-muted: var(--akar-neutral-200);
            --pohon-border-accented: var(--akar-neutral-300);
            --pohon-border-inverted: var(--akar-neutral-900);
          }

          .dark {
            --pohon-text-dimmed: var(--akar-neutral-500);
            --pohon-text-muted: var(--akar-neutral-400);
            --pohon-text-toned: var(--akar-neutral-300);
            --pohon-text: var(--akar-neutral-200);
            --pohon-text-highlighted: ${theme.colors.white};
            --pohon-text-inverted: var(--akar-neutral-900);

            --pohon-bg: var(--akar-neutral-900);
            --pohon-bg-muted: var(--akar-neutral-800);
            --pohon-bg-elevated: var(--akar-neutral-800);
            --pohon-bg-accented: var(--akar-neutral-700);
            --pohon-bg-inverted: ${theme.colors.white};

            --pohon-border: var(--akar-neutral-800);
            --pohon-border-muted: var(--akar-neutral-700);
            --pohon-border-accented: var(--akar-neutral-700);
            --pohon-border-inverted: ${theme.colors.white};
          }
        `;
      },
      layer: 'theme',
    },
  ],

  presets: [
    presetVinicunca({
      akar: {
        enableDynamicBrands: true,
      },

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

      wind4: {
        preflights: {
          theme: true,
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
