// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { BRANDS } from './constant';

export const tabsTheme = {
  slots: {
    root: 'flex items-center gap-2',
    list: 'relative flex p-1 group',
    indicator: 'absolute transition-[transform,width]-200',
    trigger: 'group relative inline-flex items-center min-w-0 data-[state=inactive]:color-text-muted hover:data-[state=inactive]:not-disabled:color-text font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    label: 'truncate',
    trailingBadge: 'shrink-0',
    trailingBadgeSize: 'sm',
    content: 'focus:outline-none w-full',
  },
  variants: {
    variant: {
      pill: {
        list: 'bg-background-elevated rounded-lg',
        trigger: 'grow',
        indicator: 'rounded-md shadow-xs',
      },
      link: {
        list: 'border-border',
        indicator: 'rounded-full',
        trigger: 'focus:outline-none',
      },
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'w-full',
        indicator: 'left-0 w-$akar-tabs-indicator-size translate-x-$akar-tabs-indicator-position',
        trigger: 'justify-center',
      },
      vertical: {
        list: 'flex-col',
        indicator: 'top-0 h-$akar-tabs-indicator-size translate-y-$akar-tabs-indicator-position',
      },
    },
    size: {
      xs: {
        trigger: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      sm: {
        trigger: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      md: {
        trigger: 'px-3 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      lg: {
        trigger: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      xl: {
        trigger: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'pill',
      class: {
        indicator: 'inset-y-1',
      },
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      class: {
        list: 'border-b -mb-px',
        indicator: '-bottom-px h-px',
      },
    },
    {
      orientation: 'vertical',
      variant: 'pill',
      class: {
        indicator: 'inset-x-1',
        list: 'items-center',
      },
    },
    {
      orientation: 'vertical',
      variant: 'link',
      class: {
        list: 'border-s -ms-px',
        indicator: '-start-px w-px',
      },
    },
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'pill',
      class: {
        indicator: `bg-${color}`,
        trigger: `data-[state=active]:color-text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}`,
      },
    })),
    {
      color: 'neutral',
      variant: 'pill',
      class: {
        indicator: 'bg-inverted',
        trigger: 'data-[state=active]:color-text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
      },
    },
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'link',
      class: {
        indicator: `bg-${color}`,
        trigger: `data-[state=active]:color-${color} focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
      },
    })),
    {
      color: 'neutral',
      variant: 'link',
      class: {
        indicator: 'bg-background-inverted',
        trigger: 'data-[state=active]:color-text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['tabs'];
