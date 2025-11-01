// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const paginationTheme = {
  slots: {
    list: 'flex items-center gap-1',
    ellipsis: 'pointer-events-none',
    label: 'min-w-5 text-center',
  },
} satisfies UvConfig<typeof pohon>['pagination'];
