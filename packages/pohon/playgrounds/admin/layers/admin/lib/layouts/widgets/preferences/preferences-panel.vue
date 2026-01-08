<script lang="ts" setup>
import type { ContentCompactType, LayoutType, PreferencesButtonPositionType } from '#layers/admin/lib';
import { useI18n } from '#imports';
import { usePreferences } from '#layers/dashboard-storage/lib';
import {
  PreferencesBlocksLayoutsContent,
  PreferencesBlocksLayoutsCore,
  PreferencesBlocksLayoutsSidebar,
} from './blocks';
import PreferenceBlock from './preference-block.vue';

const { t } = useI18n();

// App
const appLayout = defineModel<LayoutType>('appLayout');
const appContentCompact = defineModel<ContentCompactType>('appContentCompact');
const appLocale = defineModel<SupportedLanguagesType>('appLocale');
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
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover');
const sidebarWidth = defineModel<number>('sidebarWidth');
const sidebarShowCollapsedButton = defineModel<boolean>('sidebarShowCollapsedButton');
const sidebarShowFixedButton = defineModel<boolean>('sidebarShowFixedButton');

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
} = usePreferences();
</script>

<template>
  <div>
    <PreferenceBlock :title="t('preferences.layout')">
      <PreferencesBlocksLayoutsCore v-model="appLayout" />
    </PreferenceBlock>

    <PreferenceBlock :title="t('preferences.content')">
      <PreferencesBlocksLayoutsContent v-model="appContentCompact" />
    </PreferenceBlock>

    <PreferenceBlock :title="t('preferences.sidebar.title')">
      <PreferencesBlocksLayoutsSidebar
        v-model:sidebar-auto-activate-child="sidebarAutoActivateChild"
        v-model:sidebar-collapsed="sidebarCollapsed"
        v-model:sidebar-collapsed-show-title="sidebarCollapsedShowTitle"
        v-model:sidebar-enable="sidebarEnable"
        v-model:sidebar-expand-on-hover="sidebarExpandOnHover"
        v-model:sidebar-width="sidebarWidth"
        v-model:sidebar-show-collapsed-button="sidebarShowCollapsedButton"
        v-model:sidebar-fixed-button="sidebarShowFixedButton"
        :current-layout="appLayout"
        :disabled="!isSideMode"
      />
    </PreferenceBlock>
  </div>
</template>
