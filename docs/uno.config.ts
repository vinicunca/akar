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
            'accordion-down': {
              from: { height: 0 },
              to: { height: 'var(--akar-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--akar-accordion-content-height)' },
              to: { height: 0 },
            },
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
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
          },
        },
      },

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
          'hr + *': {
            'margin-top': '0',
          },
          'h2 + *': {
            'margin-top': '0',
          },
          'h3 + *': {
            'margin-top': '0',
          },
          'h4 + *': {
            'margin-top': '0',
          },
          'strong': {
            'font-weight': '600',
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
      'background': 'hsl(var(--background))',
      'foreground': 'hsl(var(--foreground))',
      'muted': 'hsl(var(--muted))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      'card': 'hsl(var(--card))',
      'card-foreground': 'hsl(var(--card-foreground))',
      'primary': 'hsl(var(--primary))',
      'primary-foreground': 'hsl(var(--primary-foreground))',
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
    ...'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2 w-max'.split(' '),
    ...'[&_span]:focus:opacity-100 [&_span_>_span]:focus:outline'.split(' '),
    ...'absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex'.split(' '),
    ...'flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-primary text-green-400 shadow-sm  hover:text-green-700 hover:shadow dark:bg-primary/20 dark:text-primary/80 dark:shadow-none  dark:hover:bg-primary/40 dark:hover:text-primary'.split(' '),
  ],
});
