<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseResizableProps } from '../composables/use-resizable';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-group';

type DashboardGroup = ComponentConfig<typeof theme, AppConfig, 'dashboardGroup'>;

export interface PDashboardGroupProps extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'persistent' | 'unit'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
}

export interface PDashboardGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig, useNuxtApp } from '#imports';
import { APrimitive } from 'akar';
import { computed, ref } from 'vue';
import { provideDashboardContext } from '../utils/dashboard';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<PDashboardGroupProps>(), {
  storage: 'cookie',
  storageKey: 'dashboard',
  persistent: true,
  unit: '%',
});
defineSlots<PDashboardGroupSlots>();

const nuxtApp = useNuxtApp();
const appConfig = useAppConfig() as DashboardGroup['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardGroup || {}),
  }),
);

const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);

provideDashboardContext({
  storage: props.storage,
  storageKey: props.storageKey,
  persistent: props.persistent,
  unit: props.unit,
  sidebarOpen,
  toggleSidebar: () => {
    nuxtApp.hooks.callHook('dashboard:sidebar:toggle');
  },
  sidebarCollapsed,
  collapseSidebar: (collapsed: boolean) => {
    nuxtApp.hooks.callHook('dashboard:sidebar:collapse', collapsed);
  },
  toggleSearch: () => {
    nuxtApp.hooks.callHook('dashboard:search:toggle');
  },
});
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </APrimitive>
</template>
