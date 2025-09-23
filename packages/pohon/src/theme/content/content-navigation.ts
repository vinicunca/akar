import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
  slots: {
    root: '',
    content: '',
    list: '',
    item: '',
    listWithChildren: '',
    itemWithChildren: '',
    trigger: '',
    link: '',
    linkLeadingIcon: '',
    linkTrailing: '',
    linkTrailingBadge: '',
    linkTrailingBadgeSize: '',
    linkTrailingIcon: '',
    linkTitle: '',
    linkTitleExternalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [
        color,
        {
          trigger: '',
          link: '',
        },
      ])),
      neutral: {
        trigger: '',
        link: '',
      },
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      pill: '',
      link: '',
    },
    active: {
      true: {
        link: '',
      },
      false: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    disabled: {
      true: {
        trigger: '',
      },
    },
    highlight: {
      true: {},
    },
    level: {
      true: {
        item: '',
        itemWithChildren: '',
      },
    },
  },
});
