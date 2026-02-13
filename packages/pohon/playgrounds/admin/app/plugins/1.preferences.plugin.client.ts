import { preferencesManager } from '#layers/admin/app/preferences';

export default defineNuxtPlugin(() => {
  preferencesManager.initPreferences({
    namespace: 'vinicunca',
  });
});
