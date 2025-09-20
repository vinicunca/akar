import type { PohonModuleOptions } from '../module';

export function chipTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      base: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          '',
        ])),
        neutral: '',
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
      position: {
        'top-right': '',
        'bottom-right': '',
        'top-left': '',
        'bottom-left': '',
      },
      inset: {
        false: '',
      },
      standalone: {
        false: '',
      },
    },
  };
}

export type ChipTheme = ReturnType<typeof chipTheme>;
