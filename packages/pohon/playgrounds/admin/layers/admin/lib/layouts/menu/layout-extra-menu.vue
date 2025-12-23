<script lang="ts" setup>
import type {
  DashboardMenuProps,
  DashboardMenuRecord,
} from '#layers/dashboard-menu/lib';
import { DashboardMenu } from '#layers/dashboard-menu/lib';
import { useRoute } from 'vue-router';
import { useDashboardNavigation } from './use-dashboard-navigation';

interface Props extends DashboardMenuProps {
  collapse?: boolean;
  menus?: Array<DashboardMenuRecord>;
}

withDefaults(
  defineProps<Props>(),
  {
    accordion: true,
    menus: () => [],
  },
);

const route = useRoute();
const { navigation } = useDashboardNavigation();

async function handleSelect(key: string) {
  await navigation(key);
}
</script>

<template>
  <DashboardMenu
    :accordion="accordion"
    :collapse="collapse"
    :default-active="route.meta?.activePath || route.path"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    mode="vertical"
    @select="handleSelect"
  />
</template>
