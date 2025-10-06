// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const headerTheme = {
  slots: {
    root: 'bg-background/75 backdrop-blur border-b border-border h-$pohon-header-height sticky top-0 z-50',
    container: 'flex items-center justify-between gap-3 h-full',
    left: 'lg:flex-1 flex items-center gap-1.5',
    center: 'hidden lg:flex',
    right: 'flex items-center justify-end lg:flex-1 gap-1.5',
    title: 'shrink-0 font-bold text-xl color-text-highlighted flex items-end gap-1.5',
    toggle: 'lg:hidden',
    content: 'lg:hidden',
    overlay: 'lg:hidden',
    header: 'px-4 sm:px-6 h-$pohon-header-height shrink-0 flex items-center justify-between gap-3',
    body: 'p-4 sm:p-6 overflow-y-auto',
  },
  variants: {
    toggleSide: {
      left: {
        toggle: '-ms-1.5',
      },
      right: {
        toggle: '-me-1.5',
      },
    },
  },
} satisfies UvConfig<typeof pohon>['header'];
