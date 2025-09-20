export const drawerTheme = {
  slots: {
    overlay: 'fixed inset-0 bg-elevated/75',
    content: 'fixed bg-default ring ring-default flex focus:outline-none',
    handle: '',
    container: 'w-full flex flex-col gap-4 p-4 overflow-y-auto',
    header: '',
    title: 'text-highlighted font-semibold',
    description: 'mt-1 text-muted text-sm',
    body: 'flex-1',
    footer: 'flex flex-col gap-1.5',
  },
  variants: {
    direction: {
      top: {
        content: 'mb-24 flex-col-reverse',
        handle: 'mb-4',
      },
      right: {
        content: 'flex-row',
        handle: '!ml-4',
      },
      bottom: {
        content: 'mt-24 flex-col',
        handle: 'mt-4',
      },
      left: {
        content: 'flex-row-reverse',
        handle: '!mr-4',
      },
    },
    inset: {
      true: {
        content: 'rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]',
      },
    },
  },
};

export type DrawerTheme = typeof drawerTheme;
