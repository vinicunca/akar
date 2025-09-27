import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
  base: '',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
