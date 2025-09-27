import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
  slots: {
    base: '',
    icon: '',
    externalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [
        color,
        {
          base: '',
          icon: '',
          externalIcon: '',
        },
      ])),
      neutral: {
        base: '',
        icon: '',
        externalIcon: '',
      },
    },
    to: {
      true: '',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
