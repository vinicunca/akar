import type { RouterConfig } from '@nuxt/schema';
import type { RouteRecordRaw } from 'vue-router';
import { mapTree } from '#layers/admin/lib';
import { partition } from '@vinicunca/perkakas';

interface RouteModuleType {
  default: Array<RouteRecordRaw>;
}

const adminRouteFiles = import.meta.glob('./dashboard-routes/**/*.ts', {
  eager: true,
});

function mergeRouteModules(
  routeModules: Record<string, unknown>,
): Array<RouteRecordRaw> {
  const mergedRoutes: Array<RouteRecordRaw> = [];

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? [];
    mergedRoutes.push(...moduleRoutes);
  }

  return mergedRoutes;
}

const adminChildRoutes = mergeRouteModules(adminRouteFiles);

export default {
  routes: (routes_) => {
    const [adminRoutes, coreRoutes] = partition(
      routes_,
      (route) => route.path === '/admin',
    );

    const mappedAdminRoutes = injectDefaultRedirect(adminChildRoutes);
    const adminRoute = adminRoutes[0]!;
    adminRoute.children = mappedAdminRoutes;

    return [
      ...coreRoutes,
      adminRoute,
    ];
  },
} satisfies RouterConfig;

function injectDefaultRedirect(routes: Array<RouteRecordRaw>) {
  const mappedRoutes = mapTree<RouteRecordRaw, RouteRecordRaw>({
    tree: routes,
    mapper: (route) => {
      if (route.redirect || !route.children || route.children.length === 0) {
        return route;
      }

      const [firstChild] = route.children;

      if (firstChild?.path) {
        route.redirect = firstChild.path;
      }

      return route;
    },
  });

  return mappedRoutes;
}
