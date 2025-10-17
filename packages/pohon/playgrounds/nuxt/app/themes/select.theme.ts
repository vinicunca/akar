// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { isString } from '@vinicunca/perkakas';
import { defu } from 'defu';
import { inputTheme } from '~/themes/input.theme';

const { root, base, ...inputSlots } = inputTheme.slots;

export const selectTheme = {
  slots: {
    base: 'relative group rounded-md inline-flex items-center focus:outline-none disabled:(cursor-not-allowed opacity-75) transition-colors-280',
    value: 'truncate pointer-events-none',
    placeholder: 'truncate color-text-dimmed',
    arrow: 'fill-fill',
    content: 'max-h-60 w-$akar-select-trigger-width shadow-lg bg-white rounded-md ring ring-ring overflow-hidden pointer-events-auto flex-vertical origin-$akar-select-content-tranform-origin data-[state=open]:(animate-in fade-in-0 animate-duration-280 data-[side=bottom]:slide-in-top-5%) data-[state=closed]:(animate-out fade-out-0 animate-duration-280 data-[side=bottom]:slide-out-top-5%)',
    viewport: 'relative divide-y divide-divide scroll-py-1 overflow-y-auto flex-1',
    group: 'p-1 isolate',
    empty: 'text-center color-text-muted',
    label: 'font-semibold color-text-highlighted',
    separator: '-mx-1 my-1 h-px bg-border',
    item: 'group cursor-pointer relative w-full flex items-center select-none outline-none before:(content-empty absolute -z-1 inset-px rounded-md transition-colors) data-disabled:(cursor-not-allowed opacity-75) transition-colors-280 data-[state=checked]:(color-primary before:bg-background-elevated) data-[highlighted]:not-[[data-state=checked]]:(color-black before:bg-primary/30)',
    itemLeadingIcon: 'shrink-0 color-text-dimmed group-data-highlighted:not-group-data-disabled:color-text-default transition-colors',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingChip: 'shrink-0',
    itemLeadingChipSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemLabel: 'truncate',
    ...inputSlots,
  },
  variants: defu(
    {
      size: {
        xs: {
          label: 'p-1 text-[10px]/3 gap-1',
          item: 'p-1 text-xs gap-1',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-1 text-xs',
        },
        sm: {
          label: 'p-1.5 text-[10px]/3 gap-1.5',
          item: 'p-1.5 text-xs gap-1.5',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-1.5 text-xs',
        },
        md: {
          label: 'p-1.5 text-xs gap-1.5',
          item: 'p-1.5 text-sm gap-1.5',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-1.5 text-sm',
        },
        lg: {
          label: 'p-2 text-xs gap-2',
          item: 'p-2 text-sm gap-2',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-2 text-sm',
        },
        xl: {
          label: 'p-2 text-sm gap-2',
          item: 'p-2 text-base gap-2',
          itemLeadingIcon: 'size-6',
          itemLeadingAvatarSize: 'xs',
          itemLeadingChip: 'size-6',
          itemLeadingChipSize: 'lg',
          itemTrailingIcon: 'size-6',
          empty: 'p-2 text-base',
        },
      },
    },
    inputTheme.variants,
  ),
  compoundVariants: [
    ...inputTheme.compoundVariants.map((item) => ({
      ...item,
      class: isString(item.class) ? replaceFocus(item.class) : item.class,
    })),
  ],
} satisfies UvConfig<typeof pohon>['select'];

function replaceFocus(str: string): string {
  return str
    .replace(/focus-visible:/g, 'focus:');
}
