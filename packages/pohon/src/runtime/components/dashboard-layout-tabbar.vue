<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout-tabbar';

type DashboardLayoutTabbar = ComponentConfig<typeof theme, AppConfig, 'dashboardLayoutTabbar'>;

export interface PDashboardLayoutTabbarProps {
  height: number;

  class?: any;
}

export interface PDashboardLayoutTabbarSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardLayoutTabbarProps>(),
  {},
);

const style = computed<CSSProperties>(() => {
  const { height } = props;
  return {
    height: `${height}px`,
  };
});

const appConfig = useAppConfig() as DashboardLayoutTabbar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayoutTabbar || {}),
  }),
);
</script>

<template>
  <section
    :style="style"
    :class="pohon({ class: props.class })"
  >
    <slot />
  </section>
</template>
