<script lang="ts" setup>
import type { Component } from 'vue';
import type { LayoutType } from '~~/layers/admin/app/types/type.dashboard';
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

const modelValue = defineModel<LayoutType>({
  default: P_DASHBOARD_LAYOUT.SIDEBAR_NAV,
});

const components: Record<LayoutType, Component> = {
  'full-content': FullContent,
  'header-nav': HeaderNav,
  'mixed-nav': MixedNav,
  'sidebar-mixed-nav': SidebarMixedNav,
  'sidebar-nav': SidebarNav,
  'header-mixed-nav': HeaderMixedNav,
  'header-sidebar-nav': HeaderSidebarNav,
};

const { t } = useI18n();

const PRESET = computed<Array<{
  name: string;
  tip: string;
  type: LayoutType;
}>>(() => [
  {
    name: t('preferences.vertical'),
    tip: t('preferences.verticalTip'),
    type: 'sidebar-nav',
  },
  {
    name: t('preferences.twoColumn'),
    tip: t('preferences.twoColumnTip'),
    type: 'sidebar-mixed-nav',
  },
  {
    name: t('preferences.horizontal'),
    tip: t('preferences.horizontalTip'),
    type: 'header-nav',
  },
  {
    name: t('preferences.headerSidebarNav'),
    tip: t('preferences.headerSidebarNavTip'),
    type: 'header-sidebar-nav',
  },
  {
    name: t('preferences.mixedMenu'),
    tip: t('preferences.mixedMenuTip'),
    type: 'mixed-nav',
  },
  {
    name: t('preferences.headerTwoColumn'),
    tip: t('preferences.headerTwoColumnTip'),
    type: 'header-mixed-nav',
  },
  {
    name: t('preferences.fullContent'),
    tip: t('preferences.fullContentTip'),
    type: 'full-content',
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
