<script lang="ts" setup>
import type { PDashboardLayoutType } from 'pohon-ui/utils/dashboard';
import PreferencesBlocksSwitch from '../preferences-blocks-switch.vue';

const props = defineProps<{
  currentLayout?: PDashboardLayoutType;
  disabled: boolean;
}>();

const { t } = useI18n();

const sidebarAutoActivateChild = defineModel<boolean>('sidebarAutoActivateChild');
const sidebarCollapsed = defineModel<boolean>('sidebarCollapsed');
const sidebarCollapsedShowTitle = defineModel<boolean>('sidebarCollapsedShowTitle');
const sidebarEnable = defineModel<boolean>('sidebarEnable');
const sidebarExpandChildrenOnHover = defineModel<boolean>('sidebarExpandChildrenOnHover');
const sidebarWidth = defineModel<number>('sidebarWidth');
const sidebarShowCollapsedButton = defineModel<boolean>('sidebarShowCollapsedButton');
const sidebarShowFixedButton = defineModel<boolean>('sidebarShowFixedButton');
</script>

<template>
  <div class="gap-1 grid">
    <PreferencesBlocksSwitch
      v-model="sidebarEnable"
      :disabled="props.disabled"
    >
      {{ t('preferences.sidebar.visible') }}
    </PreferencesBlocksSwitch>

    <PreferencesBlocksSwitch
      v-model="sidebarCollapsed"
      :disabled="!sidebarEnable || props.disabled"
    >
      {{ t('preferences.sidebar.collapsed') }}
    </PreferencesBlocksSwitch>

    <PreferencesBlocksSwitch
      v-model="sidebarExpandChildrenOnHover"
      :disabled="!sidebarEnable || props.disabled || !sidebarCollapsed"
      :tip="$t('preferences.sidebar.expandChildrenOnHoverTip')"
    >
      {{ t('preferences.sidebar.expandChildrenOnHover') }}
    </PreferencesBlocksSwitch>

    <PreferencesBlocksSwitch
      v-model="sidebarCollapsedShowTitle"
      :disabled="!sidebarEnable || props.disabled"
    >
      {{ t('preferences.sidebar.collapsedShowTitle') }}
    </PreferencesBlocksSwitch>

    <PreferencesBlocksSwitch
      v-model="sidebarAutoActivateChild"
      :disabled="!sidebarEnable || props.disabled"
      :tip="$t('preferences.sidebar.autoActivateChildTip')"
    >
      {{ t('preferences.sidebar.autoActivateChild') }}
    </PreferencesBlocksSwitch>
  </div>
</template>
