// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { inputTheme } from './input.theme';

export const textAreaTheme = {
  slots: {
    ...inputTheme.slots,
    leading: 'absolute start-0 flex items-start',
    trailing: 'absolute end-0 flex items-start',
  },
  variants: {
    ...inputTheme.variants,
    autoresize: {
      true: {
        base: 'resize-none',
      },
    },
    size: {
      xs: {
        leading: 'ps-2 inset-y-1',
        trailing: 'pe-2 inset-y-1',
      },
      sm: {
        leading: 'ps-2.5 inset-y-1.5',
        trailing: 'pe-2.5 inset-y-1.5',
      },
      md: {
        leading: 'ps-2.5 inset-y-1.5',
        trailing: 'pe-2.5 inset-y-1.5',
      },
      lg: {
        leading: 'ps-3 inset-y-2',
        trailing: 'pe-3 inset-y-2',
      },
      xl: {
        leading: 'ps-3 inset-y-2',
        trailing: 'pe-3 inset-y-2',
      },
    },
  },
  compoundVariants: inputTheme.compoundVariants,
} satisfies UvConfig<typeof pohon>['textarea'];
