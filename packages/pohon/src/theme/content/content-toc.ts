import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
  slots: {
    root: '',
    container: '',
    top: '',
    bottom: '',
    trigger: '',
    title: '',
    trailing: '',
    trailingIcon: '',
    content: '',
    list: '',
    listWithChildren: '',
    item: '',
    itemWithChildren: '',
    link: '',
    linkText: '',
    indicator: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [
        color,
        {
          indicator: '',
        },
      ])),
      neutral: {
        indicator: '',
      },
    },
    active: {
      false: {
        link: '',
      },
    },
    highlight: {
      true: {
        list: '',
        item: '',
      },
    },
    body: {
      true: {
        bottom: '',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
  },
});
