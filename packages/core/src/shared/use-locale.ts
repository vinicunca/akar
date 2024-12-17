import { computed, type Ref, ref } from 'vue';
import { injectAConfigProviderContext } from '~~/config-provider/config-provider.vue';

export function useLocale(locale?: Ref<string | undefined>) {
  const context = injectAConfigProviderContext({
    locale: ref('en'),
  });

  return computed(() => locale?.value || context.locale?.value || 'en');
}
