// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const tooltipTheme = {
  slots: {
    content: 'flex items-center gap-1 bg-background color-text-highlighted shadow-sm rounded-sm ring ring-ring h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95) origin-$akar-tooltip-content-transform-origin pointer-events-auto data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    arrow: 'fill-fill',
    text: 'truncate',
    kbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:(content-[\'·\'] me-0.5)',
    // kbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-[\'·\'] not-first-of-type:before:me-0.5',
    kbdsSize: 'sm',
  },
} satisfies UvConfig<typeof pohon>['tooltip'];
