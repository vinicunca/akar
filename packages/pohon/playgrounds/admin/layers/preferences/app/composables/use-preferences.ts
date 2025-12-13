import { getDiff } from '#imports';

import { P_DASHBOARD_LAYOUT } from 'pohon-ui';

import { computed } from 'vue';
import { preferencesManager } from '../preferences.manager';
import { isDarkTheme } from '../preferences.styling';

export function usePreferences() {
  const preferences = preferencesManager.getPreferences();
  const initialPreferences = preferencesManager.getInitialPreferences();

  const diffPreference = computed(() => {
    return getDiff(initialPreferences, preferences);
  });

  const appPreferences = computed(() => preferences.app);

  const shortcutKeysPreferences = computed(() => preferences.shortcutKeys);

  const isDark = computed(() => {
    return isDarkTheme(preferences.theme.mode);
  });

  const locale = computed(() => {
    // return preferences.app.locale;
    return '';
  });

  const isMobile = computed(() => {
    return appPreferences.value.isMobile;
  });

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light';
  });

  const layout = computed(() =>
    isMobile.value ? P_DASHBOARD_LAYOUT.SIDEBAR_NAV : appPreferences.value.layout,
  );

  const isShowHeaderNav = computed(() => {
    return preferences.header.enable;
  });

  const isFullContent = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.FULL_CONTENT,
  );

  const isSideNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.SIDEBAR_NAV,
  );

  const isSideMixedNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV,
  );

  const isHeaderNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.HEADER_NAV,
  );

  const isHeaderMixedNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV,
  );

  const isHeaderSidebarNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV,
  );

  const isMixedNav = computed(
    () => appPreferences.value.layout === P_DASHBOARD_LAYOUT.MIXED_NAV,
  );

  const isSideMode = computed(() => {
    return (
      isMixedNav.value
      || isSideMixedNav.value
      || isSideNav.value
      || isHeaderMixedNav.value
      || isHeaderSidebarNav.value
    );
  });

  const sidebarCollapsed = computed(() => {
    return preferences.sidebar.collapsed;
  });

  const keepAlive = computed(
    () => preferences.tabbar.enable && preferences.tabbar.keepAlive,
  );

  const authPageLayout = computed(() => appPreferences.value.authPageLayout);

  const contentIsMaximize = computed(() => {
    const headerIsHidden = preferences.header.hidden;
    const sidebarIsHidden = preferences.sidebar.hidden;
    return headerIsHidden && sidebarIsHidden && !isFullContent.value;
  });

  const globalSearchShortcutKey = computed(() => {
    const { enable, globalSearch } = shortcutKeysPreferences.value;
    return enable && globalSearch;
  });

  const globalLogoutShortcutKey = computed(() => {
    const { enable, globalLogout } = shortcutKeysPreferences.value;
    return enable && globalLogout;
  });

  const globalLockScreenShortcutKey = computed(() => {
    const { enable, globalLockScreen } = shortcutKeysPreferences.value;
    return enable && globalLockScreen;
  });

  const preferencesButtonPosition = computed(() => {
    const { enablePreferences, preferencesButtonPosition } = preferences.app;

    if (!enablePreferences) {
      return {
        fixed: false,
        header: false,
      };
    }

    const { header, sidebar } = preferences;
    const headerHidden = header.hidden;
    const sidebarHidden = sidebar.hidden;

    const contentIsMaximize = headerHidden && sidebarHidden;

    const isHeaderPosition = preferencesButtonPosition === 'header';

    if (preferencesButtonPosition !== 'auto') {
      return {
        fixed: preferencesButtonPosition === 'fixed',
        header: isHeaderPosition,
      };
    }

    const fixed = contentIsMaximize
      || isFullContent.value
      || isMobile.value
      || !isShowHeaderNav.value;

    return {
      fixed,
      header: !fixed,
    };
  });

  return {
    authPageLayout,
    contentIsMaximize,
    diffPreference,
    globalLockScreenShortcutKey,
    globalLogoutShortcutKey,
    globalSearchShortcutKey,
    isDark,
    isFullContent,
    isHeaderMixedNav,
    isHeaderNav,
    isHeaderSidebarNav,
    isMixedNav,
    isMobile,
    isSideMixedNav,
    isSideMode,
    isSideNav,
    keepAlive,
    layout,
    locale,
    preferencesButtonPosition,
    sidebarCollapsed,
    theme,
  };
}
