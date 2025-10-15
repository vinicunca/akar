<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseResizableProps } from '../composables/use-resizable';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-panel';

type DashboardPanel = ComponentConfig<typeof theme, AppConfig, 'dashboardPanel'>;

export interface PDashboardPanelProps extends Pick<UseResizableProps, 'id' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable'> {
  class?: any;
  pohon?: DashboardPanel['slots'];
}

export interface PDashboardPanelSlots {
  'default': (props?: object) => any;
  'header': (props?: object) => any;
  'body': (props?: object) => any;
  'footer': (props?: object) => any;
  'resize-handle': (props: {
    onMouseDown: (event: MouseEvent) => void;
    onTouchStart: (event: TouchEvent) => void;
    onDoubleClick: (event: MouseEvent) => void;
  }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed, toRef, useId } from 'vue';
import { useResizable } from '../composables/use-resizable';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardResizeHandle from './dashboard-resize-handle.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PDashboardPanelProps>(),
  {
    minSize: 15,
    resizable: false,
  },
);
defineSlots<PDashboardPanelSlots>();

const appConfig = useAppConfig() as DashboardPanel['AppConfig'];
const dashboardContext = useDashboard({ storageKey: 'dashboard', unit: '%' });

const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`;

const {
  el,
  size,
  isDragging,
  onMouseDown,
  onTouchStart,
  onDoubleClick,
} = useResizable({
  key: id,
  options: toRef(() => ({ ...dashboardContext, ...props })),
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardPanel || {}),
  })({
    size: !!size.value,
  }),
);
</script>

<template>
  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-dragging="isDragging"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :style="[size ? { '--width': `${size}${dashboardContext.unit}` } : undefined]"
  >
    <slot>
      <slot name="header" />

      <div :class="pohon.body({ class: props.pohon?.body })">
        <slot name="body" />
      </div>

      <slot name="footer" />
    </slot>
  </div>

  <slot
    name="resize-handle"
    :on-mouse-down="onMouseDown"
    :on-touch-start="onTouchStart"
    :on-double-click="onDoubleClick"
  >
    <PDashboardResizeHandle
      v-if="resizable"
      :aria-controls="id"
      :class="pohon.handle({ class: props.pohon?.handle })"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dblclick="onDoubleClick"
    />
  </slot>
</template>
