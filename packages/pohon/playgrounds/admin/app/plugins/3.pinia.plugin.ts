import type { Pinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  const runtimeConfig = useRuntimeConfig();

  pinia.use(
    createPersistedState({
      key: (storeKey) => `${runtimeConfig.public.namespace}-${storeKey}`,
    }),
  );
});
