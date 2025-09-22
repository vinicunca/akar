import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';
import { theme } from 'unocss/preset-wind4';

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

      akar: true,

      typography: {
        cssExtend: {
          'h1': {
            'font-weight': 800,
            'font-size': '2.25em',
            'line-height': 1.1111111,
            'margin-top': 0,
          },
          'h2': {
            'font-weight': 700,
            'font-size': '1.5em',
            'margin-top': '2em',
            'line-height': 1.3333333,
          },
          'h3': {
            'font-weight': 600,
            'font-size': '1.25em',
            'line-height': 1.6,
          },
          'p': {
            margin: '1.25em 0',
          },
          'a': {
            'text-decoration': 'none',
            'font-weight': 600,
            'border-bottom': '1px solid var(--colors-primary-DEFAULT)',
          },
          'a:hover': {
            'border-bottom-width': '2px',
          },
          'code': {
            'border': '1px solid hsl(var(--border))',
            'border-radius': '0.375rem',
            'padding': '0.25rem',
          },
          'code::before': {
            content: 'normal',
          },
          'code::after': {
            content: 'normal',
          },
          'p,ul,ol,pre': {
            'line-height': 'inherit',
          },
          'pre code': {
            'padding': '0',
            'border-width': '0',
          },
          'kbd': {
            'box-shadow': '0 0 0 1px --un-prose-kbd-shadows, 0 3px 0 --un-prose-kbd-shadows',
          },
        },
      },
    }),
  ],

  preflights: [
    {
      getCSS: () => {
        const slateColors = theme.colors.slate;
        return `
          :root {
            --akar-text-dimmed: ${slateColors[400]};
            --akar-text-muted: ${slateColors[500]};
            --akar-text-toned: ${slateColors[600]};
            --akar-text: ${slateColors[700]};
            --akar-text-highlighted: ${slateColors[900]};
            --akar-text-inverted: ${slateColors[100]};

            --akar-bg: ${slateColors[100]};
            --akar-bg-muted: ${slateColors[50]};
            --akar-bg-elevated: ${slateColors[100]};
            --akar-bg-accented: ${slateColors[200]};
            --akar-bg-inverted: ${slateColors[900]};

            --akar-border: ${slateColors[200]};
            --akar-border-muted: ${slateColors[200]};
            --akar-border-accented: ${slateColors[300]};
            --akar-border-inverted: ${slateColors[900]};
          }

          .dark {
            --akar-text-dimmed: ${slateColors[500]};
            --akar-text-muted: ${slateColors[400]};
            --akar-text-toned: ${slateColors[300]};
            --akar-text: ${slateColors[200]};
            --akar-text-highlighted: ${slateColors[100]};
            --akar-text-inverted: ${slateColors[900]};

            --akar-bg: ${slateColors[900]};
            --akar-bg-muted: ${slateColors[800]};
            --akar-bg-elevated: ${slateColors[800]};
            --akar-bg-accented: ${slateColors[700]};
            --akar-bg-inverted: ${slateColors[100]};

            --akar-border: ${slateColors[800]};
            --akar-border-muted: ${slateColors[700]};
            --akar-border-accented: ${slateColors[700]};
            --akar-border-inverted: ${slateColors[100]};
          }
        `;
      },
    },
  ],

  outputToCssLayers: true,

  theme: {
    shadow: {
      base: '0 2px 10px',
      focus: '0 0 0 2px',
    },
    colors: {
      'akar': {
        text: {
          dimmed: 'var(--akar-text-dimmed)',
          muted: 'var(--akar-text-muted)',
          toned: 'var(--akar-text-toned)',
          DEFAULT: 'var(--akar-text)',
          highlighted: 'var(--akar-text-highlighted)',
          inverted: 'var(--akar-text-inverted)',
        },
        background: {
          DEFAULT: 'var(--akar-bg)',
          muted: 'var(--akar-bg-muted)',
          elevated: 'var(--akar-bg-elevated)',
          accented: 'var(--akar-bg-accented)',
          inverted: 'var(--akar-bg-inverted)',
          border: 'var(--akar-border)',
        },
        border: {
          DEFAULT: 'var(--akar-border)',
          muted: 'var(--akar-border-muted)',
          accented: 'var(--akar-border-accented)',
          inverted: 'var(--akar-border-inverted)',
          bg: 'var(--akar-bg)',
        },
        ring: {
          DEFAULT: 'var(--akar-border)',
          muted: 'var(--akar-border-muted)',
          accented: 'var(--akar-border-accented)',
          inverted: 'var(--akar-border-inverted)',
          bg: 'var(--akar-bg)',
          offset: {
            DEFAULT: 'var(--akar-border)',
            muted: 'var(--akar-border-muted)',
            accented: 'var(--akar-border-accented)',
            inverted: 'var(--akar-border-inverted)',
            bg: 'var(--akar-bg)',
          },
        },
        divide: {
          DEFAULT: 'var(--akar-border)',
          muted: 'var(--akar-border-muted)',
          accented: 'var(--akar-border-accented)',
          inverted: 'var(--akar-border-inverted)',
        },
        outline: {
          DEFAULT: 'var(--akar-border)',
          inverted: 'var(--akar-border-inverted)',
        },
        stroke: {
          DEFAULT: 'var(--akar-border)',
          inverted: 'var(--akar-border-inverted)',
        },
        fill: {
          DEFAULT: 'var(--akar-border)',
          inverted: 'var(--akar-border-inverted)',
        },
      },

      'background': 'hsl(var(--background))',
      'foreground': 'hsl(var(--foreground))',
      'muted': 'hsl(var(--muted))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      'card': 'hsl(var(--card))',
      'card-foreground': 'hsl(var(--card-foreground))',
      'border': 'hsl(var(--border))',
      'input': 'hsl(var(--input))',
      'ring': 'hsl(var(--ring))',
      'code': 'hsl(var(--code))',
    },
  },

  extendTheme: (theme) => {
    return {
      ...theme,
      font: {
        sans: `Geist,${theme.font?.sans}`,
        mono: `GeistMono,${theme.font?.mono}`,
      },
    };
  },

  safelist: [
    'transition-colors-280',
    ...'border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max'.split(' '),
    ...'[&_span]:focus:opacity-100 [&_span_>_span]:focus:outline'.split(' '),
    ...'absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex'.split(' '),
    ...'flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-primary color-primary-400 shadow-sm  hover:color-primary-700 hover:shadow dark:bg-primary/20 dark:color-primary/80 dark:shadow-none  dark:hover:bg-primary/40 dark:hover:color-primary'.split(' '),
  ],
});
