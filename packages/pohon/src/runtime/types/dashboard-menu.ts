import type { Component, Ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import type { PIconProps } from './';
import type { PDashboardThemeModeType } from './dashboard';

/**
 * Extended route record object
 */
export type ExtendedRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: Array<string>;
  path?: any;
};

export interface PDashboardMenuBadgeRaw {
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
export interface PDashboardMenuRaw extends PDashboardMenuBadgeRaw {
  /**
   * Icon name when active
   */
  activeIcon?: string;
  /**
   * Submenus
   */
  children?: Array<PDashboardMenuRaw>;
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

export interface PDashboardMenuProps {
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

export interface PDashboardSubMenuProps extends PDashboardMenuBadgeRaw {
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

export interface PDashboardMenuItemBaseProps extends PDashboardMenuBadgeRaw {
  /**
   * Active icon
   */
  activeIcon?: string;
  /**
   * Whether it is disabled
   */
  disabled?: boolean;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * Menu item name
   */
  path: string;
}

export interface PDashboardMenuItemRegistered {
  active: boolean;
  parentPaths: Array<string>;
  path: string;
}

export interface PDashboardMenuItemPayload {
  parentPaths: Array<string>;
  path: string;
}

export interface PDashboardMenuProvider {
  activePath?: string;
  addMenuItem: (item: PDashboardMenuItemRegistered) => void;
  addSubMenu: (item: PDashboardMenuItemRegistered) => void;
  closeMenu: (item: PDashboardMenuItemPayload) => void;
  handleMenuItemClick: (item: PDashboardMenuItemPayload) => void;
  handleSubMenuClick: (subMenu: PDashboardMenuItemRegistered) => void;
  isMenuPopup: boolean;
  items: Record<string, PDashboardMenuItemRegistered>;
  openedMenus: Array<string>;
  openMenu: (params: PDashboardMenuItemPayload) => void;
  props: PDashboardMenuProps;
  removeMenuItem: (item: PDashboardMenuItemRegistered) => void;
  removeSubMenu: (item: PDashboardMenuItemRegistered) => void;
  subMenus: Record<string, PDashboardMenuItemRegistered>;
  theme: string;
}

export interface PDashboardSubMenuProvider {
  addSubMenu: (item: PDashboardMenuItemRegistered) => void;
  handleMouseleave?: (deepDispatch: boolean) => void;
  level: number;
  mouseInChild: Ref<boolean>;
  removeSubMenu: (item: PDashboardMenuItemRegistered) => void;
}
