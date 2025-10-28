// @unocss-include

export const fieldGroupVariantWithRoot = {
  fieldGroup: {
    horizontal: {
      root: 'group has-focus-visible:z-1',
      base: 'group-not-[*:only-child]:group-first:rounded-e-none group-not-[*:only-child]:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
    },
    vertical: {
      root: 'group has-focus-visible:z-1',
      base: 'group-not-[*:only-child]:group-first:rounded-b-none group-not-[*:only-child]:group-last:rounded-t-none group-not-last:group-not-first:rounded-none',
    },
  },
};
