// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const collapsibleTheme = {
  slots: {
    content: 'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden',
  },
} satisfies UvConfig<typeof pohon>['collapsible'];
