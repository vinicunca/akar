import { computed, type Ref, ref } from 'vue';

import { injectAConfigProviderContext } from '~~/a-config-provider/a-config-provider.vue';

import type { Direction } from './types';

export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectAConfigProviderContext({
    dir: ref('ltr'),
  });

  return computed(
    () => dir?.value || context.dir?.value || 'ltr',
  );
}
