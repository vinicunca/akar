// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const cardTheme = {
  slots: {
    root: 'rounded-lg overflow-hidden',
    header: 'p-4 sm:px-6',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:px-6',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-background-inverted color-text-inverted',
      },
      outline: {
        root: 'bg-background-default ring ring-ring divide-y divide-divide',
      },
      soft: {
        root: 'bg-background-elevated/50 divide-y divide-divide',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-ring divide-y divide-divide',
      },
    },
  },
} satisfies UvConfig<typeof pohon>['card'];
