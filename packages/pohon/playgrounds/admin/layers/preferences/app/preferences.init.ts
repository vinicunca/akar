import type { Preferences } from './preferences.entity';

import { preferencesManager } from './preferences.manager';

/**
 * Both apply and bind ensure that when the exported functions are called,
 * the `this` context points to preferencesManager, not to wherever they're called from.
 */

export const preferences: Preferences = preferencesManager
  .getPreferences
  .apply(preferencesManager);

export const updatePreferences = preferencesManager
  .updatePreferences
  .bind(preferencesManager);

export const resetPreferences = preferencesManager
  .resetPreferences
  .bind(preferencesManager);

export const clearPreferencesCache = preferencesManager
  .clearCache
  .bind(preferencesManager);

export const initPreferences = preferencesManager
  .initPreferences
  .bind(preferencesManager);

export {
  preferencesManager,
};
