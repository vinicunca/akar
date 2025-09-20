export const marqueeTheme = {
  slots: {
    root: '',
    content: '',
  },
  variants: {
    orientation: {
      horizontal: {
        content: '',
      },
      vertical: {
        content: '',
      },
    },
    pauseOnHover: {
      true: {
        content: '',
      },
    },
    reverse: {
      true: {
        content: '',
      },
    },
    overlay: {
      true: {
        root: '',
      },
    },
  },
};

export type MarqueeTheme = typeof marqueeTheme;
