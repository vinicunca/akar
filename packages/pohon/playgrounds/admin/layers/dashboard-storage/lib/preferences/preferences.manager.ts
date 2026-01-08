import type { DeepPartial } from '@vinicunca/perkakas';
import type { InitialOptions, Preferences } from './preferences.entity';
import { isMacOs } from '#layers/admin/lib';
import {
  breakpointsTailwind,
  useBreakpoints,
  useDebounceFn,
} from '@vueuse/core';
import { defu } from 'defu';
import { markRaw, reactive, readonly, watch } from 'vue';
import { DashboardStorageManager } from '../storage-manager';
import { defaultPreferences } from './preferences.defaults';
import { updateCssVariables } from './preferences.styling';

const STORAGE_KEYS = {
  MAIN: 'preferences',
  LOCALE: 'preferences-locale',
  THEME: 'preferences-theme',
} as const;

export class PreferenceManager {
  private cache: DashboardStorageManager;
  private debouncedSave: (preference: Preferences) => void;
  private initialPreferences: Preferences = defaultPreferences;
  private isInitialized = false;
  private state: Preferences;

  constructor() {
    this.cache = new DashboardStorageManager();

    this.state = reactive<Preferences>(
      this.loadFromCache() || { ...defaultPreferences },
    );
    // Avoid frequent cache operations
    this.debouncedSave = useDebounceFn(
      (preference) => this.saveToCache(preference),
      150,
    );
  }

  clearCache = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      this.cache.removeItem(key);
    });
  };

  getInitialPreferences = () => {
    return this.initialPreferences;
  };

  getPreferences = () => {
    return readonly(this.state);
  };

  /**
   * Override preferences
   * overrides  Preferences to be overridden
   * namespace  Namespace
   */
  initPreferences = async ({ namespace, overrides }: InitialOptions) => {
    // Whether it has been initialized
    if (this.isInitialized) {
      return;
    }
    // Initialize storage manager
    this.cache = new DashboardStorageManager({ prefix: namespace });
    // Merge initial preferences
    this.initialPreferences = defu({}, overrides, defaultPreferences);

    const cachedPreferences = this.loadFromCache() || {};

    // Load and merge currently stored preferences
    const mergedPreference = defu(
      {},
      cachedPreferences,
      this.initialPreferences,
    );

    // Update preferences
    this.updatePreferences(mergedPreference);

    this.setupWatcher();

    this.initPlatform();
    // Mark as initialized
    this.isInitialized = true;
  };

  /**
   * Reset preferences
   * Preferences will be reset to initial values and removed from localStorage.
   */
  resetPreferences = () => {
    // Reset state to initial preferences
    Object.assign(this.state, this.initialPreferences);
    // Save the reset preferences
    this.saveToCache(this.state);

    // Directly trigger UI update
    this.handleUpdates(this.state);
  };

  /**
   * Update preferences
   * @param updates - Preferences to be updated
   */
  updatePreferences = (updates: DeepPartial<Preferences>) => {
    const mergedState = defu({}, updates, markRaw(this.state));

    Object.assign(this.state, mergedState);

    // Perform corresponding operations based on the updated keys
    this.handleUpdates(updates);
    this.debouncedSave(this.state);
  };

  /**
   * Handle updated keys
   * Perform corresponding operations based on the updated keys.
   * @param updates - Partially updated preferences
   */
  private handleUpdates(updates: DeepPartial<Preferences>) {
    const themeUpdates = updates.theme || {};
    const appUpdates = updates.app || {};

    if (themeUpdates && Object.keys(themeUpdates).length > 0) {
      updateCssVariables(this.state);
    }

    if (
      Reflect.has(appUpdates, 'colorGrayMode')
      || Reflect.has(appUpdates, 'colorWeakMode')
    ) {
      this.updateColorMode(this.state);
    }
  }

  private initPlatform() {
    document.documentElement.dataset.platform = isMacOs() ? 'macOs' : 'window';
  }

  /**
   * Load preferences from cache.
   * @returns The cached preference setting; returns null if it does not exist.
   */
  private loadFromCache(): null | Preferences {
    return this.cache.getItem<Preferences>(STORAGE_KEYS.MAIN);
  }

  /**
   * Save preferences to cache.
   * @param preference - Preferences to be saved
   */
  private saveToCache(preference: Preferences) {
    this.cache.setItem(STORAGE_KEYS.MAIN, preference);
    this.cache.setItem(STORAGE_KEYS.LOCALE, preference.app.locale);
    this.cache.setItem(STORAGE_KEYS.THEME, preference.theme.mode);
  }

  /**
   * Watch for changes in state and system preferences.
   */
  private setupWatcher() {
    if (this.isInitialized) {
      return;
    }

    // Watch breakpoints to determine if it is a mobile device
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller('md');

    watch(
      () => isMobile.value,
      (val) => {
        this.updatePreferences({
          app: { isMobile: val },
        });
      },
      { immediate: true },
    );

    // Watch for changes in system theme preferences
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        this.updatePreferences({
          theme: { mode: isDark ? 'dark' : 'light' },
        });
      });
  }

  /**
   * Update page color mode (gray, color weak)
   * @param preference
   */
  private updateColorMode(preference: Preferences) {
    if (preference.app) {
      const { enableColorGrayMode: colorGrayMode, enableColorWeakMode: colorWeakMode } = preference.app;
      const dom = document.documentElement;
      const COLOR_WEAK = 'invert-mode';
      const COLOR_GRAY = 'grayscale-mode';

      if (colorWeakMode) {
        dom.classList.add(COLOR_WEAK);
      } else {
        dom.classList.remove(COLOR_WEAK);
      }

      if (colorGrayMode) {
        dom.classList.add(COLOR_GRAY);
      } else {
        dom.classList.remove(COLOR_GRAY);
      }
    }
  }
}

export const preferencesManager = new PreferenceManager();
