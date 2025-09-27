import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      container: '',
      base: '',
      indicator: '',
      icon: '',
      wrapper: '',
      label: '',
      description: '',
    },

    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            base: '',
            indicator: '',
          },
        ])),
        neutral: {
          base: '',
          indicator: '',
        },
      },
      variant: {
        list: {
          root: '',
        },
        card: {
          root: '',
        },
      },
      indicator: {
        start: {
          root: '',
          wrapper: '',
        },
        end: {
          root: '',
          wrapper: '',
        },
        hidden: {
          base: '',
          wrapper: '',
        },
      },
      size: {
        xs: {
          base: '',
          container: '',
          wrapper: '',
        },
        sm: {
          base: '',
          container: '',
          wrapper: '',
        },
        md: {
          base: '',
          container: '',
          wrapper: '',
        },
        lg: {
          base: '',
          container: '',
          wrapper: '',
        },
        xl: {
          base: '',
          container: '',
          wrapper: '',
        },
      },
      required: {
        true: {
          label: '',
        },
      },
      disabled: {
        true: {
          base: '',
          label: '',
          description: '',
        },
      },
      checked: {
        true: '',
      },
    },

    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'list',
      indicator: 'start',
    },
  };
};
