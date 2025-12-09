<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar';
import { useScrollLock } from '@vueuse/core';
import { APrimitive } from 'akar';

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>;

export interface PDashboardSidebarProps {
  /**
   * Collapse area height
   * @default 42
   */
  collapseHeight?: number;
  /**
   * Collapse width
   * @default 48
   */
  collapseWidth?: number;
  /**
   * Extra area width
   * @default 0
   */
  extraWidth: number;
  /**
   * Fixed extra area
   * @default false
   */
  isFixedExtra?: boolean;
  /**
   * Whether the hidden side is visible
   * @default true
   */
  isHiddenSideVisible?: boolean;
  /**
   * Whether to show
   * @default true
   */
  isShowing?: boolean;
  /**
   * Whether it is sidebar mixed mode
   * @default false
   */
  isSidebarMixed?: boolean;
  /**
   * Header height
   */
  headerHeight: number;
  /**
   * Top margin
   * @default 0
   */
  marginTop?: number;
  /**
   * Mixed menu width
   * @default 70
   */
  mixedWidth?: number;
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
   * @default 0
   */
  width: number;
  /**
   * zIndex
   * @default 0
   */
  zIndex?: number;
  class?: any;
  pohon?: DashboardSidebar['slots'];
}

export type PDashboardSidebarEmits = {
  leave: [];
};

export interface PDashboardSidebarSlots {
  default: (props?: object) => any;
  logo: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#app';
import { computed, useTemplateRef, watchEffect } from 'vue';
import { uv } from '../utils/uv';

import PScrollbar from './scrollbar.vue';

const props = withDefaults(
  defineProps<PDashboardSidebarProps>(),
  {
    collapseHeight: 42,
    collapseWidth: 48,
    isHiddenSideVisible: true,
    isFixedExtra: false,
    isSidebarMixed: false,
    marginTop: 0,
    mixedWidth: 70,
    isShowing: true,
    showCollapseButton: true,
    zIndex: 0,
  },
);

const emits = defineEmits<PDashboardSidebarEmits>();
const slots = defineSlots<PDashboardSidebarSlots>();

const asideRef = useTemplateRef('asideRef');

const isCollapse = defineModel<boolean>('isCollapse');
const isExtraCollapse = defineModel<boolean>('isExtraCollapse');
const isExpandOnHovering = defineModel<boolean>('isExpandOnHovering');
const isExpandOnHover = defineModel<boolean>('isExpandOnHover');
const isExtraVisible = defineModel<boolean>('isExtraVisible');

const isLocked = useScrollLock(document.body);

const hiddenSideStyle = computed<CSSProperties>(() => calcMenuWidthStyle(true));

const rootStyle = computed<CSSProperties>(() => {
  const { isSidebarMixed, marginTop, zIndex } = props;

  return {
    // FIXME: scroll shadow
    // '--scroll-shadow': 'var(--sidebar)',
    ...calcMenuWidthStyle(false),
    height: `calc(100% - ${marginTop}px)`,
    marginTop: `${marginTop}px`,
    zIndex,
    ...(isSidebarMixed && isExtraVisible.value ? { transition: 'none' } : {}),
  };
});

const extraStyle = computed<CSSProperties>(() => {
  const { extraWidth, isShowing, width, zIndex } = props;

  return {
    left: `${width}px`,
    width: isExtraVisible.value && isShowing ? `${extraWidth}px` : 0,
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
  const { collapseWidth, isFixedExtra, isSidebarMixed, mixedWidth } = props;
  if (isSidebarMixed && isFixedExtra) {
    return { width: `${isCollapse.value ? collapseWidth : mixedWidth}px` };
  }

  return {};
});

const contentStyle = computed<CSSProperties>(() => {
  const { collapseHeight, headerHeight } = props;

  return {
    height: `calc(100% - ${headerHeight + collapseHeight}px)`,
    paddingTop: '8px',
    ...contentWidthStyle.value,
  };
});

const headerStyle = computed((): CSSProperties => {
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
  isExtraVisible.value = props.isFixedExtra ? true : isExtraVisible.value;
});

function calcMenuWidthStyle(isHiddenDom: boolean): CSSProperties {
  const { extraWidth, isFixedExtra, isSidebarMixed, isShowing, width } = props;

  const extraWidth_ = isSidebarMixed && isFixedExtra && isExtraVisible.value ? extraWidth : 0;

  let widthValue = width === 0
    ? '0px'
    : `${width + extraWidth_}px`;

  const { collapseWidth } = props;

  if (isHiddenDom && isExpandOnHovering.value && !isExpandOnHover.value) {
    widthValue = `${collapseWidth}px`;
  }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    marginLeft: isShowing ? 0 : `-${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
  };
}

function handleMouseenter(event: MouseEvent) {
  if (event?.offsetX < 10) {
    return;
  }

  if (isExpandOnHover.value) {
    return;
  }

  if (!isExpandOnHovering.value) {
    isCollapse.value = false;
  }

  if (props.isSidebarMixed) {
    isLocked.value = true;
  }

  isExpandOnHovering.value = true;
}

function handleMouseleave() {
  emits('leave');

  if (props.isSidebarMixed) {
    isLocked.value = false;
  }

  if (isExpandOnHover.value) {
    return;
  }

  isExpandOnHovering.value = false;
  isCollapse.value = true;
  isExtraVisible.value = false;
}

const appConfig = useAppConfig() as DashboardSidebar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSidebar || {}),
  })(),
);
</script>

<template>
  <div
    v-if="isHiddenSideVisible"
    :style="hiddenSideStyle"
    :class="pohon.hiddenSide({ class: [props.pohon?.hiddenSide] })"
  />

  <APrimitive
    as="aside"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :style="rootStyle"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      v-if="slots.logo"
      :style="headerStyle"
    >
      <slot name="logo" />
    </div>

    <PScrollbar
      :style="contentStyle"
      shadow
      shadow-border
    >
      <slot />
    </PScrollbar>

    <div :style="collapseStyle" />

    <!-- <div
      v-if="isSidebarMixed"
      ref="asideRef"
      :class="{
        'border-l': extraVisible,
      }"
      :style="extraStyle"
      class="fixed top-0 h-full overflow-hidden border-r border-border bg-sidebar transition-all duration-200"
    >
      <SidebarCollapseButton
        v-if="isSidebarMixed && expandOnHover"
        v-model:collapsed="extraCollapse"
      />

      <SidebarFixedButton
        v-if="!extraCollapse"
        v-model:expand-on-hover="expandOnHover"
      />
      <div v-if="!extraCollapse" :style="extraTitleStyle" class="pl-2">
        <slot name="extra-title"></slot>
      </div>
      <VbenScrollbar
        :style="extraContentStyle"
        class="border-border py-2"
        shadow
        shadow-border
      >
        <slot name="extra"></slot>
      </VbenScrollbar>
    </div> -->

    <!-- <SidebarCollapseButton
      v-if="showCollapseButton && !isSidebarMixed"
      v-model:collapsed="collapse"
    /> -->

    <!-- <SidebarFixedButton
      v-if="!collapse && !isSidebarMixed && showFixedButton"
      v-model:expand-on-hover="expandOnHover"
    /> -->
  </APrimitive>
</template>
