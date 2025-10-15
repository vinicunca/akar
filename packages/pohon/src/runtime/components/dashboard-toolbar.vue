<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-toolbar';

type DashboardToolbar = ComponentConfig<typeof theme, AppConfig, 'dashboardToolbar'>;

export interface PDashboardToolbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: DashboardToolbar['slots'];
}

export interface PDashboardToolbarSlots {
  default: (props?: object) => any;
  left: (props?: object) => any;
  right: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = defineProps<PDashboardToolbarProps>();
defineSlots<PDashboardToolbarSlots>();

const appConfig = useAppConfig() as DashboardToolbar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardToolbar || {}),
  })(),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <slot>
      <div :class="pohon.left({ class: [props.pohon?.left] })">
        <slot name="left" />
      </div>

      <div :class="pohon.right({ class: [props.pohon?.right] })">
        <slot name="right" />
      </div>
    </slot>
  </APrimitive>
</template>
