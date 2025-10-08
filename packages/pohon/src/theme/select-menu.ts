import type { PohonModuleOptions } from '../module';
import { defuFn } from 'defu';
import select from './select';

export default (options: Required<PohonModuleOptions>) => {
  return defuFn(
    {
      slots: {
        input: '',
        focusScope: '',
        content: '',
      },

      variants: {
        virtualize: {
          true: {
            viewport: '',
          },
          false: {
            viewport: '',
          },
        },
      },

      compoundVariants: [],

    },
    select(options),
  );
};
