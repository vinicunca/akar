import type { Component, Ref } from 'vue';
import type { PDashboardThemeModeType } from '~~/layers/dashboard-layout/app/dashboard-layout.types';

export interface DashboardMenuBadge {
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
export interface DashboardMenuRecord extends DashboardMenuBadge {
  /**
   * Icon name when active
   */
  activeIcon?: string;
  /**
   * Submenus
   */
  children?: Array<DashboardMenuRecord>;
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

export interface DashboardMenuProps {
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

export interface DashboardMenuSubMenuProps extends DashboardMenuBadge {
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

export interface DashboardMenuMenuItemProps extends DashboardMenuBadge {
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

export interface DashboardMenuMenuItemRegistered {
  active: boolean;
  parentPaths: Array<string>;
  path: string;
}

export interface DashboardMenuMenuItemPayload {
  parentPaths: Array<string>;
  path: string;
}

export interface DashboardMenuMenuProvider {
  activePath?: string;
  addMenuItem: (item: DashboardMenuMenuItemRegistered) => void;
  addSubMenu: (item: DashboardMenuMenuItemRegistered) => void;
  closeMenu: (item: DashboardMenuMenuItemPayload) => void;
  handleMenuItemClick: (item: DashboardMenuMenuItemPayload) => void;
  handleSubMenuClick: (subMenu: DashboardMenuMenuItemRegistered) => void;
  isMenuPopup: boolean;
  items: Record<string, DashboardMenuMenuItemRegistered>;
  openedMenus: Array<string>;
  openMenu: (params: DashboardMenuMenuItemPayload) => void;
  props: DashboardMenuProps;
  removeMenuItem: (item: DashboardMenuMenuItemRegistered) => void;
  removeSubMenu: (item: DashboardMenuMenuItemRegistered) => void;
  subMenus: Record<string, DashboardMenuMenuItemRegistered>;
  theme: string;
}

export interface DashboardMenuSubMenuProvider {
  addSubMenu: (item: DashboardMenuMenuItemRegistered) => void;
  handleMouseleave?: (deepDispatch: boolean) => void;
  level: number;
  mouseInChild: Ref<boolean>;
  removeSubMenu: (item: DashboardMenuMenuItemRegistered) => void;
}
