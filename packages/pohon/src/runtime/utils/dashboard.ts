import type { Ref } from 'vue';
import type { UseResizableProps } from '../composables/use-resizable';
import { createContext } from 'akar';

export interface DashboardContext extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'persistent' | 'unit'> {
  sidebarOpen?: Ref<boolean>;
  sidebarCollapsed?: Ref<boolean>;
  toggleSearch?: () => void;
  toggleSidebar?: () => void;
  collapseSidebar?: (collapsed: boolean) => void;
}

export const [useDashboard, provideDashboardContext] = createContext<DashboardContext>('DashboardGroup');

/** Height of the layout content component */
export const CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT = '--pohon-content-height';
/** Width of the layout content component */
export const CSS_VARIABLE_LAYOUT_CONTENT_WIDTH = '--pohon-content-width';
/** Height of the layout header component */
export const CSS_VARIABLE_LAYOUT_HEADER_HEIGHT = '--pohon-header-height';
/** Height of the layout footer component */
export const CSS_VARIABLE_LAYOUT_FOOTER_HEIGHT = '--pohon-footer-height';

/** Component ID of the content area */
export const ELEMENT_ID_MAIN_CONTENT = '__pohon_main_content';
