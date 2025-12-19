<script setup lang="ts">
import type { DashboardMenuUiProps, DashboardMenuUiRecord } from '../dashboard-menu-ui.types';
import { useForwardProps } from 'akar';
import DashboardMenuUiRootSubMenu from './dashboard-menu-ui-root-sub-menu.vue';

defineOptions({ name: 'NgiburMenu' });

const props = withDefaults(
  defineProps<Props>(),
  {
    collapse: false,
  },
);

interface Props extends DashboardMenuUiProps {
  menus: Array<DashboardMenuUiRecord>;
}

const forward = useForwardProps(props);
</script>

<template>
  <NgiburMenuRoot v-bind="forward">
    <template
      v-for="menu in menus"
      :key="menu.path"
    >
      <DashboardMenuUiRootSubMenu :menu="menu" />
    </template>
  </NgiburMenuRoot>
</template>
