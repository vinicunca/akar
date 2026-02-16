<script setup lang="ts">
import type { PDashboardMenuItem } from 'pohon-ui';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { preferencesManager } from '#layers/admin/app/preferences';
import { clone, isIncludedIn } from '@vinicunca/perkakas';
import { P_DASHBOARD_LAYOUT } from 'pohon-ui/utils/dashboard';
import { LayoutContent, LayoutContentSpinner } from './content';
import {
  LayoutExtraMenu,
  LayoutMenu,
  LayoutMixedMenu,
} from './menu';
import { LayoutTabbar } from './tabbar';
import { Breadcrumb, PreferencesButton } from './widgets';

const emit = defineEmits<{
  clearPreferencesAndLogout: [];
  clickLogo: [];
}>();

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
} = useAdminPreferences();

const accessStore = useAccessStore();
const preferences = preferencesManager.getPreferences();

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
} = useAdminMixedMenu();

const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  isSidebarExtraVisible,
} = useAdminExtraMenu(mixHeaderMenus);

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
    menus: Array<PDashboardMenuItem>;
    deep?: boolean;
  },
) {
  return deep
    ? mapTree({
        tree: menus,
        mapper: (item) => {
          return { ...clone(item), label: t(item.label) };
        },
      })
    : menus.map((item) => {
        return { ...clone(item), label: t(item.label) };
      });
}

function toggleSidebar() {
  preferencesManager.updatePreferences({
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
      preferencesManager.updatePreferences({
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
    preferencesManager.updatePreferences({
      sidebar: {
        collapsed: value,
      },
    });
  },
});

const sidebarEnableModel = computed({
  get: () => sidebarVisible.value,
  set: (value: boolean) => {
    preferencesManager.updatePreferences({
      sidebar: {
        enable: value,
      },
    });
  },
});

const sidebarExpandChildrenOnHover = computed({
  get: () => preferences.sidebar.expandChildrenOnHover,
  set: (value: boolean) => {
    preferencesManager.updatePreferences({
      sidebar: {
        expandChildrenOnHover: value,
      },
    });
  },
});

const sidebarExtraCollapsed = computed({
  get: () => preferences.sidebar.extraCollapsed,
  set: (value: boolean) => {
    preferencesManager.updatePreferences({
      sidebar: {
        extraCollapsed: value,
      },
    });
  },
});
</script>

<template>
  <PDashboardLayout
    v-model:is-sidebar-extra-visible="isSidebarExtraVisible"
    v-model:sidebar-collapsed="sidebarCollapsedModel"
    v-model:sidebar-enabled="sidebarEnableModel"
    v-model:sidebar-expand-children-on-hover="sidebarExpandChildrenOnHover"
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
      <AdminLayoutHeader
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
          <!-- <LayoutMenu
            :default-active="headerActive"
            :menus="wrapperMenus({ menus: headerMenus })"
            :theme="headerTheme"
            class="w-full"
            mode="horizontal"
            @select="handleMenuSelect"
          /> -->
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
      </AdminLayoutHeader>
    </template>

    <!-- Side menu area -->
    <template #menu>
      <LayoutMenu
        :accordion="preferences.navigation.isAccordion"
        :collapsed="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus({ menus: sidebarMenus })"
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
      <AdminLayoutFooter>
        <AdminLayoutCopyright
          v-if="preferences.copyright.enable"
          v-bind="preferences.copyright"
        />
      </AdminLayoutFooter>
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
        <PreferencesButton
          class="bottom-20 right-0 fixed z-100"
          @clear-preferences-and-logout="clearPreferencesAndLogout"
        />
      </template>

      <!-- <PBackToTop /> -->
    </template>
  </PDashboardLayout>
</template>
