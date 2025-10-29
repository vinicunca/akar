// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';
import { BRANDS } from './constant';

export const calendarTheme = {
  slots: {
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:(flex-row space-x-4 space-y-0)',
    heading: 'text-center font-medium truncate mx-auto',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid grid-cols-7 place-items-center',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: 'rounded-md',
    cell: 'relative text-center',
    cellTrigger: 'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-[disabled]:(color-text-dimmed cursor-not-allowed) data-[unavailable]:(line-through color-text-muted pointer-events-none) data-[today]:font-semibold data-[outside-view]:color-text-muted transition-colors-280',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [
        color,
        {
          headCell: `color-${color}`,
          cellTrigger: `focus-visible:ring-${color}`,
        },
      ])),
      neutral: {
        headCell: 'color-text-highlighted',
        cellTrigger: 'focus-visible:ring-ring-inverted',
      },
    },
    size: {
      xs: {
        heading: 'text-xs',
        cell: 'text-xs',
        headCell: 'text-[10px]',
        cellTrigger: 'size-7',
        body: 'space-y-2 pt-2',
      },
      sm: {
        heading: 'text-xs',
        headCell: 'text-xs',
        cell: 'text-xs',
        cellTrigger: 'size-7',
      },
      md: {
        heading: 'text-sm',
        headCell: 'text-xs',
        cell: 'text-sm',
        cellTrigger: 'size-8',
      },
      lg: {
        heading: 'text-base',
        headCell: 'text-base',
        cellTrigger: 'size-9 text-base',
      },
      xl: {
        heading: 'text-lg',
        headCell: 'text-lg',
        cellTrigger: 'size-10 text-lg',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'solid',
      class: {
        cellTrigger: `akar:data-[selected]:bg-${color} akar:data-[selected]:color-text-inverted data-[today]:not-[[data-selected]]:color-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: {
        cellTrigger: `akar:data-[selected]:ring akar:data-[selected]:ring-inset akar:data-[selected]:ring-${color}/50 akar:data-[selected]:color-${color} data-[today]:not-[[data-selected]]:color-${color} data-[highlighted]:bg-${color}/10 hover:not-[[data-selected]]:bg-${color}/10`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'soft',
      class: {
        cellTrigger: `akar:data-[selected]:bg-${color}/10 akar:data-[selected]:color-${color} data-[today]:not-[[data-selected]]:color-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'subtle',
      class: {
        cellTrigger: `akar:data-[selected]:bg-${color}/10 akar:data-[selected]:color-${color} akar:data-[selected]:ring akar:data-[selected]:ring-inset akar:data-[selected]:ring-${color}/25 data-[today]:not-[[data-selected]]:color-${color} data-[highlighted]:bg-${color}/20 hover:not-[[data-selected]]:bg-${color}/20`,
      },
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: {
        cellTrigger: 'akar:(data-[selected]:(bg-background-inverted color-text-inverted)) data-[today]:not-[[data-selected]]:color-text-highlighted data-[highlighted]:bg-background-inverted/20 hover:not-[[data-selected]]:bg-background-inverted/10',
      },
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: {
        cellTrigger: 'data-[highlighted]:bg-background-inverted/10 data-[today]:not-[[data-selected]]:color-text-highlighted hover:not-[[data-selected]]:bg-background-inverted/10 akar:(data-[selected]:color-text data-[selected]:bg-background data-[selected]:ring data-[selected]:ring-ring-accented data-[selected]:ring-inset)',
      },
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: {
        cellTrigger: 'data-[highlighted]:bg-background-inverted/20 data-[today]:not-[[data-selected]]:color-text-highlighted hover:not-[[data-selected]]:bg-background-inverted/10 akar:(data-[selected]:color-text data-[selected]:bg-background-elevated)',
      },
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: {
        cellTrigger: 'data-[highlighted]:bg-background-inverted/20 data-[today]:not-[[data-selected]]:color-text-highlighted hover:not-[[data-selected]]:bg-background-inverted/10 akar:(data-[selected]:color-text data-[selected]:bg-background-elevated data-[selected]:ring data-[selected]:ring-ring-accented data-[selected]:ring-inset)',
      },
    },
  ],
} satisfies UvConfig<typeof pohon>['calendar'];
