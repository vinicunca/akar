// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { BRANDS } from './constant';

export const treeTheme = {
  slots: {
    root: 'relative isolate',
    item: 'w-full',
    listWithChildren: 'border-s border-border',
    itemWithChildren: 'ps-1.5 -ms-px',
    link: 'group text-sm flex w-full select-none items-center relative focus-visible:outline-none focus:outline-none before:(rounded-md content-empty inset-x-0 inset-y-px absolute -z-1) focus-visible:before:ring-2 focus-visible:before:ring-inset',
    linkLeadingIcon: 'shrink-0 relative',
    linkLabel: 'truncate',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingIcon: 'shrink-0 transform transition-transform-280 group-data-[expanded]:rotate-180',
  },
  variants: {
    virtualize: {
      true: {
        root: 'overflow-y-auto',
      },
    },
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [
        color,
        {
          link: `focus-visible:before:ring-${color}`,
        },
      ])),
      neutral: {
        link: 'focus-visible:before:ring-ring-inverted',
      },
    },
    size: {
      xs: {
        listWithChildren: 'ms-4',
        link: 'px-2 py-1 text-xs gap-1',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
      },
      sm: {
        listWithChildren: 'ms-4.5',
        link: 'px-2.5 py-1.5 text-xs gap-1.5',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
      },
      md: {
        listWithChildren: 'ms-5',
        link: 'px-2.5 py-1.5 text-sm gap-1.5',
        linkLeadingIcon: 'size-5',
        linkTrailingIcon: 'size-5',
      },
      lg: {
        listWithChildren: 'ms-5.5',
        link: 'px-3 py-2 text-sm gap-2',
        linkLeadingIcon: 'size-5',
        linkTrailingIcon: 'size-5',
      },
      xl: {
        listWithChildren: 'ms-6',
        link: 'px-3 py-2 text-base gap-2',
        linkLeadingIcon: 'size-6',
        linkTrailingIcon: 'size-6',
      },
    },
    selected: {
      true: {
        link: 'before:bg-background-elevated',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      selected: true,
      class: {
        link: `color-${color}`,
      },
    })),
    {
      color: 'neutral',
      selected: true,
      class: {
        link: 'color-text-highlighted',
      },
    },
    {
      selected: false,
      disabled: false,
      class: {
        link: 'hover:color-text-highlighted hover:before:bg-background-elevated/50 transition-colors-280 before:transition-colors-280',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['tree'];
