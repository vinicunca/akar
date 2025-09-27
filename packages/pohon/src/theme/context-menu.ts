import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      content: '',
      viewport: '',
      group: '',
      label: '',
      separator: '',
      item: '',
      itemLeadingIcon: '',
      itemLeadingAvatar: '',
      itemLeadingAvatarSize: '',
      itemTrailing: '',
      itemTrailingIcon: '',
      itemTrailingKbds: '',
      itemTrailingKbdsSize: '',
      itemLabel: '',
      itemLabelExternalIcon: '',
    },

    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      active: {
        true: {
          item: '',
          itemLeadingIcon: '',
        },
        false: {
          item: '',
          itemLeadingIcon: '',
        },
      },
      loading: {
        true: {
          itemLeadingIcon: '',
        },
      },
      size: {
        xs: {
          label: '',
          item: '',
          itemLeadingIcon: '',
          itemLeadingAvatarSize: '',
          itemTrailingIcon: '',
          itemTrailingKbds: '',
          itemTrailingKbdsSize: '',
        },
        sm: {
          label: '',
          item: '',
          itemLeadingIcon: '',
          itemLeadingAvatarSize: '',
          itemTrailingIcon: '',
          itemTrailingKbds: '',
          itemTrailingKbdsSize: '',
        },
        md: {
          label: '',
          item: '',
          itemLeadingIcon: '',
          itemLeadingAvatarSize: '',
          itemTrailingIcon: '',
          itemTrailingKbds: '',
          itemTrailingKbdsSize: '',
        },
        lg: {
          label: '',
          item: '',
          itemLeadingIcon: '',
          itemLeadingAvatarSize: '',
          itemTrailingIcon: '',
          itemTrailingKbds: '',
          itemTrailingKbdsSize: '',
        },
        xl: {
          label: '',
          item: '',
          itemLeadingIcon: '',
          itemLeadingAvatarSize: '',
          itemTrailingIcon: '',
          itemTrailingKbds: '',
          itemTrailingKbdsSize: '',
        },
      },
    },

    defaultVariants: {
      size: 'md',
    },
  };
};
