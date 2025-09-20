import type { PohonModuleOptions } from '../module';

export function separatorTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      border: '',
      container: '',
      icon: '',
      avatar: '',
      avatarSize: '',
      label: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, { border: '' }])),
        neutral: { border: '' },
      },
      orientation: {
        horizontal: {
          root: '',
          border: '',
          container: '',
        },
        vertical: {
          root: '',
          border: '',
          container: '',
        },
      },
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      type: {
        solid: {
          border: '',
        },
        dashed: {
          border: '',
        },
        dotted: {
          border: '',
        },
      },
    },
  };
}

export type SeparatorTheme = ReturnType<typeof separatorTheme>;
