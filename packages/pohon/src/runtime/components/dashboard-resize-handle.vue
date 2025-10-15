<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-resize-handle';

type DashboardResizeHandle = ComponentConfig<typeof theme, AppConfig, 'dashboardResizeHandle'>;

export interface DashboardResizeHandleProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
}

export interface DashboardResizeHandleSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = defineProps<DashboardResizeHandleProps>();
defineSlots<DashboardResizeHandleSlots>();

const appConfig = useAppConfig() as DashboardResizeHandle['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardResizeHandle || {}),
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    role="separator"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </APrimitive>
</template>
