import type { RouterConfig } from '@nuxt/schema';
import type { RouteRecordRaw } from 'vue-router';
import { partition } from '@vinicunca/perkakas';
import { mapTree } from '~/domains/core/utils/tree.utils';

export default {
  routes: (routes_) => {
    const [adminRoutes, coreRoutes] = partition(
      routes_,
      (route) => route.path === '/admin',
    );

    const mappedAdminRoutes = injectDefaultRedirect(adminRoutes);

    return [
      ...coreRoutes,
      ...mappedAdminRoutes,
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
        route.redirect = (to) => {
          return { path: `${to.path}/${firstChild.path}`.replace(/\/\//g, '/') };
        };
      }

      return route;
    },
  });

  return mappedRoutes;
}
