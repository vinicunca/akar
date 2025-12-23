import type { DashboardMenuRecord } from '#layers/dashboard-menu/lib';

export function findMenuByPath(
  { list, path }:
  { list: Array<DashboardMenuRecord>; path?: string },
): DashboardMenuRecord | null {
  for (const menu of list) {
    if (menu.path === path) {
      return menu;
    }

    const findMenu = menu.children && findMenuByPath({ list: menu.children, path });

    if (findMenu) {
      return findMenu;
    }
  }

  return null;
}

export function findRootMenuByPath(
  { menus, path, level = 0 }:
  { menus: Array<DashboardMenuRecord>; path?: string; level?: number },
) {
  const findMenu = findMenuByPath({ list: menus, path });
  const rootMenuPath = findMenu?.parents?.[level];

  const rootMenu = rootMenuPath
    ? menus.find((item) => item.path === rootMenuPath)
    : undefined;

  return {
    findMenu,
    rootMenu,
    rootMenuPath,
  };
}
