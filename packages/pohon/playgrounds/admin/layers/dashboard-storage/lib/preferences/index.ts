import type { Preferences } from './preferences.entity';

import { preferencesManager } from './preferences.manager';

export const {
  getPreferences,
  updatePreferences,
  resetPreferences,
  clearCache,
  initPreferences,
} = preferencesManager;

export const preferences: Preferences = getPreferences();

export { preferencesManager };

export type * from './preferences.entity';
export * from './use-preferences';
