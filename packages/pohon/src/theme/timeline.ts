import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      item: '',
      container: '',
      indicator: '',
      separator: '',
      wrapper: '',
      date: '',
      title: '',
      description: '',
    },

    variants: {
      orientation: {
        horizontal: {
          root: '',
          item: '',
          separator: '',
        },
        vertical: {
          root: '',
          container: '',
          separator: '',
        },
      },

      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            indicator: '',
          },
        ])),
        neutral: {
          indicator: '',
        },
      },

      size: {
        '3xs': '',
        '2xs': '',
        'xs': '',
        'sm': '',
        'md': '',
        'lg': '',
        'xl': '',
        '2xl': '',
        '3xl': '',
      },

      reverse: {
        true: '',
      },
    },
  };
};
