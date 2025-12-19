import type { DashboardMenuUiMenuProvider, DashboardMenuUiSubMenuProvider } from '../dashboard-menu-ui.types';
import { getCurrentInstance, inject, provide } from 'vue';
import { DASHBOARD_MENU_UI_ROOT, DASHBOARD_MENU_UI_SUB_MENU } from '../dashboard-menu-ui.constants';
import { findComponentUpward } from '../utils/dashboard-menu-ui.utils';

const menuContextKey = Symbol('dashboardMenuUiContext');

/**
 * Provide menu context
 */
export function createDashboardMenuUiContext(injectMenuData: DashboardMenuUiMenuProvider) {
  provide(menuContextKey, injectMenuData);
}

/**
 * Provide menu context
 */
export function createDashboardMenuUiSubMenuContext(injectSubMenuData: DashboardMenuUiSubMenuProvider) {
  const instance = getCurrentInstance();

  provide(`subMenu:${instance?.uid}`, injectSubMenuData);
}

/**
 * Inject menu context
 */
export function useDashboardMenuUiContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const rootMenu = inject(menuContextKey) as DashboardMenuUiMenuProvider;
  return rootMenu;
}

/**
 * Inject menu context
 */
export function useDashboardMenuUiSubMenuContext() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
  const parentMenu = findComponentUpward({
    instance,
    parentNames: [DASHBOARD_MENU_UI_ROOT, DASHBOARD_MENU_UI_SUB_MENU],
  });
  const subMenu = inject(`subMenu:${parentMenu?.uid}`) as DashboardMenuUiSubMenuProvider;
  return subMenu;
}
