// @unocss-include

import type { PThemePopover } from 'pohon-ui';

export const popoverTheme = {
  slots: {
    content: 'bg-background shadow-lg rounded-md ring ring-ring data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-$akar-popover-content-transform-origin focus:outline-none pointer-events-auto',
    arrow: 'fill-fill',
  },
} satisfies PThemePopover;
