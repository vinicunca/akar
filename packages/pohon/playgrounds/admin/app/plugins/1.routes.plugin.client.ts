import type { ExtendedRouteRecordRaw, PDashboardMenuRaw } from 'pohon-ui';
import type { Router, RouteRecordRaw } from 'vue-router';
import { defineNuxtPlugin, filterTree, mapTree } from '#imports';
import { partition } from '@vinicunca/perkakas';
import { useAccessStore } from '~/domains/core/stores/access.store';

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as Router;

  const menus = generateAccessible(router);

  const navigationStore = useAccessStore();

  navigationStore.setAccessMenus(menus);
});

function generateAccessible(router: Router) {
  const accessibleRoutes = generateRoutes(router);
  const menus = generateMenus(accessibleRoutes);

  return menus;
}

function generateRoutes(router: Router) {
  // TODO: fetch roles from auth
  const roles: Array<string> = [];
  const routesTree = router.options.routes as Array<RouteRecordRaw>;

  const [adminRoutes, coreRoutes] = partition(
    routesTree,
    (route) => route.path === '/admin',
  );

  const accessRoutes = filterTree({
    tree: adminRoutes[0]!.children ?? [],
    filter: (route) => {
      return hasAuthority({ route, roles });
    },
  });

  return accessRoutes;
}

// Determine if the route has access permissions
function hasAuthority({
  route,
  roles,
}: {
  roles: Array<string>;
  route: RouteRecordRaw;
}) {
  const authority = route.meta?.authority;

  if (!authority) {
    return true;
  }

  const canAccess = roles.some((value) => authority.includes(value));

  return canAccess;
}

function generateMenus(routes: Array<RouteRecordRaw>) {
  let menus = mapTree<ExtendedRouteRecordRaw, PDashboardMenuRaw>({
    tree: routes,
    mapper: (route) => {
      const {
        meta = {},
        name: routeName,
        children = [],
        path,
        redirect,
      } = route;

      const {
        activeIcon,
        badge,
        badgeType,
        badgeVariants,
        hideChildrenInMenu = false,
        icon,
        link,
        order,
        title = '',
      } = meta;

      // Ensure the menu name is not empty.
      const name = (title || routeName || '') as string;

      const resultChildren = hideChildrenInMenu
        ? []
        : ((children as Array<PDashboardMenuRaw>) ?? []);

      // Set the parent-child relationship of submenus
      if (resultChildren.length > 0) {
        resultChildren.forEach((child) => {
          child.parents = [...(route.parents ?? []), path];
          child.parent = path;
        });
      }

      const resultPath = hideChildrenInMenu ? redirect || path : link || path;

      return {
        activeIcon,
        badge,
        badgeType,
        badgeVariants,
        icon,
        name,
        order,
        parent: route.parent,
        parents: route.parents,
        path: resultPath,
        show: !meta.hideInMenu,
        children: resultChildren,
      };
    },
  });

  // Sort the menu items to avoid the issue of order=0 being replaced with 999.
  menus = menus.toSorted((a, b) => (a?.order ?? 999) - (b?.order ?? 999));

  return filterTree({
    tree: menus,
    filter: (menu) => {
      return !!menu.show;
    },
  });
}
