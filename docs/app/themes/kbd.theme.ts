// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const kbdTheme = {
  base: 'inline-flex items-center justify-center px-1 rounded-md font-medium font-sans py-0.5 shadow-[0_0_0_1px_rgba(255,255,255,10%),0_3px_0_rgba(255,255,255,10%)]',
} satisfies UvConfig<typeof pohon>['kbd'];
