export const slideoverTheme = {
  slots: {
    overlay: '',
    content: '',
    header: '',
    wrapper: '',
    body: '',
    footer: '',
    title: '',
    description: '',
    close: '',
  },
  variants: {
    side: {
      top: {
        content: '',
      },
      right: {
        content: '',
      },
      bottom: {
        content: '',
      },
      left: {
        content: '',
      },
    },
    transition: {
      true: {
        overlay: '',
      },
    },
  },
};

export type SlideoverTheme = typeof slideoverTheme;
