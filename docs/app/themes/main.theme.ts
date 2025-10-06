// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const mainTheme = {
  base: 'min-h-[calc(100vh-var(--pohon-header-height))]',
} satisfies UvConfig<typeof pohon>['main'];
