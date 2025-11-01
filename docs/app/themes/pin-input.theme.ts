// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { BRANDS } from './constant';

export const pinInputTheme = {
  slots: {
    root: 'relative inline-flex items-center gap-1.5',
    base: 'rounded-md border-0 placeholder:color-text-dimmed text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors-280',
  },
  variants: {
    size: {
      xs: {
        base: 'size-6 text-xs',
      },
      sm: {
        base: 'size-7 text-xs',
      },
      md: {
        base: 'size-8 text-sm',
      },
      lg: {
        base: 'size-9 text-sm',
      },
      xl: {
        base: 'size-10 text-base',
      },
    },
    variant: {
      outline: 'color-text-highlighted bg-background ring ring-inset ring-ring-accented',
      soft: 'color-text-highlighted bg-background-elevated/50 hover:bg-background-elevated focus:bg-background-elevated disabled:bg-background-elevated/50',
      subtle: 'color-text-highlighted bg-background-elevated ring ring-inset ring-ring-accented',
      ghost: 'color-text-highlighted bg-transparent hover:bg-background-elevated focus:bg-background-elevated disabled:bg-transparent dark:disabled:bg-transparent',
      none: 'color-text-highlighted bg-transparent',
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: ['outline', 'subtle'],
      class: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      highlight: true,
      class: `ring ring-inset ring-${color}`,
    })),
    {
      color: 'neutral',
      variant: ['outline', 'subtle'],
      class: 'focus-visible:(ring-2 ring-inset ring-ring-inverted)',
    },
    {
      color: 'neutral',
      highlight: true,
      class: 'ring ring-inset ring-ring-inverted',
    },
  ],
} satisfies UvConfig<typeof pohon>['pinInput'];
