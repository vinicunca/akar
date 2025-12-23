import type { Composer } from 'vue-i18n';
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const isDev = import.meta.dev;
  const i18n = nuxtApp.$i18n as Composer;

  i18n.setMissingHandler((locale, key) => {
    if (isDev && key.includes('.')) {
      console.warn(
        `[intlify] Not found '${key}' key in '${locale}' locale messages.`,
      );
    }
  });
});
