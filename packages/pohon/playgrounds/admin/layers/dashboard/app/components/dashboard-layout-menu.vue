<script lang="ts" setup>
import type { PDashboardMenuItemPayload, PDashboardMenuProps, PDashboardMenuRaw } from 'pohon-ui';
import { PDashboardMenu } from '#components';

interface Props extends PDashboardMenuProps {
  menus?: Array<PDashboardMenuRaw>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    accordion: true,
    menus: () => [],
  },
);
const emits = defineEmits<{
  open: [PDashboardMenuItemPayload];
  select: [{
    key: string;
    mode: PDashboardMenuProps['mode'];
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
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :items="menus"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
