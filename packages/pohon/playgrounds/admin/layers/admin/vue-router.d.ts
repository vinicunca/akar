import type { Component } from 'vue';

interface AdminRouteMeta {
  /**
   * Active icon (menu/tab)
   */
  activeIcon?: string;
  /**
   * Currently active menu, used when you want to activate the parent menu instead of the current menu
   */
  activePath?: string;
  /**
   * Whether to fix the tab
   * @default false
   */
  affixTab?: boolean;
  /**
   * Order of the fixed tab
   * @default 0
   */
  affixTabOrder?: number;
  /**
   * Roles required to access
   * @default []
   */
  authority?: Array<string>;
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
  badgeVariants?:
    | 'default'
    | 'destructive'
    | 'primary'
    | 'success'
    | 'warning'
    | string;
  /**
   * The full path of the route is used as the key
   * @default true
   */
  fullPathKey?: boolean;
  /**
   * Do not display the children of the current route in the menu
   * @default false
   */
  hideChildrenInMenu?: boolean;
  /**
   * Do not display the current route in the breadcrumb
   * @default false
   */
  hideInBreadcrumb?: boolean;
  /**
   * Do not display the current route in the menu
   * @default false
   */
  hideInMenu?: boolean;
  /**
   * Do not display the current route in the tab
   * @default false
   */
  hideInTab?: boolean;
  /**
   * Icon (menu/tab)
   */
  icon?: Component | string;
  /**
   * Iframe source URL
   */
  iframeSrc?: string;
  /**
   * Ignore access control, can be accessed directly
   * @default false
   */
  ignoreAccess?: boolean;
  /**
   * Enable KeepAlive cache
   */
  keepAlive?: boolean;
  /**
   * External link - redirect path
   */
  link?: string;
  /**
   * Whether the route has been loaded
   */
  loaded?: boolean;
  /**
   * Maximum number of open tabs
   * @default -1
   */
  maxNumOfOpenTab?: number;
  /**
   * Menu is visible, but access will be redirected to 403
   */
  menuVisibleWithForbidden?: boolean;
  /**
   * Open in a new window
   */
  openInNewWindow?: boolean;
  /**
   * Used for route -> menu sorting
   */
  order?: number;
  /**
   * Parameters carried by the menu
   */
  query?: Record<string, any>;
  /**
   * Title name
   */
  title?: string;
}

declare module '#app' {
  interface PageMeta extends AdminRouteMeta {}
}

declare module 'vue-router' {
  interface RouteMeta extends AdminRouteMeta {}
}
