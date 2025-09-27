import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
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
      progress: '',
      close: '',
    },

    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            root: '',
            icon: '',
          },
        ])),
        neutral: {
          root: '',
          icon: '',
        },
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

    compoundVariants: [],

    defaultVariants: {
      color: 'primary',
    },
  };
};
