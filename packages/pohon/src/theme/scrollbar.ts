export default {
  slots: {
    root: '',
    shadowTop: '',
    shadowBottom: '',
  },

  variants: {
    shadowTopBorder: {
      true: {
        shadowTop: '',
      },
    },
    shadowBottomBorder: {
      true: {
        shadowBottom: '',
      },
    },
    shadowTopScrolling: {
      true: {
        shadowTop: '',
      },
    },
    shadowBottomScrolling: {
      true: {
        shadowBottom: '',
      },
    },
  },
};
