import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      base: '',
      caption: '',
      thead: '',
      tbody: '',
      tfoot: '',
      tr: '',
      th: '',
      td: '',
      separator: '',
      empty: '',
      loading: '',
    },

    variants: {
      virtualize: {
        false: {
          base: '',
          tbody: '',
        },
      },
      pinned: {
        true: {
          th: '',
          td: '',
        },
      },
      sticky: {
        true: {
          thead: '',
          tfoot: '',
        },
        header: {
          thead: '',
        },
        footer: {
          tfoot: '',
        },
      },
      loading: {
        true: {
          thead: '',
        },
      },
      loadingAnimation: {
        'carousel': '',
        'carousel-inverse': '',
        'swing': '',
        'elastic': '',
      },
      loadingColor: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [color, ''])),
        neutral: '',
      },
    },

    compoundVariants: [],

    defaultVariants: {
      loadingColor: 'primary',
      loadingAnimation: 'carousel',
    },
  };
};
