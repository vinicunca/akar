import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import { initPreferences } from '~~/layers/dashboard-preferences/lib/preferences.init';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const namespace = runtimeConfig.public.namespace;

  initPreferences({
    namespace,
  });
});
