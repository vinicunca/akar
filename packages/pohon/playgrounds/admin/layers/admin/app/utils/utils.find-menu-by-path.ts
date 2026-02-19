import type { PDashboardMenuItem } from 'pohon-ui';

export function findMenuByPath(
  { list, path }:
  { list: Array<PDashboardMenuItem>; path?: string },
): PDashboardMenuItem | null {
  for (const menu of list) {
    if (menu.to === path) {
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
  { menus: Array<PDashboardMenuItem>; path?: string; level?: number },
) {
  const findMenu = findMenuByPath({ list: menus, path });
  const rootMenuPath = findMenu?.parents?.[level];

  const rootMenu = rootMenuPath
    ? menus.find((item) => item.to === rootMenuPath)
    : undefined;

  return {
    findMenu,
    rootMenu,
    rootMenuPath,
  };
}
