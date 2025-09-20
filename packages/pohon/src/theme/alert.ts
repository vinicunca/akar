import type { PohonModuleOptions } from '../module';

export function alertTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      wrapper: '',
      title: '',
      description: '',
      icon: '',
      avatar: '',
      avatarSize: '',
      actions: '',
      close: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      variant: {
        solid: '',
        outline: '',
        soft: '',
        subtle: '',
      },
      orientation: {
        horizontal: {
          root: '',
          actions: '',
        },
        vertical: {
          root: '',
          actions: '',
        },
      },
      title: {
        true: {
          description: '',
        },
      },
    },
  };
}

export type AlertTheme = ReturnType<typeof alertTheme>;
