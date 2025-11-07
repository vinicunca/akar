import type { Ref } from 'vue';

import type { Direction } from './types';
import { computed, ref } from 'vue';

import { injectAConfigProviderContext } from '../config-provider/config-provider.vue';

/**
 * The `useDirection` function provides a way to access the current direction in your application.
 * @param [dir] - An optional ref containing the direction (ltr or rtl).
 * @returns  computed value that combines with the resolved direction.
 */
export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectAConfigProviderContext({
    dir: ref('ltr'),
  });

  return computed(
    () => dir?.value || context.dir?.value || 'ltr',
  );
}
