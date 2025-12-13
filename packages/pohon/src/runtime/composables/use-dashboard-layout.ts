import type { PDashboardLayoutProps, PDashboardLayoutType } from '../types';
import { computed } from 'vue';
import { P_DASHBOARD_LAYOUT } from '../constants';

export function useLayout(props: PDashboardLayoutProps) {
  const currentLayout = computed(() =>
    props.isMobile
      ? P_DASHBOARD_LAYOUT.SIDEBAR_NAV
      : (props.layout as PDashboardLayoutType),
  );

  /**
   * Whether to display content in full screen, without sidebar, footer, header, and tab areas
   */
  const isFullContent = computed(() => currentLayout.value === P_DASHBOARD_LAYOUT.FULL_CONTENT);

  /**
   * Whether it is sidebar mixed mode
   */
  const isSidebarMixedNav = computed(
    () => currentLayout.value === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV,
  );

  /**
   * Whether it is header navigation mode
   */
  const isHeaderNav = computed(() => currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_NAV);

  /**
   * Whether it is mixed navigation mode
   */
  const isMixedNav = computed(
    () =>
      currentLayout.value === P_DASHBOARD_LAYOUT.MIXED_NAV
      || currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_SIDEBAR_NAV,
  );

  /**
   * Whether it is header mixed mode
   */
  const isHeaderMixedNav = computed(
    () => currentLayout.value === P_DASHBOARD_LAYOUT.HEADER_MIXED_NAV,
  );

  return {
    currentLayout,
    isFullContent,
    isHeaderMixedNav,
    isHeaderNav,
    isMixedNav,
    isSidebarMixedNav,
  };
}
