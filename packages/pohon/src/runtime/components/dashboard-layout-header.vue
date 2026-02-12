<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout-header';

type DashboardLayoutHeader = ComponentConfig<typeof theme, AppConfig, 'dashboardLayoutHeader'>;

export interface PDashboardLayoutHeaderProps {
  /**
   * Full width
   */
  fullWidth: boolean;
  /**
   * Header height
   */
  height: number;
  /**
   * Show header
   */
  show: boolean;
  /**
   * Sidebar width
   */
  sidebarWidth: number;
  /**
   * Mobile
   */
  isMobile: boolean;

  class?: any;
}

export interface PDashboardLayoutHeaderSlots {
  'logo': (props?: object) => any;
  'toggle-button': (props?: object) => any;
  'default': (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardLayoutHeaderProps>(),
  {
  },
);

const slots = defineSlots<PDashboardLayoutHeaderSlots>();

const rootStyle = computed<CSSProperties>(() => {
  const { fullWidth, height, show } = props;
  const right = !show || !fullWidth ? undefined : 0;

  return {
    height: `${height}px`,
    marginTop: show ? 0 : `-${height}px`,
    right,
  };
});

const logoStyle = computed<CSSProperties>(() => {
  return {
    minWidth: `${props.isMobile ? 40 : props.sidebarWidth}px`,
  };
});

const appConfig = useAppConfig() as DashboardLayoutHeader['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayoutHeader || {}),
  }),
);
</script>

<template>
  <header
    :class="pohon({ class: props.class })"
    :style="rootStyle"
  >
    <div
      v-if="slots.logo"
      :style="logoStyle"
    >
      <slot name="logo" />
    </div>

    <slot name="toggle-button" />

    <slot />
  </header>
</template>
