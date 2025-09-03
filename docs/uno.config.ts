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

      akar: true,

      typography: {
        cssExtend: {
          'a': {
            'text-decoration': 'none',
            'font-weight': 600,
            'border-bottom': '1px solid hsl(var(--primary))',
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
        },
      },
    }),
  ],

  outputToCssLayers: true,

  theme: {
    shadow: {
      base: '0 2px 10px',
      focus: '0 0 0 2px',
    },
    colors: {
      // 'text': {
      //   dimmed: 'var(--akar-text-dimmed)',
      //   muted: 'var(--akar-text-muted)',
      //   toned: 'var(--akar-text-toned)',
      //   DEFAULT: 'var(--akar-text)',
      //   highlighted: 'var(--akar-text-highlighted)',
      //   inverted: 'var(--akar-text-inverted)',
      // },
      // 'background': {
      //   DEFAULT: 'var(--akar-bg)',
      //   muted: 'var(--akar-bg-muted)',
      //   elevated: 'var(--akar-bg-elevated)',
      //   accented: 'var(--akar-bg-accented)',
      //   inverted: 'var(--akar-bg-inverted)',
      //   border: 'var(--akar-border)',
      // },
      // 'border': {
      //   DEFAULT: 'var(--akar-border)',
      //   muted: 'var(--akar-border-muted)',
      //   accented: 'var(--akar-border-accented)',
      //   inverted: 'var(--akar-border-inverted)',
      //   bg: 'var(--akar-bg)',
      // },
      // 'ring': {
      //   DEFAULT: 'var(--akar-ring)',
      //   muted: 'var(--akar-ring-muted)',
      //   accented: 'var(--akar-ring-accented)',
      //   inverted: 'var(--akar-ring-inverted)',
      //   bg: 'var(--akar-bg)',
      //   offset: {
      //     DEFAULT: 'var(--akar-ring-offset)',
      //     muted: 'var(--akar-ring-offset-muted)',
      //     accented: 'var(--akar-ring-offset-accented)',
      //     inverted: 'var(--akar-ring-offset-inverted)',
      //     bg: 'var(--akar-bg)',
      //   },
      // },
      // 'divide': {
      //   DEFAULT: 'var(--akar-divide)',
      //   muted: 'var(--akar-divide-muted)',
      //   accented: 'var(--akar-divide-accented)',
      //   inverted: 'var(--akar-divide-inverted)',
      // },
      // 'outline': {
      //   DEFAULT: 'var(--akar-border)',
      //   inverted: 'var(--akar-border-inverted)',
      // },
      // 'stroke': {
      //   DEFAULT: 'var(--akar-border)',
      // },
      // 'fill': {
      //   DEFAULT: 'var(--akar-border)',
      //   inverted: 'var(--akar-border-inverted)',
      // },

      'background': 'hsl(var(--background))',
      'foreground': 'hsl(var(--foreground))',
      'muted': 'hsl(var(--muted))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      'card': 'hsl(var(--card))',
      'card-foreground': 'hsl(var(--card-foreground))',
      'docs-primary': 'hsl(var(--primary))',
      'docs-primary-foreground': 'hsl(var(--primary-foreground))',
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
    'color-slate-200 color-slate-800',
    ...'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max'.split(' '),
    ...'[&_span]:focus:opacity-100 [&_span_>_span]:focus:outline'.split(' '),
    ...'absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex'.split(' '),
    ...'flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-docs-primary color-green-400 shadow-sm  hover:color-green-700 hover:shadow dark:bg-docs-primary/20 dark:color-docs-primary/80 dark:shadow-none  dark:hover:bg-docs-primary/40 dark:hover:color-docs-primary'.split(' '),
  ],
});
