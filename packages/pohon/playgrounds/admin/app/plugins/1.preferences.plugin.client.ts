import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import { initPreferences } from '#layers/dashboard-storage/lib';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const namespace = runtimeConfig.public.namespace;

  initPreferences({
    namespace,
  });
});
