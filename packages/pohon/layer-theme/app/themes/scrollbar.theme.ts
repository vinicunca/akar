// @unocss-include

import type { PThemeScrollbar, PThemeScrollbarArea, PThemeScrollbarBar } from 'pohon-ui';

export const scrollbarThemes = {
  scrollbarBar: {
    slots: {
      root: 'flex select-none transition-colors touch-none',
      thumb: 'rounded-full bg-background-accented flex-1 relative',
    },

    variants: {
      orientation: {
        vertical: {
          root: 'h-full w-2.5 border-l border-l-transparent p-px',
        },
        horizontal: {
          root: 'h-2.5 border-t border-t-transparent p-px',
        },
      },
    },
  } satisfies PThemeScrollbarBar,

  scrollbarArea: {
    slots: {
      root: 'relative overflow-hidden',
      viewport: 'rounded-inherit size-full focus:outline-none',
    },
  } satisfies PThemeScrollbarArea,

  scrollbar: {
    slots: {
      root: 'relative pohon-scrollbar',
      shadowTop: 'scrollbar-top-shadow will-change-opacity opacity-0 h-12 w-full pointer-events-none transition-opacity-300 ease-in-out top-0 absolute z-10',
      shadowBottom: 'scrollbar-bottom-shadow will-change-opacity opacity-0 h-12 w-full pointer-events-none transition-opacity-300 ease-in-out bottom-0 absolute z-10',
    },
    variants: {
      shadowTopBorder: {
        true: {
          shadowTop: 'border-border border-t',
        },
      },
      shadowBottomBorder: {
        true: {
          shadowBottom: 'border-border border-b',
        },
      },
      shadowTopScrolling: {
        true: {
          shadowTop: 'opacity-100',
        },
      },
      shadowBottomScrolling: {
        true: {
          shadowBottom: 'opacity-100',
        },
      },
    },
  } satisfies PThemeScrollbar,
};
