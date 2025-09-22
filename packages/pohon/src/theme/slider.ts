import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      track: '',
      range: '',
      thumb: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, {
          range: '',
          thumb: '',
        }])),
        neutral: {
          range: '',
          thumb: '',
        },
      },
      size: {
        xs: {
          thumb: '',
        },
        sm: {
          thumb: '',
        },
        md: {
          thumb: '',
        },
        lg: {
          thumb: '',
        },
        xl: {
          thumb: '',
        },
      },
      orientation: {
        horizontal: {
          root: '',
          range: '',
        },
        vertical: {
          root: '',
          range: '',
        },
      },
      disabled: {
        true: {
          root: '',
        },
      },
    },
  };
};
