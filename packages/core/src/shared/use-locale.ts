import { computed, type Ref, ref } from 'vue';

import { injectAConfigProviderContext } from '~~/a-config-provider/a-config-provider.vue';

export function useLocale(locale?: Ref<string | undefined>) {
  const context = injectAConfigProviderContext({
    locale: ref('en'),
  });

  return computed(() =>
    locale?.value || context.locale?.value || 'en',
  );
}
