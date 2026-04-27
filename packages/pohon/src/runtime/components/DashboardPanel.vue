<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseResizableProps } from '../composables/use-resizable';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-panel';

type DashboardPanel = ComponentConfig<typeof theme, AppConfig, 'dashboardPanel'>;

export interface PDashboardPanelProps extends Pick<UseResizableProps, 'id' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable'> {
  class?: any;
  pohon?: DashboardPanel['slots'];
}

export interface PDashboardPanelSlots {
  'default'?: (props?: {}) => Array<VNode>;
  'header'?: (props?: {}) => Array<VNode>;
  'body'?: (props?: {}) => Array<VNode>;
  'footer'?: (props?: {}) => Array<VNode>;
  'resize-handle'?: (props: { onMouseDown: (event: MouseEvent) => void; onTouchStart: (event: TouchEvent) => void; onDoubleClick: (event: MouseEvent) => void }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed, toRef, useId } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useResizable } from '../composables/use-resizable';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardResizeHandle from './DashboardResizeHandle.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PDashboardPanelProps>(), {
  minSize: 15,
  resizable: false,
});
defineSlots<PDashboardPanelSlots>();

const appConfig = useAppConfig() as DashboardPanel['AppConfig'];
const pohonProp = useComponentPohon('dashboardPanel', props);
const dashboardContext = useDashboard({ storageKey: 'dashboard', unit: '%' });

const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`;

const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardPanel || {}) })({
  size: !!size.value,
}));
</script>

<template>
  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-dragging="isDragging"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :style="[size ? { '--width': `${size}${dashboardContext.unit}` } : undefined]"
  >
    <slot>
      <slot name="header" />

      <div
        data-slot="body"
        :class="pohon.body({ class: pohonProp?.body })"
      >
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
      data-slot="handle"
      :class="pohon.handle({ class: pohonProp?.handle })"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dblclick="onDoubleClick"
    />
  </slot>
</template>
