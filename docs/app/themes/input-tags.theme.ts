// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { isString, omit } from '@vinicunca/perkakas';
import { inputTheme } from './input.theme';

const inputSlots = omit(inputTheme.slots, ['root', 'base']);

export const inputTagsTheme = {
  slots: {
    ...inputSlots,
    root: [inputTheme.slots.root, 'flex-wrap'],
    base: 'rounded-md transition-colors-280',
    item: 'px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-ring-accented bg-background-elevated color-text data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75 wrap-anywhere data-[state="active"]:bg-background-accented',
    itemDelete: 'inline-flex items-center rounded-xs color-text-dimmed hover:color-text hover:bg-background-accented/75 disabled:pointer-events-none transition-colors-280',
    itemDeleteIcon: 'shrink-0',
    input: 'flex-1 border-0 bg-transparent placeholder:color-text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
  },
  variants: {
    ...inputTheme.variants,
    size: {
      xs: {
        item: 'text-[10px]/3',
        itemDeleteIcon: 'size-3',
      },
      sm: {
        item: 'text-[10px]/3',
        itemDeleteIcon: 'size-3',
      },
      md: {
        item: 'text-xs',
        itemDeleteIcon: 'size-3.5',
      },
      lg: {
        item: 'text-xs',
        itemDeleteIcon: 'size-3.5',
      },
      xl: {
        item: 'text-sm',
        itemDeleteIcon: 'size-4',
      },
    },
    variant: Object.fromEntries(
      Object.entries(inputTheme.variants.variant).map(([key, value]) => [key, replaceFocus(value)]),
    ),
  },
  compoundVariants: [
    ...inputTheme.compoundVariants.map((item) => ({
      ...item,
      class: isString(item.class) ? replaceFocus(item.class) : item.class,
    })),
  ],
} satisfies UvConfig<typeof pohon>['inputTags']; ;

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, 'has-focus:')
    .replace(/focus-visible:/g, 'has-focus-visible:');
}
