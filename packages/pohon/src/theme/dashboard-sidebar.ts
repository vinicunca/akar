export default {
  slots: {
    hiddenSide: '',
    root: '',
    header: '',
    body: '',
    footer: '',
    toggle: '',
    handle: '',
    content: '',
    overlay: '',
  },
  variants: {
    sidebarMixed: {
      true: {
        root: '',
      },
      false: {
        root: '',
      },
    },

    menu: {
      true: {
        header: '',
        body: '',
        footer: '',
      },
    },
    side: {
      left: {
        root: '',
      },
      right: {
        root: '',
      },
    },
    toggleSide: {
      left: {
        toggle: '',
      },
      right: {
        toggle: '',
      },
    },
  },
};
