import type { PohonModuleOptions } from '../module';

export function switchTheme(options: Required<PohonModuleOptions>) {
  return {
    slots: {
      root: '',
      base: '',
      container: '',
      thumb: '',
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
            icon: '',
          },
        ])),
        neutral: {
          base: '',
          icon: '',
        },
      },
      size: {
        xs: {
          base: '',
          container: '',
          thumb: '',
          wrapper: '',
        },
        sm: {
          base: '',
          container: '',
          thumb: '',
          wrapper: '',
        },
        md: {
          base: '',
          container: '',
          thumb: '',
          wrapper: '',
        },
        lg: {
          base: '',
          container: '',
          thumb: '',
          wrapper: '',
        },
        xl: {
          base: '',
          container: '',
          thumb: '',
          wrapper: '',
        },
      },
      checked: {
        true: {
          icon: '',
        },
      },
      unchecked: {
        true: {
          icon: '',
        },
      },
      loading: {
        true: {
          icon: '',
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
    },
  };
}

export type SwitchTheme = ReturnType<typeof switchTheme>;
