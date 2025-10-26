// @unocss-include

import type * as pohon from '#build/pohon';
import type { UvConfig } from 'pohon-ui';

export const containerTheme = {
  base: 'w-full max-w-$container-8xl mx-auto px-4 sm:px-6 lg:px-8',
} satisfies UvConfig<typeof pohon>['container'];
