import type { NuxtOptions } from '@nuxt/schema';

export default (options: Required<NuxtOptions['pohon']>) => ({
  slots: {
    root: '',
    list: '',
    label: '',
    item: '',
    link: '',
    linkLeadingIcon: '',
    linkLeadingAvatar: '',
    linkLeadingAvatarSize: '',
    linkTrailing: '',
    linkTrailingBadge: '',
    linkTrailingBadgeSize: '',
    linkTrailingIcon: '',
    linkTitle: '',
    linkTitleExternalIcon: '',
    content: '',
    listWithChildren: '',
    itemWithChildren: '',
    trigger: '',
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
    childActive: {
      true: '',
    },
    collapsed: {
      true: {
        item: '',
        link: '',
      },
    },
    highlight: {
      true: '',
    },
    level: {
      true: {
        item: '',
        itemWithChildren: '',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    variant: 'pill',
  },
});
