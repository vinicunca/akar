<script lang="ts" setup>
import type {
  DashboardMenuMenuItemPayload,
  DashboardMenuProps,
  DashboardMenuRecord,
} from '#layers/dashboard-menu/lib';
import { PDashboardMenu } from '#components';
import { DashboardMenu } from '#layers/dashboard-menu/lib';

interface Props extends DashboardMenuProps {
  menus?: Array<DashboardMenuRecord>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    accordion: true,
    menus: () => [],
  },
);

const emits = defineEmits<{
  open: [DashboardMenuMenuItemPayload];
  select: [{
    key: string;
    mode: DashboardMenuProps['mode'];
  }];
}>();

function handleMenuSelect(item: DashboardMenuMenuItemPayload) {
  emits('select', {
    key: item.path,
    mode: props.mode,
  });
}

function handleMenuOpen(item: DashboardMenuMenuItemPayload) {
  emits('open', item);
}
</script>

<template>
  <PDashboardMenu
    :accordion="accordion"
    :collapsed="collapsed"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    default-open
    :navigation="menus"
    :mode="mode"
    :rounded="rounded"
    scroll-to-active
    :theme="theme"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
