<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-toolbar';

type DashboardToolbar = ComponentConfig<typeof theme, AppConfig, 'dashboardToolbar'>;

export interface DashboardToolbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: DashboardToolbar['slots'];
}

export interface DashboardToolbarSlots {
  default?: (props?: {}) => Array<VNode>;
  left?: (props?: {}) => Array<VNode>;
  right?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<DashboardToolbarProps>();
defineSlots<DashboardToolbarSlots>();

const appConfig = useAppConfig() as DashboardToolbar['AppConfig'];
const pohonProp = useComponentPohon('dashboardToolbar', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardToolbar || {}) })());
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot>
      <div
        data-slot="left"
        :class="pohon.left({ class: [pohonProp?.left] })"
      >
        <slot name="left" />
      </div>

      <div
        data-slot="right"
        :class="pohon.right({ class: [pohonProp?.right] })"
      >
        <slot name="right" />
      </div>
    </slot>
  </Primitive>
</template>
