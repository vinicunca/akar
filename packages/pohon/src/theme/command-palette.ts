export default {
  slots: {
    root: '',
    input: '',
    close: '',
    back: '',
    content: '',
    footer: '',
    viewport: '',
    group: '',
    empty: '',
    label: '',
    item: '',
    itemLeadingIcon: '',
    itemLeadingAvatar: '',
    itemLeadingAvatarSize: '',
    itemLeadingChip: '',
    itemLeadingChipSize: '',
    itemTrailing: '',
    itemTrailingIcon: '',
    itemTrailingHighlightedIcon: '',
    itemTrailingKbds: '',
    itemTrailingKbdsSize: '',
    itemWrapper: '',
    itemLabel: '',
    itemDescription: '',
    itemLabelBase: '',
    itemLabelPrefix: '',
    itemLabelSuffix: '',
  },
  variants: {
    virtualize: {
      true: {
        viewport: '',
      },
      false: {
        viewport: '',
      },
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
  },
};
