import type { PohonModuleOptions } from '../module';

import { defuFn } from 'defu';
import { fieldGroupVariant } from './field-group';
import input from './input';

export default (options: Required<PohonModuleOptions>) => {
  return defuFn(
    {
      slots: {
        root: '',
        base: '',
        segment: '',
      },
      variants: {
        ...fieldGroupVariant,
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
      compoundVariants: [
      ],
    },
    input(options),
  );
};
