// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const contentSurroundTheme = {
  slots: {
    root: 'grid grid-cols-1 sm:grid-cols-2 gap-8',
    link: 'group block px-6 py-8 rounded-lg border border-border hover:bg-background-elevated/50 focus-visible:outline-primary transition-colors',
    linkLeading: 'inline-flex items-center rounded-full p-1.5 bg-background-elevated group-hover:bg-primary/10 ring ring-ring-accented mb-4 group-hover:ring-primary/50',
    linkLeadingIcon: 'size-5 shrink-0 color-text-highlighted group-hover:text-primary',
    linkTitle: 'font-medium text-[15px] color-text-highlighted mb-1 truncate',
    linkDescription: 'text-sm color-text-muted line-clamp-2',
  },
  variants: {
    direction: {
      left: {
        linkLeadingIcon: 'group-active:-translate-x-0.5',
      },
      right: {
        link: 'text-right',
        linkLeadingIcon: 'group-active:translate-x-0.5',
      },
    },
  },
} satisfies UvConfig<typeof pohon>['contentSurround'];
