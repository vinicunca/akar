import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
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
      linkLabel: '',
      linkLabelExternalIcon: '',
      childList: '',
      childLabel: '',
      childItem: '',
      childLink: '',
      childLinkWrapper: '',
      childLinkIcon: '',
      childLinkLabel: '',
      childLinkLabelExternalIcon: '',
      childLinkDescription: '',
      separator: '',
      content: '',
    },

    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            link: '',
            childLink: '',
          },
        ])),
        neutral: {
          link: '',
          childLink: '',
        },
      },
      highlightColor: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      variant: {
        pill: '',
        link: '',
      },
      active: {
        true: {
          childLink: '',
          childLinkIcon: '',
        },
        false: {
          link: '',
          linkLeadingIcon: '',
          childLink: '',
          childLinkIcon: '',
        },
      },
      disabled: {
        true: {
          link: '',
        },
      },
      highlight: {
        true: '',
      },
      level: {
        true: '',
      },
      collapsed: {
        true: '',
      },
    },

    compoundVariants: [],

    defaultVariants: {
      color: 'primary',
      highlightColor: 'primary',
      variant: 'pill',
    },
  };
};
