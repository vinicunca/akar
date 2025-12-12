<script setup lang="ts">
import type { PDashboardMenuRaw } from '../types';

import { computed } from 'vue';
import PDashboardMenuSubMenu from './dashboard-menu-sub-menu.vue';
import PDashboardSubMenuRoot from './dashboard-sub-menu-root.vue';

interface Props {
  menu: PDashboardMenuRaw;
}

const props = withDefaults(
  defineProps<Props>(),
  {},
);

/**
 * Determine whether there is a child node and dynamically render menu-item/sub-menu-item
 */
const hasChildren = computed(() => {
  const { menu } = props;
  return (
    Reflect.has(menu, 'children') && !!menu.children && menu.children.length > 0
  );
});
</script>

<template>
  <MenuItem
    v-if="!hasChildren"
    :key="menu.path"
    :active-icon="menu.activeIcon"
    :badge="menu.badge"
    :badge-type="menu.badgeType"
    :badge-variants="menu.badgeVariants"
    :icon="menu.icon"
    :path="menu.path"
  >
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
  </MenuItem>

  <PDashboardMenuSubMenu
    v-else
    :key="`${menu.path}_sub`"
    :active-icon="menu.activeIcon"
    :icon="menu.icon"
    :path="menu.path"
  >
    <template #content>
      <!-- <MenuBadge
        :badge="menu.badge"
        :badge-type="menu.badgeType"
        :badge-variants="menu.badgeVariants"
        class="right-6"
      /> -->
    </template>

    <template #title>
      <span>{{ menu.name }}</span>
    </template>

    <template
      v-for="childItem in menu.children || []"
      :key="childItem.path"
    >
      <PDashboardSubMenuRoot :menu="childItem" />
    </template>
  </PDashboardMenuSubMenu>
</template>
