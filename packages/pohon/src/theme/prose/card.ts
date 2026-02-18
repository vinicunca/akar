import type { PohonModuleOptions } from '../../module';

export default (options: Required<PohonModuleOptions>) => ({
  slots: {
    base: '',
    icon: '',
    title: '',
    description: '',
    externalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [
        color,
        {
          icon: '',
        },
      ])),
      neutral: {
        icon: '',
      },
    },
    to: {
      true: '',
    },
    title: {
      true: {
        description: '',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});
