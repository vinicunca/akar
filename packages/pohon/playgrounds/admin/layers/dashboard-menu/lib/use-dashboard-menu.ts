import type { DashboardMenuSubMenuProvider } from './dashboard-menu.types';

import { computed, getCurrentInstance } from 'vue';

import { DASHBOARD_MENU_ROOT, DASHBOARD_MENU_SUB_MENU } from './dashboard-menu.constants';
import { findComponentUpward } from './dashboard-menu.utils';

export function useDashboardMenu() {
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

    while (parent?.type.name !== DASHBOARD_MENU_ROOT) {
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
      parentNames: [DASHBOARD_MENU_ROOT, DASHBOARD_MENU_SUB_MENU],
    });
  });

  return {
    parentMenu,
    parentPaths,
  };
}

export function useDashboardMenuStyle(menu?: DashboardMenuSubMenuProvider) {
  const subMenuStyle = computed(() => {
    return {
      '--menu-level': menu ? (menu?.level ?? 0 + 1) : 0,
    };
  });
  return subMenuStyle;
}
