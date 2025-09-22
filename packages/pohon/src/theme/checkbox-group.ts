import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      fieldset: '',
      legend: '',
      item: '',
    },
    variants: {
      orientation: {
        horizontal: {
          fieldset: '',
        },
        vertical: {
          fieldset: '',
        },
      },
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, {}])),
        neutral: {},
      },
      variant: {
        list: {},
        card: {},
        table: {
          item: '',
        },
      },
      size: {
        xs: {
          fieldset: '',
          legend: '',
        },
        sm: {
          fieldset: '',
          legend: '',
        },
        md: {
          fieldset: '',
          legend: '',
        },
        lg: {
          fieldset: '',
          legend: '',
        },
        xl: {
          fieldset: '',
          legend: '',
        },
      },
      required: {
        true: {
          legend: '',
        },
      },
    },
  };
};
