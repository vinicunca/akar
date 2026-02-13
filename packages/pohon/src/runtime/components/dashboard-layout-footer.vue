<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout-footer';

type DashboardLayoutFooter = ComponentConfig<typeof theme, AppConfig, 'dashboardLayoutFooter'>;

export interface PDashboardLayoutFooterProps {
  /**
   * Is it fixed at the bottom
   */
  fixed?: boolean;
  height: number;
  show?: boolean;
  width: string;
  zIndex: number;

  class?: any;
}

export interface PDashboardLayoutFooterSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardLayoutFooterProps>(),
  {
    show: true,
  },
);

defineSlots<PDashboardLayoutFooterSlots>();

const rootStyle = computed<CSSProperties>(() => {
  const { fixed, height, show, width, zIndex } = props;

  return {
    height: `${height}px`,
    marginBottom: show ? '0' : `-${height}px`,
    position: fixed ? 'fixed' : 'static',
    width,
    zIndex,
  };
});

const appConfig = useAppConfig() as DashboardLayoutFooter['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayoutFooter || {}),
  }),
);
</script>

<template>
  <footer
    :class="pohon({ class: props.class })"
    :style="rootStyle"
  >
    <slot />
  </footer>
</template>
