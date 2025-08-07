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
            'slide-up-and-fade': {
              from: { opacity: 0, transform: 'translateY(2px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          },
          animation: {
            'slide-up-and-fade': 'slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          },
        },
      },
    }),
  ],

  outputToCssLayers: true,

  theme: {
    colors: {
      'background': 'hsl(var(--background))',
      'foreground': 'hsl(var(--foreground))',
      'muted': 'hsl(var(--muted))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      'card': 'hsl(var(--card))',
      'card-foreground': 'hsl(var(--card-foreground))',
      'primary': 'hsl(var(--primary))',
      'primary-foreground': 'hsl(var(--primary-foreground))',
    },
  },
});
