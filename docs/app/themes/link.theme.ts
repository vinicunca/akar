// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const linkTheme = {
  base: 'focus-visible:outline-primary',
  variants: {
    active: {
      true: 'color-primary',
      false: 'color-text-muted',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75',
    },
  },
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: 'hover:color-text transition-colors-280',
    },
  ],
} satisfies UvConfig<typeof pohon>['link'];
