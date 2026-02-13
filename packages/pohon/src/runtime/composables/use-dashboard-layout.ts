import type { PDashboardLayoutProps, PDashboardLayoutType } from '../types';
import { computed } from 'vue';
import { P_DASHBOARD_LAYOUT } from '../utils/dashboard';

export function useDashboardLayout(props: PDashboardLayoutProps) {
  const currentLayout = computed(() =>
    props.isMobile ? 'sidebar-nav' : (props.layout as PDashboardLayoutType),
  );

  /**
   * Whether to display content in full screen, without sidebar, footer, header, and tab areas
   */
  const isFullContent = computed(() => currentLayout.value === 'full-content');

  /**
   * Whether it is sidebar mixed mode
   */
  const isSidebarMixedNav = computed(
    () => currentLayout.value === P_DASHBOARD_LAYOUT.SIDEBAR_MIXED_NAV,
  );

  /**
   * Whether it is header navigation mode
   */
  const isHeaderNav = computed(() => currentLayout.value === 'header-nav');

  /**
   * Whether it is mixed navigation mode
   */
  const isMixedNav = computed(
    () =>
      currentLayout.value === 'mixed-nav'
      || currentLayout.value === 'header-sidebar-nav',
  );

  /**
   * Whether it is header mixed mode
   */
  const isHeaderMixedNav = computed(
    () => currentLayout.value === 'header-mixed-nav',
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
