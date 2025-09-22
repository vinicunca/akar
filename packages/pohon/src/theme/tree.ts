import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      item: '',
      listWithChildren: '',
      itemWithChildren: '',
      link: '',
      linkLeadingIcon: '',
      linkLabel: '',
      linkTrailing: '',
      linkTrailingIcon: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            link: '',
          },
        ])),
        neutral: {
          link: '',
        },
      },
      size: {
        xs: {
          link: '',
          linkLeadingIcon: '',
          linkTrailingIcon: '',
        },
        sm: {
          link: '',
          linkLeadingIcon: '',
          linkTrailingIcon: '',
        },
        md: {
          link: '',
          linkLeadingIcon: '',
          linkTrailingIcon: '',
        },
        lg: {
          link: '',
          linkLeadingIcon: '',
          linkTrailingIcon: '',
        },
        xl: {
          link: '',
          linkLeadingIcon: '',
          linkTrailingIcon: '',
        },
      },
      selected: {
        true: {
          link: '',
        },
        false: {
          link: '',
        },
      },
      disabled: {
        true: {
          link: '',
        },
      },
    },
    defaultVariants: {
      color: '',
      size: '',
    },
  };
};
