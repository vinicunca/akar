import type { PNavigationMenuItem } from 'pohon-ui';
import type { Router, RouteRecordRaw } from 'vue-router';
import { partition } from '@vinicunca/perkakas';

type ExtendedRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: Array<string>;
  path?: any;
};

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

  const [adminRoutes] = partition(
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
  let menus = mapTree<ExtendedRouteRecordRaw, PNavigationMenuItem>({
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
        : ((children as Array<PNavigationMenuItem>) ?? []);

      // Set the parent-child relationship of submenus
      if (resultChildren.length > 0) {
        resultChildren.forEach((child) => {
          child.parents = [...(route.parents ?? []), path];
          child.parent = path;
        });
      }

      const resultPath = hideChildrenInMenu ? redirect || path : link || path;

      return {
        icon,
        activeIcon,
        // Explicitly type badge to avoid deep type instantiation issue.
        badge: badge as any,
        label: name,
        order,
        parent: route.parent,
        parents: route.parents,
        to: resultPath,
        show: !meta.hideInMenu,
        children: resultChildren,
      };
    },
  });

  // Sort the menu items to avoid the issue of order=0 being replaced with 999.
  menus = sortTree({
    tree: menus,
    sortFunction: (a, b) => (a?.order ?? 999) - (b?.order ?? 999),
  });

  return filterTree({
    tree: menus,
    filter: (menu) => {
      return !!menu.show;
    },
  });
}
