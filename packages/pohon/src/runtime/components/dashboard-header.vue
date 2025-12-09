<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-header';

type DashboardHeader = ComponentConfig<typeof theme, AppConfig, 'dashboardHeader'>;

export interface PDashboardHeaderProps {
  /**
   * Full width
   */
  fullWidth: boolean;
  /**
   * Height
   */
  height: number;
  /**
   * Is mobile
   */
  isMobile: boolean;
  /**
   * Show
   */
  show: boolean;
  /**
   * Sidebar width
   */
  sidebarWidth: number;
  /**
   * Theme
   */
  theme: string | undefined;
  /**
   * Width
   */
  width: string;
  /**
   * zIndex
   */
  zIndex: number;
  class?: any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#app';
import { computed, useSlots } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardHeaderProps>(),
  {},
);

const slots = useSlots();

const style = computed<CSSProperties>(() => {
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

const appConfig = useAppConfig() as DashboardHeader['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardHeader || {}),
  }),
);
</script>

<template>
  <header
    :style="style"
    :class="[
      theme,
      pohon({ class: props.class }),
    ]"
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
