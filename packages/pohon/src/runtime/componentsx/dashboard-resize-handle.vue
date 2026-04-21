<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
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
  pohon?: { base?: any };
}

export interface DashboardResizeHandleSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<DashboardResizeHandleProps>();
defineSlots<DashboardResizeHandleSlots>();

const appConfig = useAppConfig() as DashboardResizeHandle['AppConfig'];
const pohonProp = useComponentPohon('dashboardResizeHandle', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardResizeHandle || {}) }));
</script>

<template>
  <Primitive
    :as="as"
    role="separator"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
