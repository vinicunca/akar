/** Height of the layout content component */
import type { Ref } from 'vue';
import type { UseResizableProps } from '../composables/use-resizable';
import { createContext } from 'reka-ui';

export const CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT = '--pohon-content-height';
/** Width of the layout content component */
export const CSS_VARIABLE_LAYOUT_CONTENT_WIDTH = '--pohon-content-width';
/** Height of the layout header component */
export const CSS_VARIABLE_LAYOUT_HEADER_HEIGHT = '--pohon-header-height';
/** Height of the layout footer component */
export const CSS_VARIABLE_LAYOUT_FOOTER_HEIGHT = '--pohon-footer-height';

/** Component ID of the content area */
export const ELEMENT_ID_MAIN_CONTENT = '__pohon_main_content';

export const P_DASHBOARD_LAYOUT = {
  FULL_CONTENT: 'full-content',
  SIDEBAR_NAV: 'sidebar-nav',
  SIDEBAR_MIXED_NAV: 'sidebar-mixed-nav',
  HEADER_NAV: 'header-nav',
  HEADER_MIXED_NAV: 'header-mixed-nav',
  HEADER_SIDEBAR_NAV: 'header-sidebar-nav',
  MIXED_NAV: 'mixed-nav',
} as const;

export type PDashboardLayoutType = (typeof P_DASHBOARD_LAYOUT)[keyof typeof P_DASHBOARD_LAYOUT];

export interface DashboardContext extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'persistent' | 'unit'> {
  sidebarOpen?: Ref<boolean>;
  sidebarCollapsed?: Ref<boolean>;
  toggleSearch?: () => void;
  toggleSidebar?: () => void;
  collapseSidebar?: (collapsed: boolean) => void;
}

export const [useDashboard, provideDashboardContext] = createContext<DashboardContext>('DashboardGroup');
