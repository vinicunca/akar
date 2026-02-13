<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardContentCompactType } from '../types/dashboard';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout-content';
import { APrimitiveSlot } from 'akar';
import { useDashboardLayoutContentStyle } from '../composables/use-dashboard-layout-style';

type DashboardLayoutContent = ComponentConfig<typeof theme, AppConfig, 'dashboardLayoutContent'>;

export interface PDashboardLayoutContentProps {
  /**
   * Fixed width of content area
   */
  contentCompact: PDashboardContentCompactType;
  /**
   * Fixed width layout width
   */
  contentCompactWidth: number;
  padding: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;

  class?: any;
}

export interface PDashboardLayoutContentSlots {
  overlay: (props?: object) => any;
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardLayoutContentProps>(),
  {
  },
);

defineSlots<PDashboardLayoutContentSlots>();

const { contentElement, overlayStyle } = useDashboardLayoutContentStyle();

const rootStyle = computed<CSSProperties>(() => {
  const {
    contentCompact,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props;

  const compactStyle: CSSProperties
    = contentCompact === 'compact'
      ? { margin: '0 auto', width: `${props.contentCompactWidth}px` }
      : {};

  return {
    ...compactStyle,
    flex: 1,
    padding: `${padding}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    paddingTop: `${paddingTop}px`,
  };
});

const appConfig = useAppConfig() as DashboardLayoutContent['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayoutContent || {}),
  }),
);
</script>

<template>
  <main
    ref="contentElement"
    :style="rootStyle"
    :class="pohon({ class: props.class })"
  >
    <APrimitiveSlot :style="overlayStyle">
      <slot name="overlay" />
    </APrimitiveSlot>

    <slot />
  </main>
</template>
