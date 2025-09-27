import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
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
