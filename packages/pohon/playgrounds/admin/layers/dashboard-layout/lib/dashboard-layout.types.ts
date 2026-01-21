import type { PDashboardMenuItem } from 'pohon-ui';

export type PDashboardLayoutType
  = | 'full-content'
    | 'header-mixed-nav'
    | 'header-nav'
    | 'header-sidebar-nav'
    | 'mixed-nav'
    | 'sidebar-mixed-nav'
    | 'sidebar-nav';

export type PDashboardContentCompactType = 'compact' | 'wide';

export type PDashboardLayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static';

export type PDashboardThemeModeType = 'auto' | 'dark' | 'light';

export interface DashboardLayoutProps {
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
}

export interface DashboardMenuRecord extends Pick<PDashboardMenuItem, 'icon' | 'activeIcon' | 'title' | 'path'> {
  children?: Array<DashboardMenuRecord>;
  /**
   * Order number
   */
  order?: number;
  /**
   * Parent path
   */
  parent?: string;
  /**
   * All parent paths
   */
  parents?: Array<string>;
  /**
   * Whether to show the menu
   * @default true
   */
  show?: boolean;
}
