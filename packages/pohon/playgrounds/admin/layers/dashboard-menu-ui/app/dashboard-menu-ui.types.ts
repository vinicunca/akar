import type { Component, Ref } from 'vue';
import type { PDashboardThemeModeType } from '~~/layers/dashboard-layout-ui/app/dashboard-layout-ui.types';

export interface DashboardMenuUiBadge {
  /**
   * Badge
   */
  badge?: string;
  /**
   * Badge type
   */
  badgeType?: 'dot' | 'normal';
  /**
   * Badge color
   */
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * Menu record object
 */
export interface DashboardMenuUiRecord extends DashboardMenuUiBadge {
  /**
   * Icon name when active
   */
  activeIcon?: string;
  /**
   * Submenus
   */
  children?: Array<DashboardMenuUiRecord>;
  /**
   * Whether the menu is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon name
   */
  icon?: Component | string;
  /**
   * Menu name
   */
  name: string;
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
   * Menu path, unique, can be used as a key
   */
  path: string;
  /**
   * Whether to show the menu
   * @default true
   */
  show?: boolean;
}

export interface DashboardMenuUiProps {
  /**
   * Whether to enable accordion mode
   * @default true
   */
  accordion?: boolean;
  /**
   * Whether the menu is collapsed
   * @default false
   */
  collapse?: boolean;
  /**
   * Whether to show menu names when the menu is collapsed
   * @default false
   */
  collapseShowTitle?: boolean;
  /**
   * Default active menu
   */
  defaultActive?: string;
  /**
   * Default expanded menus
   */
  defaultOpeneds?: Array<string>;
  /**
   * Menu mode
   * @default vertical
   */
  mode?: 'horizontal' | 'vertical';
  /**
   * Whether to use rounded style
   * @default true
   */
  rounded?: boolean;
  /**
   * Whether to automatically scroll to the active menu item
   * @default false
   */
  scrollToActive?: boolean;
  /**
   * Menu theme
   * @default dark
   */
  theme?: PDashboardThemeModeType;
}

export interface DashboardMenuUiSubMenuProps extends DashboardMenuUiBadge {
  /**
   * Active icon
   */
  activeIcon?: string;
  /**
   * Whether it is disabled
   */
  disabled?: boolean;
  /**
   * Icon
   */
  icon?: Component | string;
  /**
   * Submenu name
   */
  path: string;
}

export interface DashboardMenuUiMenuItemProps extends DashboardMenuUiBadge {
  /**
   * Active icon
   */
  activeIcon?: string;
  /**
   * Whether it is disabled
   */
  disabled?: boolean;
  /**
   * Icon
   */
  icon?: Component | string;
  /**
   * Menu item name
   */
  path: string;
}

export interface DashboardMenuUiMenuItemRegistered {
  active: boolean;
  parentPaths: Array<string>;
  path: string;
}

export interface DashboardMenuUiMenuItemPayload {
  parentPaths: Array<string>;
  path: string;
}

export interface DashboardMenuUiMenuProvider {
  activePath?: string;
  addMenuItem: (item: DashboardMenuUiMenuItemRegistered) => void;
  addSubMenu: (item: DashboardMenuUiMenuItemRegistered) => void;
  closeMenu: (item: DashboardMenuUiMenuItemPayload) => void;
  handleMenuItemClick: (item: DashboardMenuUiMenuItemPayload) => void;
  handleSubMenuClick: (subMenu: DashboardMenuUiMenuItemRegistered) => void;
  isMenuPopup: boolean;
  items: Record<string, DashboardMenuUiMenuItemRegistered>;
  openedMenus: Array<string>;
  openMenu: (params: DashboardMenuUiMenuItemPayload) => void;
  props: DashboardMenuUiProps;
  removeMenuItem: (item: DashboardMenuUiMenuItemRegistered) => void;
  removeSubMenu: (item: DashboardMenuUiMenuItemRegistered) => void;
  subMenus: Record<string, DashboardMenuUiMenuItemRegistered>;
  theme: string;
}

export interface DashboardMenuUiSubMenuProvider {
  addSubMenu: (item: DashboardMenuUiMenuItemRegistered) => void;
  handleMouseleave?: (deepDispatch: boolean) => void;
  level: number;
  mouseInChild: Ref<boolean>;
  removeSubMenu: (item: DashboardMenuUiMenuItemRegistered) => void;
}
