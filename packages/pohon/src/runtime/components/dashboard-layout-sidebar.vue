<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout-sidebar';

type DashboardLayoutSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardLayoutSidebar'>;

export interface PDashboardLayoutSidebarProps {
  /**
   * Collapse area height
   * @default 42
   */
  collapseHeight?: number;
  /**
   * Collapse width
   * @default 48
   */
  collapsedWidth?: number;
  /**
   * Whether the hidden DOM is visible
   * @default true
   */
  domVisible?: boolean;
  /**
   * Extra area width
   */
  extraWidth: number;
  /**
   * Fixed extra area
   * @default false
   */
  fixedExtra?: boolean;
  /**
   * Header height
   */
  headerHeight: number;
  /**
   * Whether it is sidebar mixed mode
   * @default false
   */
  isSidebarMixed?: boolean;
  /**
   * Top margin
   * @default 60
   */
  marginTop?: number;
  /**
   * Mixed menu width
   * @default 80
   */
  mixedWidth?: number;
  /**
   * Top padding
   * @default 60
   */
  paddingTop?: number;
  /**
   * Whether to show
   * @default true
   */
  show?: boolean;
  /**
   * Show collapse button
   * @default false
   */
  showCollapseButton?: boolean;
  /**
   * Show pin button
   * @default true
   */
  showFixedButton?: boolean;
  /**
   * Theme
   */
  theme: string;

  /**
   * Width
   */
  width: number;
  /**
   * zIndex
   * @default 0
   */
  zIndex?: number;

  class?: any;
}

export interface PDashboardLayoutSidebarSlots {
  'logo': (props?: object) => any;
  'default': (props?: object) => any;
  'extra-title': (props?: object) => any;
  'extra': (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { useScrollLock } from '@vueuse/core';
import { computed, shallowRef, watchEffect } from 'vue';
import { uv } from '../utils/uv';
import PDashboardLayoutSidebarCollapseButton from './dashboard-layout-sidebar-collapse-button.vue';
import PDashboardLayoutSidebarFixedButton from './dashboard-layout-sidebar-fixed-button.vue';
import PScrollbar from './scrollbar.vue';

const props = withDefaults(
  defineProps<PDashboardLayoutSidebarProps>(),
  {
    collapseHeight: 42,
    collapsedWidth: 48,
    domVisible: true,
    fixedExtra: false,
    isSidebarMixed: false,
    marginTop: 0,
    mixedWidth: 70,
    paddingTop: 0,
    show: true,
    showCollapseButton: true,
    zIndex: 0,
  },
);

const emits = defineEmits<{ leave: [] }>();
const slots = defineSlots<PDashboardLayoutSidebarSlots>();

const collapsed = defineModel<boolean>('collapsed');
const extraCollapse = defineModel<boolean>('extraCollapse');
const expandOnHovering = defineModel<boolean>('expandOnHovering');
const expandChildrenOnHover = defineModel<boolean>('expandChildrenOnHover');
const extraVisible = defineModel<boolean>('extraVisible');

const isLocked = useScrollLock(document.body);
const asideRef = shallowRef<HTMLDivElement | null>();

const hiddenSideStyle = computed<CSSProperties>(() => calcMenuWidthStyle(true));

const rootStyle = computed<CSSProperties>(() => {
  const { isSidebarMixed, marginTop, paddingTop, zIndex } = props;

  return {
    '--scroll-shadow': 'var(--sidebar)',
    ...calcMenuWidthStyle(false),
    'height': `calc(100% - ${marginTop}px)`,
    'marginTop': `${marginTop}px`,
    'paddingTop': `${paddingTop}px`,
    zIndex,
    ...(isSidebarMixed && extraVisible.value ? { transition: 'none' } : {}),
  };
});

const extraStyle = computed<CSSProperties>(() => {
  const { extraWidth, show, width, zIndex } = props;

  return {
    left: `${width}px`,
    width: extraVisible.value && show ? `${extraWidth}px` : 0,
    zIndex,
  };
});

const extraTitleStyle = computed<CSSProperties>(() => {
  const { headerHeight } = props;

  return {
    height: `${headerHeight - 1}px`,
  };
});

const contentWidthStyle = computed<CSSProperties>(() => {
  const { collapsedWidth, fixedExtra, isSidebarMixed, mixedWidth } = props;
  if (isSidebarMixed && fixedExtra) {
    return { width: `${collapsed.value ? collapsedWidth : mixedWidth}px` };
  }
  return {};
});

const contentStyle = computed<CSSProperties>(() => {
  const { collapseHeight, headerHeight } = props;

  return {
    height: `calc(100% - ${headerHeight + collapseHeight}px)`,
    ...contentWidthStyle.value,
  };
});

const headerStyle = computed<CSSProperties>(() => {
  const { headerHeight, isSidebarMixed } = props;

  return {
    ...(isSidebarMixed ? { display: 'flex', justifyContent: 'center' } : {}),
    height: `${headerHeight - 1}px`,
    ...contentWidthStyle.value,
  };
});

const extraContentStyle = computed<CSSProperties>(() => {
  const { collapseHeight, headerHeight } = props;
  return {
    height: `calc(100% - ${headerHeight + collapseHeight}px)`,
  };
});

const collapseStyle = computed<CSSProperties>(() => {
  return {
    height: `${props.collapseHeight}px`,
  };
});

watchEffect(() => {
  extraVisible.value = props.fixedExtra ? true : extraVisible.value;
});

function calcMenuWidthStyle(isHiddenDom: boolean): CSSProperties {
  const { extraWidth, fixedExtra, isSidebarMixed, show, width } = props;

  const extraWidth_ = isSidebarMixed && fixedExtra && extraVisible.value ? extraWidth : 0;

  let widthValue
    = width === 0
      ? '0px'
      : `${width + extraWidth_}px`;

  if (isHiddenDom && expandOnHovering.value && !expandChildrenOnHover.value) {
    widthValue = `${props.collapsedWidth}px`;
  }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    marginLeft: show ? 0 : `-${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
  };
}

function handleMouseenter(event: MouseEvent) {
  if (event?.offsetX < 10) {
    return;
  }

  if (expandChildrenOnHover.value) {
    return;
  }

  if (!expandOnHovering.value) {
    collapsed.value = false;
  }

  if (props.isSidebarMixed) {
    isLocked.value = true;
  }

  expandOnHovering.value = true;
}

function handleMouseleave() {
  emits('leave');

  if (props.isSidebarMixed) {
    isLocked.value = false;
  }

  if (expandChildrenOnHover.value) {
    return;
  }

  expandOnHovering.value = false;
  collapsed.value = true;
  extraVisible.value = false;
}

const appConfig = useAppConfig() as DashboardLayoutSidebar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayoutSidebar || {}),
  }),
);
</script>

<template>
  <div
    v-if="domVisible"
    :class="theme"
    :style="hiddenSideStyle"
    class="h-full transition-all-150"
  />

  <aside
    :style="rootStyle"
    class="h-full left-0 top-0 fixed"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      class="h-full transition-all-280"
      :class="[
        theme,
        {
          'bg-sidebar-deep': isSidebarMixed,
          'bg-sidebar border-border border-r': !isSidebarMixed,
        },
      ]"
      :style="{ width: `${width}px` }"
    >
      <div
        v-if="slots.logo"
        :style="headerStyle"
      >
        <slot name="logo" />
      </div>

      <PScrollbar
        class="px-2 pt-2"
        :style="contentStyle"
        has-shadow
        has-shadow-border
      >
        <slot />
      </PScrollbar>

      <div
        :style="collapseStyle"
        class="px-3 inline-flex w-full items-center justify-between"
      >
        <PDashboardLayoutSidebarCollapseButton
          v-if="showCollapseButton && !isSidebarMixed"
          v-model:collapsed="collapsed"
        />

        <PDashboardLayoutSidebarFixedButton
          v-if="!collapsed && !isSidebarMixed"
          v-model:expand-children-on-hover="expandChildrenOnHover"
        />
      </div>
    </div>

    <div
      v-if="isSidebarMixed"
      ref="asideRef"
      :class="{
        'border-l': extraVisible,
      }"
      :style="extraStyle"
      class="bg-sidebar border-r border-border h-full transition-all-200 top-0 fixed overflow-hidden"
    >
      <PDashboardLayoutSidebarCollapseButton
        v-if="isSidebarMixed && expandChildrenOnHover"
        v-model:collapsed="extraCollapse"
      />

      <PDashboardLayoutSidebarFixedButton
        v-if="!extraCollapse"
        v-model:expand-children-on-hover="expandChildrenOnHover"
      />

      <div
        v-if="!extraCollapse"
        :style="extraTitleStyle"
        class="pl-2"
      >
        <slot name="extra-title" />
      </div>

      <PScrollbar
        :style="extraContentStyle"
        class="py-2 border-border"
        shadow
        shadow-border
      >
        <slot name="extra" />
      </PScrollbar>
    </div>
  </aside>
</template>
