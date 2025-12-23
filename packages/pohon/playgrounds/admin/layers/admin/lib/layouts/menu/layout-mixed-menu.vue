<script lang="ts" setup>
import type { DashboardMenuNormalMenuProps, DashboardMenuRecord } from '#layers/dashboard-menu/lib';
import { DashboardMenuNormalMenu } from '#layers/dashboard-menu/lib';

import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { findMenuByPath } from '../../utils/utils.find-menu-by-path';

const props = defineProps<DashboardMenuNormalMenuProps>();

const emits = defineEmits<{
  defaultSelect: [{ menu: DashboardMenuRecord; rootMenu?: DashboardMenuRecord }];
  enter: [DashboardMenuRecord];
  select: [DashboardMenuRecord];
}>();

const route = useRoute();

onBeforeMount(() => {
  const menu = findMenuByPath({
    list: props.menus || [],
    path: route.path,
  });

  if (menu) {
    const rootMenu = (props.menus || []).find(
      (item) => item.path === menu.parents?.[0],
    );

    emits('defaultSelect', { menu, rootMenu });
  }
});
</script>

<template>
  <DashboardMenuNormalMenu
    :active-path="activePath"
    :collapse="collapse"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    @enter="(menu) => emits('enter', menu)"
    @select="(menu) => emits('select', menu)"
  />
</template>
