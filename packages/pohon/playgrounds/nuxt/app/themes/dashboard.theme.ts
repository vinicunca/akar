// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

type Dashboard = Pick<UvConfig<typeof pohon>, 'dashboardGroup' | 'dashboardNavbar' | 'dashboardToolbar' | 'dashboardSidebar' | 'dashboardPanel' | 'dashboardSearch' | 'dashboardResizeHandle' | 'dashboardSidebarToggle' | 'dashboardSidebarCollapse' | 'dashboardSearchButton'>;

export const dashboardTheme = {
  dashboardGroup: {
    base: 'fixed inset-0 flex overflow-hidden',
  },
  dashboardNavbar: {
    slots: {
      root: 'h-$pohon-header-height shrink-0 flex items-center justify-between border-b border-border px-4 sm:px-6 gap-1.5',
      left: 'flex items-center gap-1.5 min-w-0',
      icon: 'shrink-0 size-5 self-center me-1.5',
      title: 'flex items-center gap-1.5 font-semibold color-text-highlighted truncate',
      center: 'hidden lg:flex',
      right: 'flex items-center shrink-0 gap-1.5',
      toggle: '',
    },
  },
  dashboardToolbar: {
    slots: {
      root: 'shrink-0 flex items-center justify-between border-b border-border px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]',
      left: 'flex items-center gap-1.5',
      right: 'flex items-center gap-1.5',
    },
  },
  dashboardSidebar: {
    slots: {
      root: 'relative hidden lg:flex flex-col min-h-svh min-w-16 w-$width shrink-0',
      header: 'h-$pohon-header-height shrink-0 flex items-center gap-1.5 px-4',
      body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2',
      footer: 'shrink-0 flex items-center gap-1.5 px-4 py-2',
      content: 'lg:hidden',
      overlay: 'lg:hidden',
    },
    variants: {
      menu: {
        true: {
          header: 'sm:px-6',
          body: 'sm:px-6',
          footer: 'sm:px-6',
        },
      },
      side: {
        left: {
          root: 'border-e border-border',
        },
      },
      toggleSide: {
        right: {
          toggle: 'ms-auto',
        },
      },
    },
  },
  dashboardSidebarToggle: {
    base: 'lg:hidden',
  },
  dashboardSidebarCollapse: {
    base: 'hidden lg:flex',
  },
  dashboardSearch: {
    slots: {
      input: '[&>input]:text-base/5',
    },
    variants: {
      fullscreen: {
        false: {
          modal: 'sm:max-w-3xl sm:h-[28rem]',
        },
      },
    },
  },
  dashboardSearchButton: {
    slots: {
      trailing: 'hidden lg:flex items-center gap-0.5 ms-auto',
    },
  },
  dashboardResizeHandle: {
    base: 'hidden lg:block touch-none select-none cursor-ew-resize relative before:(content-empty absolute inset-y-0 -left-1.5 -right-1.5)',
  },
  dashboardPanel: {
    slots: {
      root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-border shrink-0',
      body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6',
      handle: '',
    },
    variants: {
      size: {
        true: {
          root: 'w-full lg:w-$width',
        },
        false: {
          root: 'flex-1',
        },
      },
    },
  },
} satisfies Dashboard;
