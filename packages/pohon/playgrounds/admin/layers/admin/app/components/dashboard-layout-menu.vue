<script lang="ts" setup>
import type { PDashboardMenuItemPayload, PDashboardMenuRaw, PDashboardMenuRootProps } from 'pohon-ui';
import { PDashboardMenu } from '#components';

interface Props extends PDashboardMenuRootProps {
  menus?: Array<PDashboardMenuRaw>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isAccordion: false,
    menus: () => [],
  },
);
const emits = defineEmits<{
  open: [PDashboardMenuItemPayload];
  select: [{
    key: string;
    mode: PDashboardMenuRootProps['mode'];
  }];
}>();

function handleMenuSelect(item: PDashboardMenuItemPayload) {
  emits('select', {
    key: item.path,
    mode: props.mode,
  });
}

function handleMenuOpen(item: PDashboardMenuItemPayload) {
  emits('open', item);
}
</script>

<template>
  <PDashboardMenu
    :is-accordion="isAccordion"
    :is-collapsed="isCollapsed"
    :show-title-when-collapsed="showTitleWhenCollapsed"
    :default-active="defaultActive"
    :is-rounded="isRounded"
    :menus="menus"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
