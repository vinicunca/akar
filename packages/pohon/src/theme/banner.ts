import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
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
});
