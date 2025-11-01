// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const toasterTheme = {
  slots: {
    viewport: 'fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none',
    base: 'p-toaster-base pointer-events-auto uno-layer-vinicunca:absolute inset-x-0 z-3000 data-[expanded=false]:data-[front-false]:h-$front-height data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[state=closed]:animate-toast-closed data-[state=x]:data-[expanded=false]:data-[front=false]:animate-toast-collapsed-closed data-[swipe=move]:transition-none duration-200 ease-out',
  },
  variants: {
    position: {
      'top-left': {
        viewport: 'left-4',
      },
      'top-center': {
        viewport: 'left-1/2 transform -translate-x-1/2',
      },
      'top-right': {
        viewport: 'right-4',
      },
      'bottom-left': {
        viewport: 'left-4',
      },
      'bottom-center': {
        viewport: 'left-1/2 transform -translate-x-1/2',
      },
      'bottom-right': {
        viewport: 'right-4',
      },
    },
    swipeDirection: {
      up: 'akar:data-[swipe=end]:(animate-out slide-out-top)',
      right: 'akar:data-[swipe=end]:(animate-out slide-out-right)',
      down: 'akar:data-[swipe=end]:(animate-out slide-out-bottom)',
      left: 'akar:data-[swipe=end]:(animate-out slide-out-left)',
    },
  },
  compoundVariants: [
    {
      position: ['top-left', 'top-center', 'top-right'],
      class: {
        viewport: 'top-4',
        base: 'top-0 data-[state=open]:(animate-in animate-duration-200 slide-in-from-top)',
      },
    },
    {
      position: ['bottom-left', 'bottom-center', 'bottom-right'],
      class: {
        viewport: 'bottom-4',
        base: 'bottom-0 data-[state=open]:(animate-in animate-duration-200 slide-in-from-bottom)',
      },
    },
    {
      swipeDirection: ['left', 'right'],
      class: 'data-[swipe=move]:translate-x-$akar-toast-swipe-move-x data-[swipe=end]:translate-x-$akar-toast-swipe-end-x data-[swipe=cancel]:translate-x-0',
    },
    {
      swipeDirection: ['up', 'down'],
      class: 'data-[swipe=move]:translate-y-$akar-toast-swipe-move-y data-[swipe=end]:translate-y-$akar-toast-swipe-end-y data-[swipe=cancel]:translate-y-0',
    },
  ],
} satisfies UvConfig<typeof pohon>['toaster'];
