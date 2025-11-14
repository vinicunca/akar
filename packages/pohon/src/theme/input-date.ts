import type { PohonModuleOptions } from '../module';

import { defuFn } from 'defu';
import input from './input';

export default (options: Required<PohonModuleOptions>) => {
  return defuFn(
    {
      slots: {
        root: '',
        base: '',
        segment: '',
        separatorIcon: '',
      },
      variants: {
        size: {
          xs: {
            base: '',
            segment: '',
          },
          sm: {
            base: '',
            segment: '',
          },
          md: {
            base: '',
            segment: '',
          },
          lg: {
            base: '',
            segment: '',
          },
          xl: {
            base: '',
            segment: '',
          },
        },
      },
      compoundVariants: [],
    },
    input(options),
  );
};
