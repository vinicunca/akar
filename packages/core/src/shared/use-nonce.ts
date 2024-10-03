import { computed, type Ref, ref } from 'vue';

import { injectAConfigProviderContext } from '~~/a-config-provider/a-config-provider.vue';

export function useNonce(nonce?: Ref<string | undefined>) {
  const context = injectAConfigProviderContext({
    nonce: ref(),
  });
  return computed(
    () => nonce?.value || context.nonce?.value,
  );
}
