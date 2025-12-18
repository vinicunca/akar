<script lang="ts" setup>
import type { PDashboardMenuItem, PDashboardMenuRaw } from 'pohon-ui';
import {
  DashboardLayoutContent,
  DashboardLayoutMenu,
  PDashboardLayout,
} from '#components';
import { computed, mapTree, useDashboardExtraMenu, useDashboardMixedMenu, useI18n, usePreferences, useRoute } from '#imports';

import { clone } from '@vinicunca/perkakas';
import { preferences, updatePreferences } from '~~/layers/preferences/app/preferences.init';
import CoreLogo from '~/domains/core/components/core-logo.vue';

const {
  isDark,
  isHeaderNav,
  isMixedNav,
  isMobile,
  isSideMixedNav,
  isHeaderMixedNav,
  isHeaderSidebarNav,
  layout,
  preferencesButtonPosition,
  sidebarCollapsed,
  theme,
} = usePreferences();

const sidebarTheme = computed(() => {
  const dark = isDark.value || preferences.theme.enableSemiDarkSidebar;
  return dark ? 'dark' : 'light';
});

const headerTheme = computed(() => {
  const dark = isDark.value || preferences.theme.enableSemiDarkHeader;
  return dark ? 'dark' : 'light';
});

const logoClass = computed(() => {
  const { showCollapsedTitle: collapsedShowTitle } = preferences.sidebar;
  const classes: Array<string> = [];

  if (collapsedShowTitle && sidebarCollapsed.value && !isMixedNav.value) {
    classes.push('mx-auto');
  }

  if (isSideMixedNav.value) {
    classes.push('flex-center');
  }

  return classes.join(' ');
});

const isMenuRounded = computed(() => {
  return preferences.navigation.styleType === 'rounded';
});

const logoCollapsed = computed(() => {
  if (isMobile.value && sidebarCollapsed.value) {
    return true;
  }
  if (isHeaderNav.value || isMixedNav.value || isHeaderSidebarNav.value) {
    return false;
  }
  return (
    sidebarCollapsed.value || isSideMixedNav.value || isHeaderMixedNav.value
  );
});

const showHeaderNav = computed(() => {
  return (
    !isMobile.value
    && (isHeaderNav.value || isMixedNav.value || isHeaderMixedNav.value)
  );
});

const {
  handleMenuSelect,
  handleMenuOpen,
  headerActive,
  headerMenus,
  sidebarActive,
  sidebarMenus,
  mixHeaderMenus,
  sidebarVisible,
} = useDashboardMixedMenu();

// Side multi-column menu
const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  isSidebarExtraVisible,
} = useDashboardExtraMenu(mixHeaderMenus);

const modelSidebarCollapse = computed({
  get: () => preferences.sidebar.isCollapsed,
  set: (value: boolean) => {
    updatePreferences({ sidebar: { isCollapsed: value } });
  },
});

const modelSidebarEnable = computed({
  get: () => sidebarVisible.value,
  set: (value: boolean) => {
    updatePreferences({ sidebar: { enable: value } });
  },
});

const modelSidebarExpandOnHover = computed({
  get: () => preferences.sidebar.expandOnHover,
  set: (value: boolean) => {
    updatePreferences({ sidebar: { expandOnHover: value } });
  },
});

const modelSidebarExtraCollapse = computed({
  get: () => preferences.sidebar.isExtraCollapse,
  set: (value: boolean) => {
    updatePreferences({ sidebar: { isExtraCollapse: value } });
  },
});

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.isHidden,
    },
  });
}

const { t } = useI18n();
const route = useRoute();

/**
 * Wrap menu, translate menu label
 * @param options
 * @param options.menus original menu data
 * @param options.deep whether to wrap deeply. For a two-column layout, only the first layer needs to be wrapped, because deeper data will be re-wrapped in the expanded menu
 */
function wrapperMenus(
  { menus, deep = true }:
  {
    menus: Array<PDashboardMenuRaw>;
    deep?: boolean;
  },
) {
  return deep
    ? mapTree({
        tree: menus,
        mapper: (item) => {
          return {
            ...clone(item),
            color: isRouteInTree(item, route.path) ? 'primary' : undefined,
            label: t(item.label),
          };
        },
      })
    : menus.map((item) => {
        return {
          ...clone(item),
          color: isRouteInTree(item, route.path) ? 'primary' : undefined,
          label: t(item.label),
        };
      });
}

function isRouteInTree(item: PDashboardMenuItem, routePath: string): boolean {
  if (item.children?.length) {
    return item.children.some((child) => isRouteInTree(child, routePath));
  }
  return routePath === item.to;
}
</script>

<template>
  <PDashboardLayout
    v-model:is-sidebar-extra-visible="isSidebarExtraVisible"
    v-model:is-sidebar-collapsed="modelSidebarCollapse"
    v-model:is-sidebar-enable="modelSidebarEnable"
    v-model:is-sidebar-expand-on-hover="modelSidebarExpandOnHover"
    v-model:is-sidebar-extra-collapse="modelSidebarExtraCollapse"
    :content-compact="preferences.app.contentCompact"
    :content-compact-width="preferences.app.contentCompactWidth"
    :content-padding="preferences.app.contentPadding"
    :content-padding-bottom="preferences.app.contentPaddingBottom"
    :content-padding-left="preferences.app.contentPaddingLeft"
    :content-padding-right="preferences.app.contentPaddingRight"
    :content-padding-top="preferences.app.contentPaddingTop"
    :footer-enable="preferences.footer.enable"
    :footer-fixed="preferences.footer.isFixed"
    :footer-height="preferences.footer.height"
    :header-height="preferences.header.height"
    :header-hidden="preferences.header.isHidden"
    :header-mode="preferences.header.mode"
    :header-theme="headerTheme"
    :header-toggle-sidebar-button="preferences.widget.showSidebarToggle"
    :header-visible="preferences.header.enable"
    :is-mobile="preferences.app.isMobile"
    :layout="layout"
    :show-sidebar-collapse-title="preferences.sidebar.showCollapsedTitle"
    :show-sidebar-collapsed-button="preferences.sidebar.showCollapsedButton"
    :is-sidebar-fixed-button="preferences.sidebar.showFixedButton"
    :sidebar-extra-collapsed-width="preferences.sidebar.extraCollapsedWidth"
    :sidebar-hidden="preferences.sidebar.isHidden"
    :sidebar-mixed-width="preferences.sidebar.mixedWidth"
    :sidebar-theme="sidebarTheme"
    :sidebar-width="preferences.sidebar.width"
    :side-collapse-width="preferences.sidebar.collapseWidth"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="preferences.tabbar.height"
    :z-index="preferences.app.zIndex"
    @side-mouse-leave="handleSideMouseLeave"
    @toggle-sidebar="toggleSidebar"
  >
    <template #logo>
      <CoreLogo />
    </template>

    <template #menu>
      <DashboardLayoutMenu
        :is-accordion="preferences.navigation.isAccordion"
        :is-collapsed="preferences.sidebar.isCollapsed"
        :show-title-when-collapsed="preferences.sidebar.showCollapsedTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus({ menus: sidebarMenus })"
        :is-rounded="isMenuRounded"
        :theme="sidebarTheme"
        mode="vertical"
        @open="handleMenuOpen"
        @select="handleMenuSelect"
      />
    </template>

    <template #content>
      <DashboardLayoutContent />
    </template>
  </PDashboardLayout>
</template>
