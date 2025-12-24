export default {
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
    itemWrapper: '',
    itemLabel: '',
    itemDescription: '',
    itemLabelExternalIcon: '',
  },
  variants: {
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
  },
};
