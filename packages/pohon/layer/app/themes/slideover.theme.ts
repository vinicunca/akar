// @unocss-include

import type { PThemeSlideover } from 'pohon-ui';

export const slideoverTheme = {
  slots: {
    overlay: 'fixed inset-0 bg-background-elevated/75',
    content: 'fixed bg-background divide-y divide-divide sm:ring ring-ring sm:shadow-lg flex flex-col focus:outline-none',
    header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'color-text-highlighted font-semibold',
    description: 'mt-1 color-text-muted text-sm',
    close: 'absolute top-4 end-4',
  },
  variants: {
    side: {
      top: {
        content: 'inset-x-0 top-0 max-h-full',
      },
      right: {
        content: 'right-0 inset-y-0 w-full max-w-md',
      },
      bottom: {
        content: 'inset-x-0 bottom-0 max-h-full',
      },
      left: {
        content: 'left-0 inset-y-0 w-full max-w-md',
      },
    },
    transition: {
      true: {
        overlay: 'data-[state=open]:(animate-in fade-in-0) data-[state=closed]:(animate-out fade-out-0)',
      },
    },
  },
  compoundVariants: [
    {
      transition: true,
      side: 'top',
      class: {
        content: 'data-[state=open]:(animate-in slide-in-from-top) data-[state=closed]:(animate-out slide-out-to-top)',
      },
    },
    {
      transition: true,
      side: 'right',
      class: {
        content: 'data-[state=open]:(animate-in slide-in-from-right) data-[state=closed]:(animate-out slide-out-to-right)',
      },
    },
    {
      transition: true,
      side: 'bottom',
      class: {
        content: 'data-[state=open]:(animate-in slide-in-from-bottom) data-[state=closed]:(animate-out slide-out-to-bottom)',
      },
    },
    {
      transition: true,
      side: 'left',
      class: {
        content: 'data-[state=open]:(animate-in slide-in-left) data-[state=closed]:(animate-out slide-out-left)',
      },
    },
  ],
} satisfies PThemeSlideover;
