import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    base: '',
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
      variant: {
        solid: '',
        outline: '',
        soft: '',
        subtle: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },

    compoundVariants: [],

    defaultVariants: {
      variant: 'outline',
      color: 'neutral',
      size: 'md',
    },
  };
};
