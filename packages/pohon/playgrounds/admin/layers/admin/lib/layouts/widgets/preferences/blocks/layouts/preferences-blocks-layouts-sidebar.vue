<script lang="ts" setup>
import type { LayoutType } from '#layers/admin/lib';
import { useI18n } from '#imports';
import PreferencesBlocksSwitch from '../preferences-blocks-switch.vue';

const props = defineProps<{
  currentLayout?: LayoutType;
  disabled: boolean;
}>();

const { t } = useI18n();

const sidebarAutoActivateChild = defineModel<boolean>('sidebarAutoActivateChild');
const sidebarCollapsed = defineModel<boolean>('sidebarCollapsed');
const sidebarCollapsedShowTitle = defineModel<boolean>('sidebarCollapsedShowTitle');
const sidebarEnable = defineModel<boolean>('sidebarEnable');
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover');
const sidebarWidth = defineModel<number>('sidebarWidth');
const sidebarShowCollapsedButton = defineModel<boolean>('sidebarShowCollapsedButton');
const sidebarShowFixedButton = defineModel<boolean>('sidebarShowFixedButton');
</script>

<template>
  <PreferencesBlocksSwitch
    v-model="sidebarEnable"
    :disabled="props.disabled"
  >
    {{ t('preferences.sidebar.visible') }}
  </PreferencesBlocksSwitch>
</template>
