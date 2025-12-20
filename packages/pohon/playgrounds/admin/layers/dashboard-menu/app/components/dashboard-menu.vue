<script setup lang="ts">
import type { DashboardMenuProps, DashboardMenuRecord } from '../dashboard-menu.types';
import { useForwardProps } from 'akar';
import DashboardMenuRootSubMenu from './dashboard-menu-root-sub-menu.vue';
import DashboardMenuRoot from './dashboard-menu-root.vue';

defineOptions({ name: 'DashboardMenu' });

const props = withDefaults(
  defineProps<Props>(),
  {
    collapse: false,
  },
);

interface Props extends DashboardMenuProps {
  menus: Array<DashboardMenuRecord>;
}

const forward = useForwardProps(props);
</script>

<template>
  <DashboardMenuRoot v-bind="forward">
    <template
      v-for="menu in menus"
      :key="menu.path"
    >
      <DashboardMenuRootSubMenu :menu="menu" />
    </template>
  </DashboardMenuRoot>
</template>
