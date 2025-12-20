import type { DashboardLayoutProps, PDashboardLayoutType } from './dashboard-layout.types';
import { computed } from 'vue';

export function useDashboardLayout(props: DashboardLayoutProps) {
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
    () => currentLayout.value === 'sidebar-mixed-nav',
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
