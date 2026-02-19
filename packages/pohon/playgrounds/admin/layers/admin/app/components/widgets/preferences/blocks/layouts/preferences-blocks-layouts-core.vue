<script lang="ts" setup>
import type { PDashboardLayoutType } from 'pohon-ui/utils/dashboard';
import type { Component } from 'vue';
import { P_DASHBOARD_LAYOUT } from 'pohon-ui/utils/dashboard';
import {
  FullContent,
  HeaderMixedNav,
  HeaderNav,
  HeaderSidebarNav,
  MixedNav,
  SidebarMixedNav,
  SidebarNav,
} from '../../icons';

const modelValue = defineModel<PDashboardLayoutType>({
  default: P_DASHBOARD_LAYOUT.SIDEBAR_NAV,
});

const components: Record<PDashboardLayoutType, Component> = {
  [P_DASHBOARD_LAYOUT.FULL_CONTENT]: FullContent,
  [P_DASHBOARD_LAYOUT.HEADER_NAV]: HeaderNav,
  [P_DASHBOARD_LAYOUT.MIXED_NAV]: MixedNav,
  [P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV]: SidebarMixedNav,
  [P_DASHBOARD_LAYOUT.SIDEBAR_NAV]: SidebarNav,
  [P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV]: HeaderMixedNav,
  [P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV]: HeaderSidebarNav,
};

const { t } = useI18n();

const PRESET = computed<Array<{
  name: string;
  tip: string;
  type: PDashboardLayoutType;
}>>(() => [
  {
    name: t('preferences.vertical'),
    tip: t('preferences.verticalTip'),
    type: P_DASHBOARD_LAYOUT.SIDEBAR_NAV,
  },
  {
    name: t('preferences.twoColumn'),
    tip: t('preferences.twoColumnTip'),
    type: P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV,
  },
  {
    name: t('preferences.horizontal'),
    tip: t('preferences.horizontalTip'),
    type: P_DASHBOARD_LAYOUT.HEADER_NAV,
  },
  {
    name: t('preferences.headerSidebarNav'),
    tip: t('preferences.headerSidebarNavTip'),
    type: P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV,
  },
  {
    name: t('preferences.mixedMenu'),
    tip: t('preferences.mixedMenuTip'),
    type: P_DASHBOARD_LAYOUT.MIXED_NAV,
  },
  {
    name: t('preferences.headerTwoColumn'),
    tip: t('preferences.headerTwoColumnTip'),
    type: P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV,
  },
  {
    name: t('preferences.fullContent'),
    tip: t('preferences.fullContentTip'),
    type: P_DASHBOARD_LAYOUT.FULL_CONTENT,
  },
]);

function activeClass(theme: string): Array<string> {
  return theme === modelValue.value ? ['outline-box-active'] : [];
}
</script>

<template>
  <div class="flex flex-wrap gap-5 w-full">
    <template
      v-for="theme in PRESET"
      :key="theme.name"
    >
      <button
        class="flex flex-col w-[110px]"
        @click="modelValue = theme.type"
      >
        <div
          :class="activeClass(theme.type)"
          class="outline-box flex items-center justify-center"
        >
          <component :is="components[theme.type]" />
        </div>

        <div
          class="text-xs color-text-muted mt-2 text-center grid grid-cols-[1fr_min-content] items-center justify-center hover:color-text"
        >
          {{ theme.name }}

          <PTooltip
            v-if="theme.tip"
            :text="theme.tip"
          >
            <i class="i-lucide:circle-help size-4 cursor-help" />
          </PTooltip>
        </div>
      </button>
    </template>
  </div>
</template>
