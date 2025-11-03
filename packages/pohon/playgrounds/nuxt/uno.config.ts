import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import { BRANDS } from './app/themes/constant';

const COLOR_PATTERN = /([^\s`]*\$\{color\}[^\s`]*)/g;

export default defineConfig({
  outputToCssLayers: true,

  extractors: [
    {
      name: 'pohon-colors-extractor',
      extract({ code }) {
        const matches = code.match(COLOR_PATTERN);

        if (matches !== null) {
          return matches.flatMap((match) => {
            // eslint-disable-next-line no-template-curly-in-string
            return BRANDS.map((brand) => match.replace('${color}', brand));
          });
        }
      },
    },
  ],

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
            --pohon-text-inverted: var(--colors-white);

            --pohon-bg: var(--colors-white);
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
            --pohon-text-highlighted: var(--colors-white);
            --pohon-text-inverted: var(--akar-neutral-900);

            --pohon-bg: var(--akar-neutral-900);
            --pohon-bg-muted: var(--akar-neutral-800);
            --pohon-bg-elevated: var(--akar-neutral-800);
            --pohon-bg-accented: var(--akar-neutral-700);
            --pohon-bg-inverted: var(--colors-white);

            --pohon-border: var(--akar-neutral-800);
            --pohon-border-muted: var(--akar-neutral-700);
            --pohon-border-accented: var(--akar-neutral-700);
            --pohon-border-inverted: var(--colors-white);
          }
        `;
      },
    },
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
  },
});
