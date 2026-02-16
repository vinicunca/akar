<script lang="ts" setup>
import type { ContentCompactType, LayoutType, PreferencesButtonPositionType } from '~~/layers/admin/app/types/type.admin-layout';
import {
  PreferencesBlocksLayoutsContent,
  PreferencesBlocksLayoutsCore,
  PreferencesBlocksLayoutsNavigation,
  PreferencesBlocksLayoutsSidebar,
} from './blocks';
import PreferenceBlock from './preference-block.vue';

const { t } = useI18n();

// App
const appLayout = defineModel<LayoutType>('appLayout');
const appContentCompact = defineModel<ContentCompactType>('appContentCompact');
// const appLocale = defineModel<SupportedLanguagesType>('appLocale');
const appDynamicTitle = defineModel<boolean>('appDynamicTitle');
const appColorGrayMode = defineModel<boolean>('appColorGrayMode');
const appColorWeakMode = defineModel<boolean>('appColorWeakMode');
const appWatermark = defineModel<boolean>('appWatermark');
const appWatermarkContent = defineModel<string>('appWatermarkContent');
const appEnableCheckUpdates = defineModel<boolean>('appEnableCheckUpdates');
const appEnableStickyPreferencesNavigationBar = defineModel<boolean>('appEnableStickyPreferencesNavigationBar');
const appPreferencesButtonPosition = defineModel<PreferencesButtonPositionType>('appPreferencesButtonPosition');

// Sidebar
const sidebarAutoActivateChild = defineModel<boolean>('sidebarAutoActivateChild');
const sidebarCollapsed = defineModel<boolean>('sidebarCollapsed');
const sidebarCollapsedShowTitle = defineModel<boolean>('sidebarCollapsedShowTitle');
const sidebarEnable = defineModel<boolean>('sidebarEnable');
const sidebarExpandChildrenOnHover = defineModel<boolean>('sidebarExpandChildrenOnHover');
const sidebarWidth = defineModel<number>('sidebarWidth');
const sidebarShowCollapsedButton = defineModel<boolean>('sidebarShowCollapsedButton');
const sidebarShowFixedButton = defineModel<boolean>('sidebarShowFixedButton');

// Navigation
const navigationIsSplit = defineModel<boolean>('navigationIsSplit');
const navigationIsAccordion = defineModel<boolean>('navigationIsAccordion');

const {
  diffPreference,
  isDark,
  isFullContent,
  isHeaderNav,
  isHeaderSidebarNav,
  isMixedNav,
  isSideMixedNav,
  isSideMode,
  isSideNav,
} = useAdminPreferences();
</script>

<template>
  <div>
    <PreferenceBlock :title="t('preferences.layout')">
      <PreferencesBlocksLayoutsCore v-model="appLayout" />
    </PreferenceBlock>

    <PreferenceBlock :title="t('preferences.content')">
      <PreferencesBlocksLayoutsContent v-model="appContentCompact" />
    </PreferenceBlock>

    <PreferenceBlock
      :title="t('preferences.sidebar.title')"
    >
      <PreferencesBlocksLayoutsSidebar
        v-model:sidebar-auto-activate-child="sidebarAutoActivateChild"
        v-model:sidebar-collapsed="sidebarCollapsed"
        v-model:sidebar-collapsed-show-title="sidebarCollapsedShowTitle"
        v-model:sidebar-enable="sidebarEnable"
        v-model:sidebar-expand-children-on-hover="sidebarExpandChildrenOnHover"
        v-model:sidebar-width="sidebarWidth"
        v-model:sidebar-show-collapsed-button="sidebarShowCollapsedButton"
        v-model:sidebar-show-fixed-button="sidebarShowFixedButton"
        :current-layout="appLayout"
        :disabled="!isSideMode"
      />

      <PreferenceBlock :title="$t('preferences.navigationMenu.title')">
        <PreferencesBlocksLayoutsNavigation
          v-model:navigation-is-accordion="navigationIsAccordion"
          v-model:navigation-is-split="navigationIsSplit"
          :disabled="isFullContent"
          :disabled-navigation-split="!isMixedNav"
        />
      </PreferenceBlock>
    </PreferenceBlock>
  </div>
</template>
