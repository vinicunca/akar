import { computed, type Ref, ref } from 'vue';

import { injectConfigProviderContext } from '~~/a-config-provider/a-config-provider.vue';

export function useNonce(nonce?: Ref<string | undefined>) {
  const context = injectConfigProviderContext({
    nonce: ref(),
  });
  return computed(
    () => nonce?.value || context.nonce?.value,
  );
}
