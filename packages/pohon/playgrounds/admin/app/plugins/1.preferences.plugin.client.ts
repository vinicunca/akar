import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import { initPreferences } from '~~/layers/preferences/app/preferences.init';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const namespace = runtimeConfig.public.namespace;

  initPreferences({
    namespace,
  });
});
