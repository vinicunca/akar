export default {
  slots: {
    root: '',
    container: '',
    leading: '',
    leadingIcon: '',
    leadingAvatar: '',
    leadingAvatarSize: '',
    files: '',
    content: '',
    actions: '',
  },
  variants: {
    variant: {
      solid: {
        content: '',
      },
      outline: {
        content: '',
      },
      soft: {
        content: '',
      },
      subtle: {
        content: '',
      },
      naked: {
        content: '',
      },
    },
    side: {
      left: {},
      right: {
        container: '',
        files: '',
      },
    },
    leading: {
      true: '',
    },
    actions: {
      true: '',
    },
    compact: {
      true: {
        root: '',
        container: '',
        content: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      false: {
        root: '',
        container: '',
        content: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    variant: 'naked',
  },
};
