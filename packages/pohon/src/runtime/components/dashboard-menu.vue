<script setup lang="ts">
import type { PDashboardMenuProps, PDashboardMenuRaw } from '../types/dashboard-menu';
import { useForwardProps } from 'akar';

import PDashboardMenuRoot from './dashboard-menu-root.vue';
import PDashboardSubMenuRoot from './dashboard-menu-sub-menu-root.vue';

interface Props extends PDashboardMenuProps {
  menus: Array<PDashboardMenuRaw>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isCollapsed: false,
  },
);

const forwardProps = useForwardProps(props);
</script>

<template>
  <PDashboardMenuRoot v-bind="forwardProps">
    <template
      v-for="menu in menus"
      :key="menu.path"
    >
      <PDashboardSubMenuRoot :menu="menu" />
    </template>
  </PDashboardMenuRoot>
</template>
