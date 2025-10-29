import { resolve } from 'node:path';
import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

import { BRANDS } from './app/themes/constant';

export default defineConfig({
  outputToCssLayers: true,

  content: {
    filesystem: [
      resolve('./content/**/*.{md,mdx}'),
    ],
  },

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
    'bg-background-accented',
    ...BRANDS.flatMap((color) => [
      // Borders
      `border-${color}`,
      `border-${color}/25`,
      `[&_code]:border-${color}/25`,
      `[&_a]:hover:[&>code]:border-${color}`,
      `[&_a]:hover:border-${color}`,

      // Texts
      `color-${color}`,
      `color-${color}/50`,
      `color-${color}/75`,
      `color-${color}-600`,
      `[&_a]:color-${color}`,
      `[&_code]:color-${color}-600`,
      `[&_a]:hover:[&>code]:color-${color}`,
      `data-[highlighted]:color-${color}`,
      `group-data-[highlighted]:color-${color}`,
      `group-data-[state=open]:color-${color}`,
      `hover:color-${color}/75`,
      `active:color-${color}/75`,
      `disabled:color-${color}`,
      `aria-disabled:color-${color}`,
      `[&>ul]:marker:color-${color}/50`,
      `data-[today]:not-[[data-selected]]:color-${color}`,
      `data-[selected]:color-${color}`,
      `dark:color-${color}-300`,
      `dark:[&_code]:color-${color}-300`,

      // Backgrounds
      `data-[highlighted]:before:bg-${color}/10`,
      `bg-${color}`,
      `bg-${color}/10`,
      `hover:bg-${color}/10`,
      `hover:bg-${color}/15`,
      `hover:bg-${color}/75`,
      `hover:bg-${color}/90`,
      `active:bg-${color}`,
      `active:bg-${color}/10`,
      `active:bg-${color}/15`,
      `active:bg-${color}/75`,
      `active:bg-${color}-200`,
      `active:bg-${color}-800`,
      `disabled:bg-${color}`,
      `disabled:bg-${color}/10`,
      `aria-disabled:bg-${color}`,
      `aria-disabled:bg-${color}/10`,
      `focus-visible:bg-${color}/10`,
      `focus-visible:bg-${color}/15`,
      `after:bg-${color}`,
      `before:bg-${color}/10`,
      `dark:active:bg-${color}-300`,
      `dark:active:bg-${color}-400`,
      `data-[selected]:bg-${color}`,
      `data-[selected]:bg-${color}/10`,
      `data-[highlighted]:bg-${color}/20`,
      `hover:not-[[data-selected]]:bg-${color}/10`,
      `hover:not-[[data-selected]]:bg-${color}/20`,
      `akar:data-[selected]:bg-${color}`,

      // Rings and outlines
      `ring-${color}`,
      `ring-${color}/25`,
      `ring-${color}/50`,
      `focus-visible:ring-${color}`,
      `akar:ring-${color}`,
      `focus-visible:before:ring-${color}`,
      `focus-visible:outline-${color}`,
      'focus:ring-2',
      'focus:ring-inset',
      `focus:ring-${color}`,
      `data-[selected]:ring-${color}/25`,
      `data-[selected]:ring-${color}/50`,
    ]),
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
