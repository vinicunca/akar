import type { DashboardMenuUiSubMenuProvider } from '../dashboard-menu-ui.types';

import { computed, getCurrentInstance } from 'vue';

import { DASHBOARD_MENU_UI_ROOT, DASHBOARD_MENU_UI_SUB_MENU } from '../dashboard-menu-ui.constants';
import { findComponentUpward } from '../utils/dashboard-menu-ui.utils';

export function useDashboardMenuUi() {
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

    while (parent?.type.name !== DASHBOARD_MENU_UI_ROOT) {
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
      parentNames: [DASHBOARD_MENU_UI_ROOT, DASHBOARD_MENU_UI_SUB_MENU],
    });
  });

  return {
    parentMenu,
    parentPaths,
  };
}

export function useDashboardMenuUiStyle(menu?: DashboardMenuUiSubMenuProvider) {
  const subMenuStyle = computed(() => {
    return {
      '--menu-level': menu ? (menu?.level ?? 0 + 1) : 0,
    };
  });
  return subMenuStyle;
}
