// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const dialogTheme = {
  slots: {
    overlay: 'fixed inset-0 bg-background-elevated/75',
    content: 'fixed bg-background divide-y divide-divide flex flex-col focus:outline-none',
    header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
    wrapper: '',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'color-text-highlighted font-semibold',
    description: 'mt-1 color-text-muted text-sm',
    close: 'absolute top-4 end-4',
  },
  variants: {
    transition: {
      true: {
        overlay: 'data-[state=open]:(animate-in fade-in-0) data-[state=closed]:(animate-out fade-out-0)',
        content: 'data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]) data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%])',
      },
    },
    fullscreen: {
      true: {
        content: 'inset-0',
      },
      false: {
        content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden',
      },
    },
  },
} satisfies UvConfig<typeof pohon>['dialog'];
