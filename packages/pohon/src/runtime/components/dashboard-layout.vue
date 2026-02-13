<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  PDashboardContentCompactType,
  PDashboardLayoutHeaderModeType,
  PDashboardLayoutType,
  PDashboardThemeModeType,
} from '../types/dashboard';
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
  footerEnable?: boolean;
  /**
   * Whether the footer is fixed
   * @default true
   */
  footerFixed?: boolean;
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
  headerHidden?: boolean;
  /**
   * Header display mode
   * @default 'fixed'
   */
  headerMode?: PDashboardLayoutHeaderModeType;
  /**
   * Header theme
   */
  headerTheme?: PDashboardThemeModeType;
  /**
   * Whether to show the button to toggle the sidebar in the header
   * @default
   */
  showHeaderToggleSidebarButton?: boolean;
  /**
   * Whether the header is visible
   * @default true
   */
  showHeader?: boolean;
  /**
   * Whether to display on mobile
   * @default false
   */
  isMobile?: boolean;
  /**
   * Layout type
   * P_DASHBOARD_LAYOUT.SIDEBAR_NAV: Sidebar menu layout
   * P_DASHBOARD_LAYOUT.HEADER_NAV: Top menu layout
   * P_DASHBOARD_LAYOUT.MIXED_NAV: Sidebar & top menu layout
   * P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV: Sidebar mixed menu layout
   * P_DASHBOARD_LAYOUT.FULL_CONTENT: Full screen content layout
   * @default sidebar-nav
   */
  layout?: PDashboardLayoutType;
  /**
   * Sidebar collapse state
   * @default false
   */
  sidebarCollapsed?: boolean;
  /**
   * Whether to show the button to collapse the sidebar
   * @default true
   */
  sidebarShowCollapsedButton?: boolean;
  /**
   * Whether to show the title when the sidebar is collapsed
   * @default true
   */
  sidebarCollapsedShowTitle?: boolean;
  /**
   * Whether the sidebar is enabled
   * @default true
   */
  sidebarEnabled?: boolean;
  /**
   * Extra width when the sidebar is collapsed
   * @default 48
   */
  sidebarExtraCollapsedWidth?: number;
  /**
   * Whether the side menu collapse button is fixed
   * @default true
   */
  sidebarShowFixedButton?: boolean;
  /**
   * Whether the sidebar is hidden
   * @default false
   */
  sidebarHidden?: boolean;
  /**
   * Width of the mixed sidebar
   * @default 80
   */
  sidebarMixedWidth?: number;
  /**
   * Sidebar theme
   * @default dark
   */
  sidebarTheme?: PDashboardThemeModeType;
  /**
   * Sidebar width
   * @default 210
   */
  sidebarWidth?: number;
  /**
   * Sidebar collapse width
   * @default 48
   */
  sidebarCollapsedWidth?: number;
  /**
   * Whether the tab bar is enabled
   * @default true
   */
  tabbarEnable?: boolean;
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

  class?: any;
}

export interface PDashboardLayoutSlots {
  'logo': (props?: object) => any;
  'mixed-menu': (props?: object) => any;
  'menu': (props?: object) => any;
  'side-extra': (props?: object) => any;
  'side-extra-title': (props?: object) => any;
  'header': (props?: object) => any;
  'tabbar': (props?: object) => any;
  'content': (props?: object) => any;
  'content-overlay': (props?: object) => any;
  'footer': (props?: object) => any;
  'extra': (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useAppConfig } from '#imports';
import { useMouse, useScroll, useThrottleFn } from '@vueuse/core';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useDashboardLayout } from '../composables/use-dashboard-layout';
import {
  useDashboardLayoutFooterStyle,
  useDashboardLayoutHeaderStyle,
} from '../composables/use-dashboard-layout-style';
import { ELEMENT_ID_MAIN_CONTENT } from '../utils/dashboard';
import { P_DASHBOARD_LAYOUT } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PDashboardLayoutContent from './dashboard-layout-content.vue';
import PDashboardLayoutFooter from './dashboard-layout-footer.vue';
import PDashboardLayoutHeader from './dashboard-layout-header.vue';
import PDashboardLayoutSidebar from './dashboard-layout-sidebar.vue';
import PDashboardLayoutTabbar from './dashboard-layout-tabbar.vue';

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
    footerEnable: false,
    footerFixed: true,
    footerHeight: 32,
    headerHeight: 50,
    headerHidden: false,
    headerMode: 'fixed',
    showHeaderToggleSidebarButton: true,
    showHeader: true,
    isMobile: false,
    layout: 'sidebar-nav',
    sidebarShowCollapsedButton: true,
    sidebarCollapsedShowTitle: false,
    sidebarExtraCollapsedWidth: 60,
    sidebarShowFixedButton: true,
    sidebarHidden: false,
    sidebarMixedWidth: 80,
    sidebarTheme: 'dark',
    sidebarWidth: 180,
    sidebarCollapsedWidth: 60,
    tabbarEnable: true,
    tabbarHeight: 40,
    zIndex: 200,
  },
);

const emits = defineEmits<{
  sideMouseLeave: [];
  toggleSidebar: [];
}>();

defineSlots<PDashboardLayoutSlots>();

const sidebarCollapsed = defineModel<boolean>('sidebarCollapsed', {
  default: false,
});
const isSidebarExtraVisible = defineModel<boolean>('isSidebarExtraVisible');
const sidebarExtraCollapsed = defineModel<boolean>('sidebarExtraCollapsed', {
  default: false,
});
const sidebarExpandChildrenOnHover = defineModel<boolean>('sidebarExpandChildrenOnHover', {
  default: false,
});
const sidebarEnabled = defineModel<boolean>('sidebarEnabled', { default: true });

// Whether side is in hover state to expand the menu
const sidebarExpandOnHovering = ref(false);
const headerIsHidden = ref(false);
const contentRef = useTemplateRef('contentRef');

const {
  arrivedState,
  directions,
  isScrolling,
  y: scrollY,
} = useScroll(document);

const { setLayoutHeaderHeight } = useDashboardLayoutHeaderStyle();
const { setLayoutFooterHeight } = useDashboardLayoutFooterStyle();

const { y: mouseY } = useMouse({
  target: contentRef,
  type: 'client',
});

const {
  currentLayout,
  isFullContent,
  isHeaderMixedNav,
  isHeaderNav,
  isMixedNav,
  isSidebarMixedNav,
} = useDashboardLayout(props);

/**
 * Whether the top bar is automatically hidden
 */
const isHeaderAutoMode = computed(() => props.headerMode === 'auto');

const headerWrapperHeight = computed(() => {
  let height = 0;
  if (props.showHeader && !props.headerHidden) {
    height += props.headerHeight;
  }
  if (props.tabbarEnable) {
    height += props.tabbarHeight;
  }
  return height;
});

const getSideCollapseWidth = computed(() => {
  const { sidebarCollapsedShowTitle, sidebarMixedWidth, sidebarCollapsedWidth }
    = props;

  return sidebarCollapsedShowTitle
    || isSidebarMixedNav.value
    || isHeaderMixedNav.value
    ? sidebarMixedWidth
    : sidebarCollapsedWidth;
});

/**
 * Dynamically get whether the sidebar area is visible
 */
const sidebarEnableState = computed(() => {
  return !isHeaderNav.value && sidebarEnabled.value;
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
  const { isMobile, sidebarHidden, sidebarMixedWidth, sidebarWidth } = props;
  let width = 0;

  if (sidebarHidden) {
    return width;
  }

  if (
    !sidebarEnableState.value
    || (sidebarHidden
      && !isSidebarMixedNav.value
      && !isMixedNav.value
      && !isHeaderMixedNav.value)
  ) {
    return width;
  }

  if ((isHeaderMixedNav.value || isSidebarMixedNav.value) && !isMobile) {
    width = sidebarMixedWidth;
  } else if (sidebarCollapsed.value) {
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

  return sidebarExtraCollapsed.value ? sidebarExtraCollapsedWidth : sidebarWidth;
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
  return isSideMode.value && sidebarEnabled.value && !props.sidebarHidden;
});

/**
 * Mask visibility
 */
const maskVisible = computed(() => !sidebarCollapsed.value && props.isMobile);

const mainStyle = computed(() => {
  let width = '100%';
  let sidebarAndExtraWidth = 'unset';
  if (
    headerFixed.value
    && currentLayout.value !== 'header-nav'
    && currentLayout.value !== 'mixed-nav'
    && currentLayout.value !== 'header-sidebar-nav'
    && showSidebar.value
    && !props.isMobile
  ) {
    // Effective in fixed mode
    const isSideNavEffective
      = (isSidebarMixedNav.value || isHeaderMixedNav.value)
        && sidebarExpandChildrenOnHover.value
        && isSidebarExtraVisible.value;

    if (isSideNavEffective) {
      const sidebarCollapsedWidth = sidebarCollapsed.value
        ? getSideCollapseWidth.value
        : props.sidebarMixedWidth;
      const sideWidth = sidebarExtraCollapsed.value
        ? props.sidebarExtraCollapsedWidth
        : props.sidebarWidth;

      // 100% - Sidebar mixed width - Menu width
      sidebarAndExtraWidth = `${sidebarCollapsedWidth + sideWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    } else {
      sidebarAndExtraWidth
        = sidebarExpandOnHovering.value && !sidebarExpandChildrenOnHover.value
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
  if (!isMixedNav.value || props.sidebarHidden) {
    width = '100%';
  } else if (sidebarEnabled.value) {
    // The width when the mouse is on the sidebar and the sidebar is expanded
    const onHoveringWidth = sidebarExpandChildrenOnHover.value
      ? props.sidebarWidth
      : getSideCollapseWidth.value;

    // Set marginLeft, depending on whether the sidebar is collapsed
    marginLeft = sidebarCollapsed.value
      ? getSideCollapseWidth.value
      : onHoveringWidth;

    // Set the width of the tabbar, calculated as 100% minus the width of the sidebar
    width = `calc(100% - ${sidebarCollapsed.value ? getSidebarWidth.value : onHoveringWidth}px)`;
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

  const { footerEnable, footerFixed, footerHeight } = props;
  return {
    marginTop:
      fixed
      && !isFullContent.value
      && !headerIsHidden.value
      && (!isHeaderAutoMode.value || scrollY.value < headerWrapperHeight.value)
        ? `${headerWrapperHeight.value}px`
        : 0,
    paddingBottom: `${footerEnable && footerFixed ? footerHeight : 0}px`,
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
      headerIsHidden.value || isFullContent.value
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
  if (!props.footerFixed) {
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
      sidebarCollapsed.value = true;
    }
  },
  {
    immediate: true,
  },
);

watch(
  [() => headerWrapperHeight.value, () => isFullContent.value],
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
      headerIsHidden.value = true;
    } else {
      headerIsHidden.value = false;
    }
  }

  watch(
    [() => props.headerMode, () => mouseY.value],
    () => {
      if (!isHeaderAutoMode.value || isMixedNav.value || isFullContent.value) {
        if (props.headerMode !== 'auto-scroll') {
          headerIsHidden.value = false;
        }
        return;
      }
      headerIsHidden.value = true;
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
      headerIsHidden.value = false;
      return;
    }

    if (topArrived) {
      headerIsHidden.value = false;
      return;
    }

    if (top) {
      headerIsHidden.value = false;
    } else if (bottom) {
      headerIsHidden.value = true;
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
    sidebarCollapsed.value = false;
  } else {
    emits('toggleSidebar');
  }
}

function handleClickMask() {
  sidebarCollapsed.value = true;
}

const appConfig = useAppConfig() as DashboardLayout['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardLayout || {}),
  })(),
);
</script>

<template>
  <div :class="pohon.root({ class: [props.class] })">
    <PDashboardLayoutSidebar
      v-if="sidebarEnableState"
      v-model:collapsed="sidebarCollapsed"
      v-model:expand-children-on-hover="sidebarExpandChildrenOnHover"
      v-model:expand-on-hovering="sidebarExpandOnHovering"
      v-model:extra-collapse="sidebarExtraCollapsed"
      v-model:extra-visible="isSidebarExtraVisible"
      :show-collapse-button="props.sidebarShowCollapsedButton"
      :show-fixed-button="props.sidebarShowFixedButton"
      :collapsed-width="getSideCollapseWidth"
      :dom-visible="!props.isMobile"
      :extra-width="sidebarExtraWidth"
      :fixed-extra="sidebarExpandChildrenOnHover"
      :header-height="isMixedNav ? 0 : props.headerHeight"
      :is-sidebar-mixed="isSidebarMixedNav || isHeaderMixedNav"
      :margin-top="sidebarMarginTop"
      :mixed-width="props.sidebarMixedWidth"
      :show="showSidebar"
      :theme="props.sidebarTheme"
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
    </PDashboardLayoutSidebar>

    <div
      ref="contentRef"
      class="flex flex-1 flex-col transition-all-300 ease-in overflow-hidden"
    >
      <div
        :class="[
          {
            'shadow-[0_16px_24px_hsl(var(--pohon-color-background))]': scrollY > 20,
          },
        ]"
        :style="headerWrapperStyle"
        class="transition-all-200 overflow-hidden"
      >
        <PDashboardLayoutHeader
          v-if="props.showHeader"
          :full-width="!isSideMode"
          :height="props.headerHeight"
          :is-mobile="props.isMobile"
          :show="!isFullContent && !props.headerHidden"
          :sidebar-width="props.sidebarWidth"
          :theme="props.headerTheme"
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
            <PButton
              v-if="showHeaderToggleButton"
              class="mr-2"
              icon="i-lucide:menu"
              color="neutral"
              variant="ghost"
              @click="handleHeaderToggle"
            />
          </template>

          <slot name="header" />
        </PDashboardLayoutHeader>

        <PDashboardLayoutTabbar
          v-if="props.tabbarEnable"
          :height="props.tabbarHeight"
          :style="tabbarStyle"
        >
          <slot name="tabbar" />
        </PDashboardLayoutTabbar>
      </div>

      <PDashboardLayoutContent
        :id="ELEMENT_ID_MAIN_CONTENT"
        :content-compact="props.contentCompact"
        :content-compact-width="props.contentCompactWidth"
        :padding="props.contentPadding"
        :padding-bottom="props.contentPaddingBottom"
        :padding-left="props.contentPaddingLeft"
        :padding-right="props.contentPaddingRight"
        :padding-top="props.contentPaddingTop"
        :style="contentStyle"
        class="transition-margin-200"
      >
        <slot name="content" />

        <template #overlay>
          <slot name="content-overlay" />
        </template>
      </PDashboardLayoutContent>

      <PDashboardLayoutFooter
        v-if="props.footerEnable"
        :fixed="props.footerFixed"
        :height="props.footerHeight"
        :show="!isFullContent"
        :width="footerWidth"
        :z-index="props.zIndex"
      >
        <slot name="footer" />
      </PDashboardLayoutFooter>
    </div>

    <slot name="extra" />

    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="bg-overlay h-full w-full transition-[background-color]-200 left-0 top-0 fixed"
      @click="handleClickMask"
    />
  </div>
</template>
