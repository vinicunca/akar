import type { PDashboardSubMenuProvider } from '../types/dashboard-menu';
import { computed, getCurrentInstance } from 'vue';
import { P_DASHBOARD_MENU_ROOT, P_DASHBOARD_MENU_SUBMENU } from '../constants';
import { findComponentUpward } from '../utils/dashboard';

export function useMenu() {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('instance is required');
  }

  /**
   * Get all parent menu links
   */
  const parentPaths = computed(() => {
    let parent = instance.parent;

    const paths: Array<string> = [instance.props.path as string];

    while (parent?.type.name !== P_DASHBOARD_MENU_ROOT) {
      if (parent?.props.path) {
        paths.unshift(parent.props.path as string);
      }
      parent = parent?.parent ?? null;
    }

    return paths;
  });

  const parentMenu = computed(() => {
    return findComponentUpward({
      instance,
      parentNames: [P_DASHBOARD_MENU_ROOT, P_DASHBOARD_MENU_SUBMENU],
    });
  });

  return {
    parentMenu,
    parentPaths,
  };
}

export function useMenuStyle(menu?: PDashboardSubMenuProvider) {
  const subMenuStyle = computed(() => {
    return {
      '--menu-level': menu ? (menu?.level ?? 0 + 1) : 0,
    };
  });
  return subMenuStyle;
}
