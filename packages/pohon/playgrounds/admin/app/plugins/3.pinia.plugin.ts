import type { Pinia } from 'pinia';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  const runtimeConfig = useRuntimeConfig();

  pinia.use(
    createPersistedState({
      key: (storeKey) => `${runtimeConfig.public.namespace}-${storeKey}`,
    }),
  );
});
