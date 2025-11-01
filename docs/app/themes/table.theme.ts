// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { BRANDS } from './constant';

export const tableTheme = {
  slots: {
    root: 'relative overflow-auto',
    base: 'min-w-full',
    caption: 'sr-only',
    thead: 'relative',
    tbody: '[&>tr]:data-[selectable=true]:hover:bg-background-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary',
    tfoot: 'relative',
    tr: 'data-[selected=true]:bg-background-elevated/50',
    th: 'px-4 py-3.5 text-sm color-text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0',
    td: 'p-4 text-sm color-text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0',
    separator: 'absolute z-1 left-0 w-full h-px bg-(--pohon-border-accented)',
    empty: 'py-6 text-center text-sm color-text-muted',
    loading: 'py-6 text-center',
  },
  variants: {
    virtualize: {
      false: {
        base: 'overflow-clip',
        tbody: 'divide-y divide-divide',
      },
    },
    pinned: {
      true: {
        th: 'sticky bg-background/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0',
        td: 'sticky bg-background/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0',
      },
    },
    sticky: {
      true: {
        thead: 'sticky top-0 inset-x-0 bg-background/75 z-1 backdrop-blur',
        tfoot: 'sticky bottom-0 inset-x-0 bg-background/75 z-1 backdrop-blur',
      },
      header: {
        thead: 'sticky top-0 inset-x-0 bg-background/75 z-1 backdrop-blur',
      },
      footer: {
        tfoot: 'sticky bottom-0 inset-x-0 bg-background/75 z-1 backdrop-blur',
      },
    },
    loading: {
      true: {
        thead: 'after:(content-empty absolute z-1 h-px)',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((loadingColor: string) => ({
      loading: true,
      loadingColor,
      class: {
        thead: `after:bg-${loadingColor}`,
      },
    })),
    {
      loading: true,
      loadingColor: 'neutral',
      class: {
        thead: 'after:bg-background-inverted',
      },
    },
    {
      loading: true,
      loadingAnimation: 'carousel',
      class: {
        thead: 'after:animate-carousel rtl:after:animate-carousel-rtl',
      },
    },
    {
      loading: true,
      loadingAnimation: 'carousel-inverse',
      class: {
        thead: 'after:animate-carousel-inverse rtl:after:animate-carousel-inverse-rtl',
      },
    },
    {
      loading: true,
      loadingAnimation: 'swing',
      class: {
        thead: 'after:animate-swing',
      },
    },
    {
      loading: true,
      loadingAnimation: 'elastic',
      class: {
        thead: 'after:animate-elastic',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['table'];
