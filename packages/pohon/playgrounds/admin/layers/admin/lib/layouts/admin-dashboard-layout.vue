<script setup lang="ts">
import type { DashboardMenuRecord } from '#layers/dashboard-menu/lib';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { PBackToTop, PLogo } from '#components';
import { useI18n } from '#imports';
import { P_DASHBOARD_LAYOUT, PohonDashboardLayout } from '#layers/dashboard-layout/lib';
import { preferences, updatePreferences, usePreferences } from '#layers/dashboard-storage/lib';
import { clone, isIncludedIn } from '@vinicunca/perkakas';
import { computed, onMounted, useSlots, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAccessStore } from '../stores/stores.access';
import { mapTree } from '../utils/utils.tree';
import { LayoutContent, LayoutContentSpinner } from './content';
import LayoutCopyright from './layout-copyright.vue';
import LayoutFooter from './layout-footer.vue';
import LayoutHeader from './layout-header.vue';
import {
  LayoutExtraMenu,
  LayoutMenu,
  LayoutMixedMenu,
  useDashboardExtraMenu,
  useDashboardMixedMenu,
} from './menu';
import { LayoutTabbar } from './tabbar';
import { Breadcrumb, PreferencesPanel } from './widgets';

const emit = defineEmits<{ clearPreferencesAndLogout: []; clickLogo: [] }>();

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

const accessStore = useAccessStore();

const sidebarTheme = computed(() => {
  const dark = isDark.value || preferences.theme.enableSemiDarkSidebar;
  return dark ? 'dark' : 'light';
});

const headerTheme = computed(() => {
  const dark = isDark.value || preferences.theme.enableSemiDarkHeader;
  return dark ? 'dark' : 'light';
});

const logoClass = computed(() => {
  const { collapsedShowTitle } = preferences.sidebar;
  const classes: Array<string> = [];

  if (collapsedShowTitle && sidebarCollapsed.value && !isMixedNav.value) {
    classes.push('mx-auto');
  }

  if (isSideMixedNav.value) {
    classes.push('flex items-center justify-center');
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

const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  isSidebarExtraVisible,
} = useDashboardExtraMenu(mixHeaderMenus);

const { t } = useI18n();

/**
 * Wrap menu, translate menu name
 * @param options
 * @param options.menus original menu data
 * @param options.deep whether to wrap deeply. For a two-column layout, only the first layer needs to be wrapped, because deeper data will be re-wrapped in the expanded menu
 */
function wrapperMenus(
  { menus, deep = true }:
  {
    menus: Array<DashboardMenuRecord>;
    deep?: boolean;
  },
) {
  return deep
    ? mapTree({
        tree: menus,
        mapper: (item) => {
          return { ...clone(item), title: t(item.name) };
        },
      })
    : menus.map((item) => {
        return { ...clone(item), title: t(item.name) };
      });
}

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.hidden,
    },
  });
}

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}

function clickLogo() {
  emit('clickLogo');
}

function autoCollapseMenuByRouteMeta(route: RouteLocationNormalizedLoaded) {
  // Only works in two-column mode
  if (
    isIncludedIn(
      preferences.app.layout,
      [P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV, P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV],
    )
    && route.meta
    && route.meta.hideInMenu
  ) {
    isSidebarExtraVisible.value = false;
  }
}

const route = useRoute();

onMounted(() => {
  autoCollapseMenuByRouteMeta(route);
});

watch(
  () => preferences.app.layout,
  async (val) => {
    if (val === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV && preferences.sidebar.hidden) {
      updatePreferences({
        sidebar: {
          hidden: false,
        },
      });
    }
  },
);

const slots = useSlots();
const headerSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.startsWith('header-'));
});

const sidebarCollapsedModel = computed({
  get: () => preferences.sidebar.collapsed,
  set: (value: boolean) => {
    updatePreferences({
      sidebar: {
        collapsed: value,
      },
    });
  },
});

const sidebarEnableModel = computed({
  get: () => sidebarVisible.value,
  set: (value: boolean) => {
    updatePreferences({
      sidebar: {
        enable: value,
      },
    });
  },
});

const sidebarExpandOnHover = computed({
  get: () => preferences.sidebar.expandOnHover,
  set: (value: boolean) => {
    updatePreferences({
      sidebar: {
        expandOnHover: value,
      },
    });
  },
});

const sidebarExtraCollapsed = computed({
  get: () => preferences.sidebar.extraCollapsed,
  set: (value: boolean) => {
    updatePreferences({
      sidebar: {
        extraCollapsed: value,
      },
    });
  },
});
</script>

<template>
  <PohonDashboardLayout
    v-model:is-sidebar-extra-visible="isSidebarExtraVisible"
    v-model:sidebar-collapsed="sidebarCollapsedModel"
    v-model:sidebar-enabled="sidebarEnableModel"
    v-model:sidebar-expand-on-hover="sidebarExpandOnHover"
    v-model:sidebar-extra-collapsed="sidebarExtraCollapsed"
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
    :header-hidden="preferences.header.hidden"
    :header-mode="preferences.header.mode"
    :header-theme="headerTheme"
    :show-header-toggle-sidebar-button="preferences.widget.showSidebarToggle"
    :show-header="preferences.header.enable"
    :is-mobile="preferences.app.isMobile"
    :layout="layout"
    :sidebar-collapsed-show-title="preferences.sidebar.collapsedShowTitle"
    :sidebar-show-collapsed-button="preferences.sidebar.showCollapsedButton"
    :sidebar-show-fixed-button="preferences.sidebar.showFixedButton"
    :sidebar-extra-collapsed-width="preferences.sidebar.extraCollapsedWidth"
    :sidebar-hidden="preferences.sidebar.hidden"
    :sidebar-mixed-width="preferences.sidebar.mixedWidth"
    :sidebar-theme="sidebarTheme"
    :sidebar-width="preferences.sidebar.width"
    :sidebar-collapsed-width="preferences.sidebar.collapsedWidth"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="preferences.tabbar.height"
    :z-index="preferences.app.zIndex"
    @side-mouse-leave="handleSideMouseLeave"
    @toggle-sidebar="toggleSidebar"
  >
    <!-- logo -->
    <template #logo>
      <PLogo
        v-if="preferences.logo.enable"
        :fit="preferences.logo.fit"
        :class="logoClass"
        :collapsed="logoCollapsed"
        :src="preferences.logo.source"
        :src-dark="preferences.logo.sourceDark"
        :text="preferences.app.name"
        :theme="showHeaderNav ? headerTheme : theme"
        @click="clickLogo"
      >
        <template
          v-if="$slots['logo-text']"
          #text
        >
          <slot name="logo-text" />
        </template>
      </PLogo>
    </template>

    <!-- Header area -->
    <template #header>
      <LayoutHeader
        :theme="theme"
        @clear-preferences-and-logout="clearPreferencesAndLogout"
      >
        <template
          v-if="!showHeaderNav && preferences.breadcrumb.enable"
          #breadcrumb
        >
          <Breadcrumb
            :hide-when-only-one="preferences.breadcrumb.hideOnlyOne"
            :show-home="preferences.breadcrumb.showHome"
            :show-icon="preferences.breadcrumb.showIcon"
            :type="preferences.breadcrumb.styleType"
          />
        </template>

        <template
          v-if="showHeaderNav"
          #menu
        >
          <LayoutMenu
            :default-active="headerActive"
            :menus="wrapperMenus({ menus: headerMenus })"
            :rounded="isMenuRounded"
            :theme="headerTheme"
            class="w-full"
            mode="horizontal"
            @select="handleMenuSelect"
          />
        </template>

        <template #user-dropdown>
          <slot name="user-dropdown" />
        </template>

        <template #notification>
          <slot name="notification" />
        </template>

        <template #timezone>
          <slot name="timezone" />
        </template>

        <template
          v-for="item in headerSlots"
          #[item]
        >
          <slot :name="item" />
        </template>
      </LayoutHeader>
    </template>

    <!-- Side menu area -->
    <template #menu>
      <LayoutMenu
        :accordion="preferences.navigation.isAccordion"
        :collapse="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus({ menus: sidebarMenus })"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        mode="vertical"
        @open="handleMenuOpen"
        @select="handleMenuSelect"
      />
    </template>

    <template #mixed-menu>
      <LayoutMixedMenu
        :active-path="extraActiveMenu"
        :menus="wrapperMenus({ menus: mixHeaderMenus, deep: false })"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        @default-select="handleDefaultSelect"
        @enter="handleMenuMouseEnter"
        @select="handleMixedMenuSelect"
      />
    </template>

    <!-- Side extra area -->
    <template #side-extra>
      <LayoutExtraMenu
        :accordion="preferences.navigation.isAccordion"
        :collapse="preferences.sidebar.extraCollapsed"
        :menus="wrapperMenus({ menus: extraMenus })"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
      />
    </template>

    <template #side-extra-title>
      <PLogo
        v-if="preferences.logo.enable"
        :fit="preferences.logo.fit"
        :src="preferences.logo.source"
        :src-dark="preferences.logo.sourceDark"
        :text="preferences.app.name"
        :theme="theme"
      >
        <template
          v-if="$slots['logo-text']"
          #text
        >
          <slot name="logo-text" />
        </template>
      </PLogo>
    </template>

    <template #tabbar>
      <LayoutTabbar
        v-if="preferences.tabbar.enable"
        :show-icon="preferences.tabbar.showIcon"
        :theme="theme"
      />
    </template>

    <!-- Content area -->
    <template #content>
      <LayoutContent />
    </template>

    <template
      v-if="preferences.transition.enableLoading"
      #content-overlay
    >
      <LayoutContentSpinner />
    </template>

    <!-- Footer -->
    <template
      v-if="preferences.footer.enable"
      #footer
    >
      <LayoutFooter>
        <LayoutCopyright
          v-if="preferences.copyright.enable"
          v-bind="preferences.copyright"
        />
      </LayoutFooter>
    </template>

    <template #extra>
      <slot name="extra" />

      <Transition
        v-if="preferences.widget.enableLockScreen"
        name="slide-up"
      >
        <slot
          v-if="accessStore.isLockScreen"
          name="lock-screen"
        />
      </Transition>

      <template v-if="preferencesButtonPosition.fixed">
        <PreferencesPanel
          class="bottom-20 right-0 fixed z-100"
          @clear-preferences-and-logout="clearPreferencesAndLogout"
        />
      </template>

      <PBackToTop />
    </template>
  </PohonDashboardLayout>
</template>
