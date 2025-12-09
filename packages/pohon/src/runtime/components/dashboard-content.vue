<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardContentCompactType } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-content';

type DashboardContent = ComponentConfig<typeof theme, AppConfig, 'dashboardContent'>;

export interface PDashboardContentProps {
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
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#app';
import { useLayoutContentStyle } from '#imports';
import { APrimitiveSlot } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardContentProps>(),
  {},
);

const { contentElement, overlayStyle } = useLayoutContentStyle();

const style = computed<CSSProperties>(() => {
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

const appConfig = useAppConfig() as DashboardContent['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardContent || {}),
  }),
);
</script>

<template>
  <main
    ref="contentElement"
    :style="style"
    :class="pohon({ class: props.class })"
  >
    <APrimitiveSlot :style="overlayStyle">
      <slot name="overlay" />
    </APrimitiveSlot>
    <slot />
  </main>
</template>
