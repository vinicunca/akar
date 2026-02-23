// @unocss-include

import type {
  PThemeDashboardLayout,
  PThemeDashboardLayoutContent,
  PThemeDashboardLayoutHeader,
  PThemeDashboardLayoutSidebar,
} from 'pohon-ui';

export const dashboardThemes = {
  dashboardLayout: {
    slots: {
      root: 'relative flex min-h-full w-full',
      contentRoot: 'flex flex-1 flex-col overflow-hidden transition-all-300 ease-in',
      headerWrapper: 'transition-all-200 overflow-hidden',
      toggleSidebar: 'mr-2',
      contentWrapper: 'transition-margin-200',
    },

    variants: {
      shadowHeader: {
        true: {
          headerWrapper: 'shadow-[0_16px_24px_hsl(var(--pohon-color-background))]',
        },
      },
    },
  } satisfies PThemeDashboardLayout,

  dashboardLayoutHeader: {
    base: 'bg-header pl-2 border-b flex flex-[0_0_auto] w-full transition-margin-200 items-center top-0',
  } satisfies PThemeDashboardLayoutHeader,

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
  } satisfies PThemeDashboardLayoutSidebar,

  dashboardLayoutContent: {
    base: 'bg-background-elevated relative',
  } satisfies PThemeDashboardLayoutContent,
};
