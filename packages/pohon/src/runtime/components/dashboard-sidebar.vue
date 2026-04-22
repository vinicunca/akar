<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseResizableProps } from '../composables/use-resizable';
import type { PButtonProps, PDialogProps, PDrawerProps, PLinkPropsKeys, PSlideoverProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar';

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>;

type DashboardSidebarMode = 'modal' | 'slideover' | 'drawer';
type DashboardSidebarMenu<T> = T extends 'modal' ? PDialogProps : T extends 'slideover' ? PSlideoverProps : T extends 'drawer' ? PDrawerProps : never;

export interface PDashboardSidebarProps<T extends DashboardSidebarMode = DashboardSidebarMode> extends Pick<UseResizableProps, 'id' | 'side' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable' | 'collapsible' | 'collapsedSize'> {
  /**
   * The mode of the sidebar menu.
   * @defaultValue 'modal'
   */
  mode?: T;
  /**
   * The props for the sidebar menu component.
   */
  menu?: DashboardSidebarMenu<T>;
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right';
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean;
  class?: any;
  pohon?: DashboardSidebar['slots'];
}

export interface PDashboardSidebarSlots {
  'header'?: (props: { collapsed: boolean; collapse: (value: boolean) => void }) => Array<VNode>;
  'default'?: (props: { collapsed: boolean; collapse: (value: boolean) => void }) => Array<VNode>;
  'footer'?: (props: { collapsed: boolean; collapse: (value: boolean) => void }) => Array<VNode>;
  'toggle'?: (props: { open: boolean; toggle: () => void; pohon: DashboardSidebar['pohon'] }) => Array<VNode>;
  'content'?: (props: { close?: () => void }) => Array<VNode>;
  'resize-handle'?: (props: { onMouseDown: (event: MouseEvent) => void; onTouchStart: (event: TouchEvent) => void; onDoubleClick: (event: MouseEvent) => void; pohon: DashboardSidebar['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends DashboardSidebarMode">
import { useAppConfig, useRoute, useRuntimeHook } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { defu } from 'defu';
import { computed, ref, toRef, useId, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { useResizable } from '../composables/use-resizable';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardResizeHandle from './dashboard-resize-handle.vue';
import PDashboardSidebarToggle from './dashboard-sidebar-toggle.vue';
import PDialog from './dialog.vue';
import PDrawer from './drawer.vue';
import PSlideover from './slideover.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PDashboardSidebarProps<T>>(), {
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
  collapsedSize: 0,
});
const slots = defineSlots<PDashboardSidebarSlots>();

const open = defineModel<boolean>('open', { default: false });
const collapsed = defineModel<boolean>('collapsed', { default: false });

const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebar['AppConfig'];
const pohonProp = useComponentPohon('dashboardSidebar', props);

const dashboardContext = useDashboard({
  storageKey: 'dashboard',
  unit: '%',
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false),
});

const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`;

const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })), { collapsed });

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();

useRuntimeHook('dashboard:sidebar:toggle', () => {
  open.value = !open.value;
});

useRuntimeHook('dashboard:sidebar:collapse', (value: boolean) => {
  isCollapsed.value = value;
});

watch(
  open,
  () => {
    dashboardContext.sidebarOpen!.value = open.value;
  },
  { immediate: true },
);
watch(
  isCollapsed,
  () => {
    dashboardContext.sidebarCollapsed!.value = isCollapsed.value;
  },
  { immediate: true },
);

watch(() => route.fullPath, () => {
  if (!props.autoClose) {
    return;
  }

  open.value = false;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardSidebar || {}) })({
  side: props.side,
}));

const Menu = computed(() => ({
  slideover: PSlideover,
  modal: PDialog,
  drawer: PDrawer,
})[props.mode as DashboardSidebarMode]);

const menuProps = toRef(() => defu(
  props.menu,
  {},
  // eslint-disable-next-line no-nested-ternary
  props.mode === 'modal' ? { fullscreen: true, transition: false } : props.mode === 'slideover' ? { side: 'left' } : {},
) as DashboardSidebarMenu<T>);

function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot
      name="toggle"
      :open="open"
      :toggle="toggleOpen"
      :pohon="pohon"
    >
      <PDashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle : {})"
        :side="toggleSide"
        data-slot="toggle"
        :class="pohon.toggle({ class: pohonProp?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
    <slot
      name="resize-handle"
      :on-mouse-down="onMouseDown"
      :on-touch-start="onTouchStart"
      :on-double-click="onDoubleClick"
      :pohon="pohon"
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
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="side === 'right'" />

  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div
      v-if="!!slots.header"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot
        name="header"
        :collapsed="isCollapsed"
        :collapse="collapse"
      />
    </div>

    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <slot
        :collapsed="isCollapsed"
        :collapse="collapse"
      />
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot
        name="footer"
        :collapsed="isCollapsed"
        :collapse="collapse"
      />
    </div>
  </div>

  <ReuseResizeHandleTemplate v-if="side === 'left'" />

  <Menu
    v-model:open="open"
    :title="t('dashboardSidebar.title')"
    :description="t('dashboardSidebar.description')"
    v-bind="menuProps"
    :pohon="{
      overlay: pohon.overlay({ class: pohonProp?.overlay }),
      content: pohon.content({ class: pohonProp?.content }),
    }"
  >
    <template #content="contentData">
      <slot
        name="content"
        v-bind="contentData"
      >
        <div
          v-if="!!slots.header || mode !== 'drawer'"
          data-slot="header"
          :class="pohon.header({ class: pohonProp?.header, menu: true })"
        >
          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'left'" />

          <slot
            name="header"
            :collapsed="false"
            :collapse="() => {}"
          />

          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'right'" />
        </div>

        <div
          data-slot="body"
          :class="pohon.body({ class: pohonProp?.body, menu: true })"
        >
          <slot
            :collapsed="false"
            :collapse="() => {}"
          />
        </div>

        <div
          v-if="!!slots.footer"
          data-slot="footer"
          :class="pohon.footer({ class: pohonProp?.footer, menu: true })"
        >
          <slot
            name="footer"
            :collapsed="false"
            :collapse="() => {}"
          />
        </div>
      </slot>
    </template>
  </Menu>
</template>
