import type { PDashboardMenuProvider, PDashboardSubMenuProvider } from '../types/dashboard-menu';
import { getCurrentInstance, inject, provide } from 'vue';
import { findComponentUpward, P_DASHBOARD_MENU_ROOT, P_DASHBOARD_MENU_SUBMENU } from '../utils/dashboard';

const menuContextKey = Symbol('PDashboardMenuContext');

/**
 * Provide menu context
 */
export function createMenuContext(injectMenuData: PDashboardMenuProvider) {
  provide(menuContextKey, injectMenuData);
}

/**
 * Provide menu context
 */
export function createSubMenuContext(injectSubMenuData: PDashboardSubMenuProvider) {
  const instance = getCurrentInstance();

  provide(`subMenu:${instance?.uid}`, injectSubMenuData);
}

/**
 * Inject menu context
 */
export function useMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const rootMenu = inject(menuContextKey) as PDashboardMenuProvider;
  return rootMenu;
}

/**
 * Inject menu context
 */
export function useSubMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const parentMenu = findComponentUpward({
    instance,
    parentNames: [P_DASHBOARD_MENU_ROOT, P_DASHBOARD_MENU_SUBMENU],
  });
  const subMenu = inject(`subMenu:${parentMenu?.uid}`) as PDashboardSubMenuProvider;
  return subMenu;
}
