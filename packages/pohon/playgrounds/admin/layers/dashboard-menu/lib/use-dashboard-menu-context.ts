import type { DashboardMenuMenuProvider, DashboardMenuSubMenuProvider } from './dashboard-menu.types';
import { getCurrentInstance, inject, provide } from 'vue';
import { DASHBOARD_MENU_ROOT, DASHBOARD_MENU_SUB_MENU } from './dashboard-menu.constants';
import { findComponentUpward } from './dashboard-menu.utils';

const menuContextKey = Symbol('dashboardMenuContext');

/**
 * Provide menu context
 */
export function createDashboardMenuContext(injectMenuData: DashboardMenuMenuProvider) {
  provide(menuContextKey, injectMenuData);
}

/**
 * Provide menu context
 */
export function createDashboardMenuSubMenuContext(injectSubMenuData: DashboardMenuSubMenuProvider) {
  const instance = getCurrentInstance();

  provide(`subMenu:${instance?.uid}`, injectSubMenuData);
}

/**
 * Inject menu context
 */
export function useDashboardMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const rootMenu = inject(menuContextKey) as DashboardMenuMenuProvider;
  return rootMenu;
}

/**
 * Inject menu context
 */
export function useDashboardMenuSubMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const parentMenu = findComponentUpward({
    instance,
    parentNames: [DASHBOARD_MENU_ROOT, DASHBOARD_MENU_SUB_MENU],
  });
  const subMenu = inject(`subMenu:${parentMenu?.uid}`) as DashboardMenuSubMenuProvider;
  return subMenu;
}
