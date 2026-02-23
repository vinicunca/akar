import { presetVinicunca } from '@vinicunca/unocss-preset';

export const presetVinicuncaConfig = presetVinicunca({
  akar: true,

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

  wind4: {
    preflights: {
      theme: true,
    },
  },
});
