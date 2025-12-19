<script setup lang="ts">
import type { DashboardMenuUiRecord } from '../dashboard-menu-ui.types';

import { computed } from 'vue';
import DashboardMenuUiBadge from './dashboard-menu-ui-badge.vue';
import DashboardMenuUiMenuItem from './dashboard-menu-ui-menu-item.vue';
import DashboardMenuUiRootSubMenu from './dashboard-menu-ui-root-sub-menu.vue';
import DashboardMenuUiSubMenu from './dashboard-menu-ui-sub-menu.vue';

interface Props {
  menu: DashboardMenuUiRecord;
}

const props = withDefaults(defineProps<Props>(), {});

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
  <DashboardMenuUiMenuItem
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
  </DashboardMenuUiMenuItem>

  <DashboardMenuUiSubMenu
    v-else
    :key="`${menu.path}_sub`"
    :active-icon="menu.activeIcon"
    :icon="menu.icon"
    :path="menu.path"
  >
    <template #content>
      <DashboardMenuUiBadge
        :badge="menu.badge"
        :badge-type="menu.badgeType"
        :badge-variants="menu.badgeVariants"
        class="right-6"
      />
    </template>

    <template #title>
      <span>{{ menu.name }}</span>
    </template>

    <template
      v-for="childItem in menu.children || []"
      :key="childItem.path"
    >
      <DashboardMenuUiRootSubMenu :menu="childItem" />
    </template>
  </DashboardMenuUiSubMenu>
</template>
