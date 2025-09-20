export const breadcrumbTheme = {
  slots: {
    root: '',
    list: '',
    item: '',
    link: '',
    linkLeadingIcon: '',
    linkLeadingAvatar: '',
    linkLeadingAvatarSize: '',
    linkLabel: '',
    separator: '',
    separatorIcon: '',
  },
  variants: {
    active: {
      true: {
        link: '',
      },
      false: {
        link: '',
      },
    },
    disabled: {
      true: {
        link: '',
      },
    },
    to: {
      true: '',
    },
  },
};

export type BreadcrumbTheme = typeof breadcrumbTheme;
