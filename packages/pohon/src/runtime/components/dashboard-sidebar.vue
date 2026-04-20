<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/dashboard-sidebar'
import type { UseResizableProps } from '../composables/use-resizable'
import type { PButtonProps, PDrawerProps, PDialogProps, PSlideoverProps, PLinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>

type DashboardSidebarMode = 'modal' | 'slideover' | 'drawer'
type DashboardSidebarMenu<T> = T extends 'modal' ? PDialogProps : T extends 'slideover' ? PSlideoverProps : T extends 'drawer' ? PDrawerProps : never

export interface DashboardSidebarProps<T extends DashboardSidebarMode = DashboardSidebarMode> extends Pick<UseResizableProps, 'id' | 'side' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable' | 'collapsible' | 'collapsedSize'> {
  /**
   * The mode of the sidebar menu.
   * @defaultValue 'modal'
   */
  mode?: T
  /**
   * The props for the sidebar menu component.
   */
  menu?: DashboardSidebarMenu<T>
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Omit<PButtonProps, PLinkPropsKeys>
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right'
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean
  class?: any
  pohon?: DashboardSidebar['slots']
}

export interface DashboardSidebarSlots {
  'header'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'default'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'footer'?(props: { collapsed: boolean, collapse: (value: boolean) => void }): VNode[]
  'toggle'?(props: { open: boolean, toggle: () => void, pohon: DashboardSidebar['pohon'] }): VNode[]
  'content'?(props: { close?: () => void }): VNode[]
  'resize-handle'?(props: { onMouseDown: (e: MouseEvent) => void, onTouchStart: (e: TouchEvent) => void, onDoubleClick: (e: MouseEvent) => void, pohon: DashboardSidebar['pohon'] }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends DashboardSidebarMode">
import { ref, computed, toRef, useId, watch } from 'vue'
import { defu } from 'defu'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig, useRuntimeHook, useRoute } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { useResizable } from '../composables/use-resizable'
import { useLocale } from '../composables/use-locale'
import { useDashboard } from '../utils/dashboard'
import { tv } from '../utils/tv'
import PDashboardResizeHandle from './dashboard-resize-handle.vue'
import PDashboardSidebarToggle from './dashboard-sidebar-toggle.vue'
import PSlideover from './slideover.vue'
import PModal from './modal.vue'
import PDrawer from './drawer.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardSidebarProps<T>>(), {
  side: 'left',
  mode: 'slideover' as never,
  autoClose: true,
  toggle: true,
  toggleSide: 'left',
  minSize: 10,
  maxSize: 20,
  defaultSize: 15,
  resizable: false,
  collapsible: false,
  collapsedSize: 0
})
const slots = defineSlots<DashboardSidebarSlots>()

const open = defineModel<boolean>('open', { default: false })
const collapsed = defineModel<boolean>('collapsed', { default: false })

const route = useRoute()
const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSidebar['AppConfig']
const pohonProp = useComponentPohon('dashboardSidebar', props)

const dashboardContext = useDashboard({
  storageKey: 'dashboard',
  unit: '%',
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false)
})

const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`

const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })), { collapsed })

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate()
const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate()

useRuntimeHook('dashboard:sidebar:toggle', () => {
  open.value = !open.value
})

useRuntimeHook('dashboard:sidebar:collapse', (value: boolean) => {
  isCollapsed.value = value
})

watch(open, () => dashboardContext.sidebarOpen!.value = open.value, { immediate: true })
watch(isCollapsed, () => dashboardContext.sidebarCollapsed!.value = isCollapsed.value, { immediate: true })

watch(() => route.fullPath, () => {
  if (!props.autoClose) return

  open.value = false
})

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.dashboardSidebar || {}) })({
  side: props.side
}))

const Menu = computed(() => ({
  slideover: USlideover,
  modal: UModal,
  drawer: UDrawer
})[props.mode as DashboardSidebarMode])

const menuProps = toRef(() => defu(props.menu, {}, props.mode === 'modal' ? { fullscreen: true, transition: false } : props.mode === 'slideover' ? { side: 'left' } : {}) as DashboardSidebarMenu<T>)

function toggleOpen() {
  open.value = !open.value
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" : pohon="ui">
      <PDashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle : {})"
        :side="toggleSide"
        data-slot="toggle"
        :class="ui.toggle({ class: pohonProp?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
    <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick" : pohon="ui">
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
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="side === 'right'" />

  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    data-slot="root"
    :class="ui.root({ class: [pohonProp?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
      <slot name="header" :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div data-slot="body" :class="ui.body({ class: pohonProp?.body })">
      <slot :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer })">
      <slot name="footer" :collapsed="isCollapsed" :collapse="collapse" />
    </div>
  </div>

  <ReuseResizeHandleTemplate v-if="side === 'left'" />

  <Menu
    v-model:open="open"
    :title="t('dashboardSidebar.title')"
    :description="t('dashboardSidebar.description')"
    v-bind="menuProps"
    : pohon="{
      overlay: ui.overlay({ class: pohonProp?.overlay }),
      content: ui.content({ class: pohonProp?.content })
    }"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="!!slots.header || mode !== 'drawer'" data-slot="header" :class="ui.header({ class: pohonProp?.header, menu: true })">
          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'left'" />

          <slot name="header" :collapsed="false" :collapse="() => {}" />

          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'right'" />
        </div>

        <div data-slot="body" :class="ui.body({ class: pohonProp?.body, menu: true })">
          <slot :collapsed="false" :collapse="() => {}" />
        </div>

        <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer, menu: true })">
          <slot name="footer" :collapsed="false" :collapse="() => {}" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
