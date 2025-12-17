<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardContentCompactType, PDashboardLayoutHeaderModeType, PDashboardLayoutType } from '../types/dashboard';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-layout';

type DashboardLayout = ComponentConfig<typeof theme, AppConfig, 'dashboardLayout'>;

export interface PDashboardLayoutProps {
  /**
   * Fixed width for the content area
   * @default 'wide'
   */
  contentCompact?: PDashboardContentCompactType;
  /**
   * Width for fixed layout
   * @default 1200
   */
  contentCompactWidth?: number;
  /**
   * Padding
   * @default 16
   */
  contentPadding?: number;
  /**
   * Padding bottom
   * @default 16
   */
  contentPaddingBottom?: number;
  /**
   * Padding left
   * @default 16
   */
  contentPaddingLeft?: number;
  /**
   * Padding right
   * @default 16
   */
  contentPaddingRight?: number;
  /**
   * Padding top
   * @default 16
   */
  contentPaddingTop?: number;
  /**
   * Whether the footer is visible
   * @default false
   */
  isFooterEnable?: boolean;
  /**
   * Whether the footer is fixed
   * @default true
   */
  isFooterFixed?: boolean;
  /**
   * Footer height
   * @default 32
   */
  footerHeight?: number;
  /**
   * Header height
   * @default 48
   */
  headerHeight?: number;
  /**
   * Whether the top bar is hidden
   * @default false
   */
  isHeaderHidden?: boolean;
  /**
   * Header display mode
   * @default 'fixed'
   */
  headerMode?: PDashboardLayoutHeaderModeType;
  /**
   * Header theme
   */
  headerTheme?: string;
  /**
   * Whether to show the button to toggle the sidebar in the header
   * @default
   */
  showHeaderToggleSidebarButton?: boolean;
  /**
   * Whether the header is visible
   * @default true
   */
  isHeaderVisible?: boolean;
  /**
   * Whether to display on mobile
   * @default false
   */
  isMobile?: boolean;
  /**
   * Layout type
   * sidebar-nav: Sidebar menu layout
   * header-nav: Top menu layout
   * mixed-nav: Sidebar & top menu layout
   * sidebar-mixed-nav: Sidebar mixed menu layout
   * full-content: Full screen content layout
   * @default sidebar-nav
   */
  layout?: PDashboardLayoutType;
  /**
   * Sidebar collapse state
   * @default false
   */
  isSidebarCollapse?: boolean;
  /**
   * Whether to show the button to collapse the sidebar
   * @default true
   */
  showSidebarCollapsedButton?: boolean;
  /**
   * Whether to show the title when the sidebar is collapsed
   * @default true
   */
  showSidebarCollapseTitle?: boolean;
  /**
   * Whether the sidebar is enabled
   * @default true
   */
  isSidebarEnable?: boolean;
  /**
   * Extra width when the sidebar is collapsed
   * @default 60
   */
  sidebarExtraCollapsedWidth?: number;
  /**
   * Wether the side menu collapse button is fixed
   * @default true
   */
  isSidebarFixedButton?: boolean;
  /**
   * Whether the sidebar is hidden
   * @default false
   */
  isSidebarHidden?: boolean;
  /**
   * Width of the mixed sidebar
   * @default 80
   */
  sidebarMixedWidth?: number;
  /**
   * Sidebar theme
   * @default dark
   */
  sidebarTheme?: string;
  /**
   * Sidebar width
   * @default 210
   */
  sidebarWidth?: number;
  /**
   * Sidebar collapse width
   * @default 48
   */
  sideCollapseWidth?: number;
  /**
   * Whether the tab bar is enabled
   * @default true
   */
  isTabbarEnable?: boolean;
  /**
   * Tab bar height
   * @default 30
   */
  tabbarHeight?: number;
  /**
   * zIndex
   * @default 200
   */
  zIndex?: number;

  as?: any;
  class?: any;
  pohon?: DashboardLayout['slots'];
}

export interface PDashboardLayoutEmits {
  sideMouseLeave: [];
  toggleSidebar: [];
}

export interface PDashboardLayoutSlots {
  'sidebar': (props?: object) => any;
  'logo': (props?: object) => any;
  'menu': (props?: object) => any;
  'header': (props?: object) => any;
  'content': (props?: object) => any;
  'extra': (props?: object) => any;
  'footer': (props?: object) => any;
  'content-overlay': (props?: object) => any;
  'mixed-menu': (props?: object) => any;
  'side-extra': (props?: object) => any;
  'side-extra-title': (props?: object) => any;
}
</script>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { useAppConfig, useNuxtApp, useRuntimeHook } from '#imports';
import { useMouse, useScroll, useThrottleFn } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useLayoutFooterStyle, useLayoutHeaderStyle } from '../composables/use-dashboard-styles';
import { SCROLL_FIXED_CLASS } from '../composables/use-scroll-lock';
import { ELEMENT_ID_MAIN_CONTENT, P_DASHBOARD_LAYOUT } from '../constants';
import { provideDashboardContext, useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PDashboardLayoutProps>(),
  {
    contentCompact: 'wide',
    contentCompactWidth: 1200,
    contentPadding: 0,
    contentPaddingBottom: 0,
    contentPaddingLeft: 0,
    contentPaddingRight: 0,
    contentPaddingTop: 0,
    isFooterEnable: false,
    isFooterFixed: true,
    footerHeight: 32,
    headerHeight: 50,
    isHeaderHidden: false,
    headerMode: 'fixed',
    showHeaderToggleSidebarButton: true,
    isHeaderVisible: true,
    isMobile: false,
    layout: P_DASHBOARD_LAYOUT.SIDEBAR_NAV,
    showSidebarCollapsedButton: true,
    showSidebarCollapseTitle: false,
    sidebarExtraCollapsedWidth: 60,
    isSidebarFixedButton: true,
    isSidebarHidden: false,
    sidebarMixedWidth: 80,
    sidebarTheme: 'dark',
    sidebarWidth: 180,
    sideCollapseWidth: 60,
    isTabbarEnable: true,
    tabbarHeight: 40,
    zIndex: 200,
  },
);

const emits = defineEmits<PDashboardLayoutEmits>();
defineSlots<PDashboardLayoutSlots>();

const isSidebarCollapse = defineModel<boolean>('isSidebarCollapse', {
  default: false,
});
const isSidebarExtraVisible = defineModel<boolean>('isSidebarExtraVisible');
const isSidebarExtraCollapse = defineModel<boolean>('isSidebarExtraCollapse', {
  default: false,
});
const isSidebarExpandOnHover = defineModel<boolean>('isSidebarExpandOnHover', {
  default: false,
});
const isSidebarEnable = defineModel<boolean>('isSidebarEnable', { default: true });

// Whether side is in hover state to expand the menu
const isSidebarExpandOnHovering = ref(false);
const isHeaderHidden = ref(false);
const contentRef = useTemplateRef('contentRef');

const {
  arrivedState,
  directions,
  isScrolling,
  y: scrollY,
} = useScroll(document);

const { setLayoutHeaderHeight } = useLayoutHeaderStyle();
const { setLayoutFooterHeight } = useLayoutFooterStyle();

const { y: mouseY } = useMouse({
  target: contentRef,
  type: 'client',
});

const currentLayout = computed(() =>
  props.isMobile ? P_DASHBOARD_LAYOUT.SIDEBAR_NAV : props.layout,
);

/**
 * Whether to display content in full screen, without sidebar, footer, header, and tab areas
 */
const isFullContent = computed(() =>
  currentLayout.value === P_DASHBOARD_LAYOUT.FULL_CONTENT,
);

/**
 * Whether it is sidebar mixed mode
 */
const isSidebarMixedNav = computed(() =>
  currentLayout.value === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV,
);

/**
 * Whether it is header navigation mode
 */
const isHeaderNav = computed(() =>
  currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_NAV,
);

/**
 * Whether it is mixed navigation mode
 */
const isMixedNav = computed(() =>
  currentLayout.value === P_DASHBOARD_LAYOUT.MIXED_NAV
  || currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV,
);

/**
 * Whether it is header mixed mode
 */
const isHeaderMixedNav = computed(() =>
  currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV,
);

/**
 * Whether the top bar is automatically hidden
 */
const isHeaderAutoMode = computed(() =>
  props.headerMode === 'auto',
);

const headerWrapperHeight = computed(() => {
  let height = 0;
  if (props.isHeaderVisible && !props.isHeaderHidden) {
    height += props.headerHeight;
  }
  if (props.isTabbarEnable) {
    height += props.tabbarHeight;
  }

  return height;
});

const getSideCollapseWidth = computed(() => {
  const { showSidebarCollapseTitle, sidebarMixedWidth, sideCollapseWidth }
    = props;

  return showSidebarCollapseTitle
    || isSidebarMixedNav.value
    || isHeaderMixedNav.value
    ? sidebarMixedWidth
    : sideCollapseWidth;
});

/**
 * Dynamically get whether the sidebar area is visible
 */
const sidebarEnableState = computed(() => {
  return !isHeaderNav.value && isSidebarEnable.value;
});

/**
 * Sidebar margin top height
 */
const sidebarMarginTop = computed(() => {
  const { headerHeight, isMobile } = props;
  return isMixedNav.value && !isMobile ? headerHeight : 0;
});

/**
 * Dynamically get the sidebar width
 */
const getSidebarWidth = computed(() => {
  const { isMobile, isSidebarHidden, sidebarMixedWidth, sidebarWidth } = props;
  let width = 0;

  if (isSidebarHidden) {
    return width;
  }

  if (
    !sidebarEnableState.value
    || (isSidebarHidden
      && !isSidebarMixedNav.value
      && !isMixedNav.value
      && !isHeaderMixedNav.value)
  ) {
    return width;
  }

  if ((isHeaderMixedNav.value || isSidebarMixedNav.value) && !isMobile) {
    width = sidebarMixedWidth;
  } else if (isSidebarCollapse.value) {
    width = isMobile ? 0 : getSideCollapseWidth.value;
  } else {
    width = sidebarWidth;
  }

  return width;
});

/**
 * Get the width of the extra area
 */
const sidebarExtraWidth = computed(() => {
  const { sidebarExtraCollapsedWidth, sidebarWidth } = props;

  return isSidebarExtraCollapse.value ? sidebarExtraCollapsedWidth : sidebarWidth;
});

/**
 * Whether it is sidebar mode, including mixed sidebar
 */
const isSideMode = computed(
  () =>
    currentLayout.value === P_DASHBOARD_LAYOUT.MIXED_NAV
    || currentLayout.value === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV
    || currentLayout.value === P_DASHBOARD_LAYOUT.SIDEBAR_NAV
    || currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV
    || currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV,
);

/**
 * header fixed value
 */
const headerFixed = computed(() => {
  const { headerMode } = props;
  return (
    isMixedNav.value
    || headerMode === 'fixed'
    || headerMode === 'auto-scroll'
    || headerMode === 'auto'
  );
});

const showSidebar = computed(() => {
  return isSideMode.value && isSidebarEnable.value && !props.isSidebarHidden;
});

/**
 * Mask visibility
 */
const maskVisible = computed(() => !isSidebarCollapse.value && props.isMobile);

const mainStyle = computed(() => {
  let width = '100%';
  let sidebarAndExtraWidth = 'unset';
  if (
    headerFixed.value
    && currentLayout.value !== P_DASHBOARD_LAYOUT.HEADER_NAV
    && currentLayout.value !== P_DASHBOARD_LAYOUT.MIXED_NAV
    && currentLayout.value !== P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV
    && showSidebar.value
    && !props.isMobile
  ) {
    // Effective in fixed mode
    const isSideNavEffective
      = (isSidebarMixedNav.value || isHeaderMixedNav.value)
        && isSidebarExpandOnHover.value
        && isSidebarExtraVisible.value;

    if (isSideNavEffective) {
      const sideCollapseWidth = isSidebarCollapse.value
        ? getSideCollapseWidth.value
        : props.sidebarMixedWidth;
      const sideWidth = isSidebarExtraCollapse.value
        ? props.sidebarExtraCollapsedWidth
        : props.sidebarWidth;

      // 100% - Sidebar mixed width - Menu width
      sidebarAndExtraWidth = `${sideCollapseWidth + sideWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    } else {
      sidebarAndExtraWidth
        = isSidebarExpandOnHovering.value && !isSidebarExpandOnHover.value
          ? `${getSideCollapseWidth.value}px`
          : `${getSidebarWidth.value}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    }
  }
  return {
    sidebarAndExtraWidth,
    width,
  };
});

// Calculate the style of the tabbar
const tabbarStyle = computed<CSSProperties>(() => {
  let width = '';
  let marginLeft = 0;

  // If it is not mixed navigation, the width of the tabbar is 100%
  if (!isMixedNav.value || props.isSidebarHidden) {
    width = '100%';
  } else if (isSidebarEnable.value) {
    // The width when the mouse is on the sidebar and the sidebar is expanded
    const onHoveringWidth = isSidebarExpandOnHover.value
      ? props.sidebarWidth
      : getSideCollapseWidth.value;

    // Set marginLeft, depending on whether the sidebar is collapsed
    marginLeft = isSidebarCollapse.value
      ? getSideCollapseWidth.value
      : onHoveringWidth;

    // Set the width of the tabbar, calculated as 100% minus the width of the sidebar
    width = `calc(100% - ${isSidebarCollapse.value ? getSidebarWidth.value : onHoveringWidth}px)`;
  } else {
    // By default, the width of the tabbar is 100%
    width = '100%';
  }

  return {
    marginLeft: `${marginLeft}px`,
    width,
  };
});

const contentStyle = computed<CSSProperties>(() => {
  const fixed = headerFixed.value;

  const { isFooterEnable, isFooterFixed, footerHeight } = props;
  return {
    marginTop:
      fixed
      && !isFullContent.value
      && !isHeaderHidden.value
      && (!isHeaderAutoMode.value || scrollY.value < headerWrapperHeight.value)
        ? `${headerWrapperHeight.value}px`
        : 0,
    paddingBottom: `${isFooterEnable && isFooterFixed ? footerHeight : 0}px`,
  };
});

const headerZIndex = computed(() => {
  const { zIndex } = props;
  const offset = isMixedNav.value ? 1 : 0;
  return zIndex + offset;
});

const headerWrapperStyle = computed<CSSProperties>(() => {
  const fixed = headerFixed.value;

  return {
    'height': isFullContent.value ? '0' : `${headerWrapperHeight.value}px`,
    'left': isMixedNav.value ? 0 : mainStyle.value.sidebarAndExtraWidth,
    'position': fixed ? 'fixed' : 'static',
    'top':
      isHeaderHidden.value || isFullContent.value
        ? `-${headerWrapperHeight.value}px`
        : 0,
    'width': mainStyle.value.width,
    'z-index': headerZIndex.value,
  };
});

/**
 * Sidebar z-index
 */
const sidebarZIndex = computed(() => {
  const { isMobile, zIndex } = props;
  let offset = isMobile || isSideMode.value ? 1 : -1;

  if (isMixedNav.value) {
    offset += 1;
  }

  return zIndex + offset;
});

const footerWidth = computed(() => {
  if (!props.isFooterFixed) {
    return '100%';
  }

  return mainStyle.value.width;
});

const maskStyle = computed<CSSProperties>(() => {
  return { zIndex: props.zIndex };
});

const showHeaderToggleButton = computed(() => {
  return (
    props.isMobile
    || (props.showHeaderToggleSidebarButton
      && isSideMode.value
      && !isSidebarMixedNav.value
      && !isMixedNav.value
      && !props.isMobile)
  );
});

const showHeaderLogo = computed(() => {
  return !isSideMode.value || isMixedNav.value || props.isMobile;
});

watch(
  () => props.isMobile,
  (val) => {
    if (val) {
      isSidebarCollapse.value = true;
    }
  },
  {
    immediate: true,
  },
);

watch(
  [
    () => headerWrapperHeight.value,
    () => isFullContent.value,
  ],
  ([height]) => {
    setLayoutHeaderHeight(isFullContent.value ? 0 : height);
  },
  {
    immediate: true,
  },
);

watch(
  () => props.footerHeight,
  (height: number) => {
    setLayoutFooterHeight(height);
  },
  {
    immediate: true,
  },
);

{
  function mouseMove() {
    if (mouseY.value > headerWrapperHeight.value) {
      isHeaderHidden.value = true;
    } else {
      isHeaderHidden.value = false;
    }
  }

  watch(
    [() => props.headerMode, () => mouseY.value],
    () => {
      if (!isHeaderAutoMode.value || isMixedNav.value || isFullContent.value) {
        if (props.headerMode !== 'auto-scroll') {
          isHeaderHidden.value = false;
        }
        return;
      }
      isHeaderHidden.value = true;
      mouseMove();
    },
    {
      immediate: true,
    },
  );
}

{
  const checkHeaderIsHidden = useThrottleFn((top, bottom, topArrived) => {
    if (scrollY.value < headerWrapperHeight.value) {
      isHeaderHidden.value = false;
      return;
    }

    if (topArrived) {
      isHeaderHidden.value = false;
      return;
    }

    if (top) {
      isHeaderHidden.value = false;
    } else if (bottom) {
      isHeaderHidden.value = true;
    }
  }, 300);

  watch(
    () => scrollY.value,
    () => {
      if (
        props.headerMode !== 'auto-scroll'
        || isMixedNav.value
        || isFullContent.value
      ) {
        return;
      }
      if (isScrolling.value) {
        checkHeaderIsHidden(
          directions.top,
          directions.bottom,
          arrivedState.top,
        );
      }
    },
  );
}

function handleHeaderToggle() {
  if (props.isMobile) {
    isSidebarCollapse.value = false;
  } else {
    emits('toggleSidebar');
  }
}

function handleClickMask() {
  isSidebarCollapse.value = true;
}

const nuxtApp = useNuxtApp();

provideDashboardContext({
  collapseSidebar: (collapsed: boolean) => {
    nuxtApp.hooks.callHook('dashboard:sidebar:collapse', collapsed);
  },
  sidebarCollapsed: isSidebarCollapse,
});

useRuntimeHook('dashboard:sidebar:collapse', (value: boolean) => {
  isSidebarCollapse.value = value;
});

const appConfig = useAppConfig() as DashboardLayout['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayout || {}),
  })(),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <slot name="sidebar">
      <PDashboardSidebar
        v-if="sidebarEnableState"
        v-model:is-collapse="isSidebarCollapse"
        v-model:is-expand-on-hover="isSidebarExpandOnHover"
        v-model:is-expand-on-hovering="isSidebarExpandOnHovering"
        v-model:is-extra-collapse="isSidebarExtraCollapse"
        v-model:is-extra-visible="isSidebarExtraVisible"
        :show-collapse-button="showSidebarCollapsedButton"
        :show-fixed-button="isSidebarFixedButton"
        :collapse-width="getSideCollapseWidth"
        :is-hidden-side-visible="!isMobile"
        :extra-width="sidebarExtraWidth"
        :is-fixed-extra="isSidebarExpandOnHover"
        :header-height="isMixedNav ? 0 : headerHeight"
        :is-sidebar-mixed="isSidebarMixedNav || isHeaderMixedNav"
        :margin-top="sidebarMarginTop"
        :mixed-width="sidebarMixedWidth"
        :is-showing="showSidebar"
        :theme="sidebarTheme"
        :width="getSidebarWidth"
        :z-index="sidebarZIndex"
        @leave="() => emits('sideMouseLeave')"
      >
        <template
          v-if="isSideMode && !isMixedNav"
          #logo
        >
          <slot name="logo" />
        </template>

        <template v-if="isSidebarMixedNav || isHeaderMixedNav">
          <slot name="mixed-menu" />
        </template>

        <template v-else>
          <slot name="menu" />
        </template>

        <template #extra>
          <slot name="side-extra" />
        </template>

        <template #extra-title>
          <slot name="side-extra-title" />
        </template>
      </PDashboardSidebar>
    </slot>

    <div
      ref="contentRef"
      :class="pohon.content({ class: [props.pohon?.content] })"
    >
      <div
        :class="[
          {
            'shadow-[0_16px_24px_hsl(var(--kuli-color-background))]': scrollY > 20,
          },
          SCROLL_FIXED_CLASS,
        ]"
        :style="headerWrapperStyle"
        class="transition-all-200 overflow-hidden"
      >
        <PDashboardHeader
          v-if="isHeaderVisible"
          :full-width="!isSideMode"
          :height="headerHeight"
          :is-mobile="isMobile"
          :show="!isFullContent && !isHeaderHidden"
          :sidebar-width="sidebarWidth"
          :theme="headerTheme"
          :width="mainStyle.width"
          :z-index="headerZIndex"
        >
          <template
            v-if="showHeaderLogo"
            #logo
          >
            <slot name="logo" />
          </template>

          <template #toggle-button>
            <!-- <PButtonIcon
              v-if="showHeaderToggleButton"
              class="my-0 mr-1"
              icon="i-lucide:menu"
              @click="handleHeaderToggle"
            /> -->
          </template>

          <slot name="header" />
        </PDashboardHeader>

        <!-- <LayoutTabbar
          v-if="tabbarEnable"
          :height="tabbarHeight"
          :style="tabbarStyle"
        >
          <slot name="tabbar" />
        </LayoutTabbar> -->
      </div>

      <PDashboardContent
        :id="ELEMENT_ID_MAIN_CONTENT"
        :content-compact="contentCompact"
        :content-compact-width="contentCompactWidth"
        :padding="contentPadding"
        :padding-bottom="contentPaddingBottom"
        :padding-left="contentPaddingLeft"
        :padding-right="contentPaddingRight"
        :padding-top="contentPaddingTop"
        :style="contentStyle"
        class="transition-margin-200"
      >
        <slot name="content" />

        <template #overlay>
          <slot name="content-overlay" />
        </template>
      </PDashboardContent>

      <PDashboardFooter
        v-if="isFooterEnable"
        :fixed="isFooterFixed"
        :height="footerHeight"
        :show="!isFullContent"
        :width="footerWidth"
        :z-index="zIndex"
      >
        <slot name="footer" />
      </PDashboardFooter>
    </div>

    <slot name="extra" />

    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="bg-overlay h-full w-full transition-[background-color]-200 left-0 top-0 fixed"
      @click="handleClickMask"
    />
  </APrimitive>
</template>
