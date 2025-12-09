interface AdminRouteMeta {
  /**
   * Specific roles required to access
   * @default []
   */
  authority?: Array<string>;
  /**
   * Icon (menu/tab)
   */
  icon?: string;
  /**
   * Ignore permissions, can be accessed directly
   */
  ignoreAccess?: boolean;
  /**
   * Used for route -> menu sorting
   */
  order?: number;
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

export {};
