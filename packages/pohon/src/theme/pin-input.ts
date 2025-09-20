import type { PohonModuleOptions } from '../module';

export function pinInputTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      base: '',
    },
    variants: {
      size: {
        xs: {
          base: '',
        },
        sm: {
          base: '',
        },
        md: {
          base: '',
        },
        lg: {
          base: '',
        },
        xl: {
          base: '',
        },
      },
      variant: {
        outline: '',
        soft: '',
        subtle: '',
        ghost: '',
        none: '',
      },
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      highlight: {
        true: '',
      },
    },
  };
}

export type PinInputTheme = ReturnType<typeof pinInputTheme>;
