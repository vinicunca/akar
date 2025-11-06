import type { PDirection } from 'pohon-ui';
import { defineAppConfig } from '#imports';

export default defineAppConfig({
  dir: 'ltr' as PDirection,
  toaster: {
    position: 'bottom-right' as const,
    max: 5,
    expand: true,
    disableSwipe: false,
    duration: 5000,
  },
});
