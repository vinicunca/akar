export const fieldGroupVariant = {
  fieldGroup: {
    horizontal: '',
    vertical: '',
  },
};

export const fieldGroupVariantWithRoot = {
  fieldGroup: {
    horizontal: {
      root: '',
      base: '',
    },
    vertical: {
      root: '',
      base: '',
    },
  },
};

export const fieldGroupTheme = {
  base: '',
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
};

export type FieldGroupTheme = typeof fieldGroupTheme;
