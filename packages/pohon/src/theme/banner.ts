import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => ({
  slots: {
    root: '',
    container: '',
    left: '',
    center: '',
    right: '',
    icon: '',
    title: '',
    actions: '',
    close: '',
  },

  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [
        color,
        {
          root: '',
        },
      ])),
      neutral: {
        root: '',
      },
    },
    to: {
      true: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
  },
});
