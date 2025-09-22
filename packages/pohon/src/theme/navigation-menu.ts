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
      viewportWrapper: '',
      viewport: '',
      content: '',
      indicator: '',
      arrow: '',
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
      orientation: {
        horizontal: {
          root: '',
          list: '',
          item: '',
          link: '',
          childList: '',
          childLink: '',
          childLinkLabel: '',
          content: '',
        },
        vertical: {
          root: '',
          link: '',
          childLabel: '',
          childLink: '',
        },
      },
      contentOrientation: {
        horizontal: {
          viewportWrapper: '',
          content: '',
        },
        vertical: {
          viewport: '',
        },
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
  };
};
