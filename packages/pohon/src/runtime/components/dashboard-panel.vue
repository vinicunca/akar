<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/dashboard-panel'
import type { UseResizableProps } from '../composables/use-resizable'
import type { ComponentConfig } from '../types/tv'

type DashboardPanel = ComponentConfig<typeof theme, AppConfig, 'dashboardPanel'>

export interface DashboardPanelProps extends Pick<UseResizableProps, 'id' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable'> {
  class?: any
  pohon?: DashboardPanel['slots']
}

export interface DashboardPanelSlots {
  'default'?(props?: {}): VNode[]
  'header'?(props?: {}): VNode[]
  'body'?(props?: {}): VNode[]
  'footer'?(props?: {}): VNode[]
  'resize-handle'?(props: { onMouseDown: (e: MouseEvent) => void, onTouchStart: (e: TouchEvent) => void, onDoubleClick: (e: MouseEvent) => void }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, useId, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { useResizable } from '../composables/use-resizable'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import PDashboardResizeHandle from './dashboard-resize-handle.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardPanelProps>(), {
  minSize: 15,
  resizable: false
})
defineSlots<DashboardPanelSlots>()

const appConfig = useAppConfig() as DashboardPanel['AppConfig']
const pohonProp = useComponentPohon('dashboardPanel', props)
const dashboardContext = useDashboard({ storageKey: 'dashboard', unit: '%' })

const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`

const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })))

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.dashboardPanel || {}) })({
  size: !!size.value
}))
</script>

<template>
  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-dragging="isDragging"
    data-slot="root"
    :class="ui.root({ class: [pohonProp?.root, props.class] })"
    :style="[size ? { '--width': `${size}${dashboardContext.unit}` } : undefined]"
  >
    <slot>
      <slot name="header" />

      <div data-slot="body" :class="ui.body({ class: pohonProp?.body })">
        <slot name="body" />
      </div>

      <slot name="footer" />
    </slot>
  </div>

  <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick">
    <PDashboardResizeHandle
      v-if="resizable"
      :aria-controls="id"
      data-slot="handle"
      :class="ui.handle({ class: pohonProp?.handle })"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dblclick="onDoubleClick"
    />
  </slot>
</template>
