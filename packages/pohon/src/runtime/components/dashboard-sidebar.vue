<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseResizableProps } from '../composables/use-resizable';
import type {
  PButtonProps,
  PDialogProps,
  PDrawerProps,
  PSlideoverProps,
} from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar';

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>;

type DashboardSidebarMode = 'dialog' | 'slideover' | 'drawer';
type DashboardSidebarMenu<T> = T extends 'dialog' ? PDialogProps : T extends 'slideover' ? PSlideoverProps : T extends 'drawer' ? PDrawerProps : never;

export interface PDashboardSidebarProps<T extends DashboardSidebarMode = DashboardSidebarMode> extends Pick<UseResizableProps, 'id' | 'side' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable' | 'collapsible' | 'collapsedSize'> {
  /**
   * The mode of the sidebar menu.
   * @defaultValue 'dialog'
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
  toggle?: boolean | Partial<PButtonProps>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right';
  class?: any;
  pohon?: DashboardSidebar['slots'];
}

export interface PDashboardSidebarSlots {
  'header': (props: { collapsed?: boolean; collapse?: (value: boolean) => void }) => any;
  'default': (props: { collapsed?: boolean; collapse?: (value: boolean) => void }) => any;
  'footer': (props: { collapsed?: boolean; collapse?: (value: boolean) => void }) => any;
  'toggle': (props: { open: boolean; toggle: () => void }) => any;
  'content': (props?: object) => any;
  'resize-handle': (props: {
    onMouseDown: (event: MouseEvent) => void;
    onTouchStart: (event: TouchEvent) => void;
    onDoubleClick: (event: MouseEvent) => void;
  }) => any;
}
</script>

<script setup lang="ts" generic="T extends DashboardSidebarMode">
import { useAppConfig, useRoute, useRuntimeHook } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { defu } from 'defu';
import { computed, ref, toRef, useId, watch } from 'vue';
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

const dashboardContext = useDashboard({
  storageKey: 'dashboard',
  unit: '%',
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false),
});

const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`;

const {
  el,
  size,
  collapse,
  isCollapsed,
  isDragging,
  onMouseDown,
  onTouchStart,
  onDoubleClick,
} = useResizable({
  key: id,
  options: toRef(() => ({ ...dashboardContext, ...props })),
  collapsed,
});

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

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSidebar || {}),
  })({
    side: props.side,
  }),
);

const Menu = computed(() => ({
  slideover: PSlideover,
  dialog: PDialog,
  drawer: PDrawer,
})[props.mode as DashboardSidebarMode]);

const menuProps = toRef(
  () => defu(
    props.menu,
    {
      content: {
        onOpenAutoFocus: (e: Event) => e.preventDefault(),
      },
    },
    // eslint-disable-next-line no-nested-ternary
    props.mode === 'dialog'
      ? { fullscreen: true, transition: false }
      // eslint-disable-next-line sonar/no-nested-conditional
      : props.mode === 'slideover'
        ? { side: 'left' }
        : {},
  ) as DashboardSidebarMenu<T>,
);

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
    >
      <PDashboardSidebarToggle
        v-if="toggle"
        v-bind="(typeof toggle === 'object' ? toggle as Partial<PButtonProps> : {})"
        :side="toggleSide"
        :class="pohon.toggle({ class: props.pohon?.toggle, toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
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
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="side === 'right'" />

  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div
      v-if="!!slots.header"
      :class="pohon.header({ class: props.pohon?.header })"
    >
      <slot
        name="header"
        :collapsed="isCollapsed"
        :collapse="collapse"
      />
    </div>

    <div :class="pohon.body({ class: props.pohon?.body })">
      <slot
        :collapsed="isCollapsed"
        :collapse="collapse"
      />
    </div>

    <div
      v-if="!!slots.footer"
      :class="pohon.footer({ class: props.pohon?.footer })"
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
      overlay: pohon.overlay({ class: props.pohon?.overlay }),
      content: pohon.content({ class: props.pohon?.content }),
    }"
  >
    <template #content>
      <slot name="content">
        <div
          v-if="!!slots.header || mode !== 'drawer'"
          :class="pohon.header({ class: props.pohon?.header, menu: true })"
        >
          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'left'" />

          <slot name="header" />

          <ReuseToggleTemplate v-if="mode !== 'drawer' && toggleSide === 'right'" />
        </div>

        <div :class="pohon.body({ class: props.pohon?.body, menu: true })">
          <slot />
        </div>

        <div
          v-if="!!slots.footer"
          :class="pohon.footer({ class: props.pohon?.footer, menu: true })"
        >
          <slot name="footer" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
