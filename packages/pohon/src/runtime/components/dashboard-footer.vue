<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-footer';

type DashboardFooter = ComponentConfig<typeof theme, AppConfig, 'dashboardFooter'>;

export interface PDashboardFooterProps {
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
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#app';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardFooterProps>(),
  {
    show: true,
  },
);

const style = computed<CSSProperties>(() => {
  const { fixed, height, show, width, zIndex } = props;

  return {
    height: `${height}px`,
    marginBottom: show ? '0' : `-${height}px`,
    position: fixed ? 'fixed' : 'static',
    width,
    zIndex,
  };
});

const appConfig = useAppConfig() as DashboardFooter['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardFooter || {}),
  }),
);
</script>

<template>
  <footer
    :style="style"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </footer>
</template>
