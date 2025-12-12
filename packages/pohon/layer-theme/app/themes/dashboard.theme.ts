// @unocss-include

import type {
  PThemeDashboardContent,
  PThemeDashboardLayout,
  PThemeDashboardSidebar,
} from 'pohon-ui';

export const dashboardThemes = {
  dashboardLayout: {
    slots: {
      root: 'relative flex min-h-full w-full',
      content: 'flex flex-1 flex-col overflow-hidden transition-all-300 ease-in',
    },
  } satisfies PThemeDashboardLayout,
  dashboardSidebar: {
    slots: {
      hiddenSide: 'h-full transition-all-150',
      root: 'fixed left-0 top-0 h-full transition-all-150',
    },
    variants: {
      sidebarMixed: {
        true: {
          root: 'bg-background',
        },
        false: {
          root: 'border-r border-border bg-background shadow-lg',
        },
      },
    },
  } satisfies PThemeDashboardSidebar,
  dashboardContent: {
    base: 'bg-background-elevated',
  } satisfies PThemeDashboardContent,
};
