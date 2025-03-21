import type { Ref } from 'vue';

import type { Direction } from './types';
import { computed, ref } from 'vue';

import { injectAConfigProviderContext } from '~~/config-provider/config-provider.vue';

export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectAConfigProviderContext({
    dir: ref('ltr'),
  });

  return computed(
    () => dir?.value || context.dir?.value || 'ltr',
  );
}
