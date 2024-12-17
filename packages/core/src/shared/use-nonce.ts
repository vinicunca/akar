import { computed, type Ref, ref } from 'vue';
import { injectAConfigProviderContext } from '~~/config-provider/config-provider.vue';

export function useNonce(nonce?: Ref<string | undefined>) {
  const context = injectAConfigProviderContext({
    nonce: ref(),
  });

  return computed(() => nonce?.value || context.nonce?.value);
}
