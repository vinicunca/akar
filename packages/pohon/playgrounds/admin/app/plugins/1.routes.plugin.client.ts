import type { Composer } from 'vue-i18n';
import type { RouteRecordRaw } from 'vue-router';
import type { AdminRoute } from '~/domains/core/navigation.typings';
import {
  defineNuxtPlugin,
  useRouter,
} from '#imports';
import { partition, pipe } from '@vinicunca/perkakas';
import {
  ROUTE_AUTH_NAME,
  ROUTE_NOT_FOUND_NAME,
  ROUTE_ROOT_NAME,
} from '~/domains/core/core.constants';
import { useAccessStore } from '~/domains/core/stores/access.store';
import { filterTree, mapTree } from '~/domains/core/utils/tree.utils';

export default defineNuxtPlugin((nuxtApp) => {
  const {
    coreRoutes,
    accessRoutes,
    accessRouteNames,
  } = getBaseRoutes([]);

  const navigationStore = useAccessStore();

  // navigationStore.setCoreRoutes(coreRoutes);
  // navigationStore.setAccessRoutes(accessRoutes);
  // navigationStore.setAccessRouteNames(accessRouteNames);
  // navigationStore.setAccessMenus(
  //   generateMenus({ routes: accessRoutes, i18n: nuxtApp.$i18n as Composer }),
  // );
});

function getBaseRoutes(roles: Array<string>) {
  const router = useRouter();

  const routesTree = router.options.routes as Array<RouteRecordRaw>;
  console.log('🚀 ~ getBaseRoutes ~ routesTree:', routesTree);

  const [coreRoutes, appRoutes] = pipe(
    routesTree,
    (routes) => {
      return mapTree({
        tree: routes,
        mapper: (route) => {
          return {
            name: route.name as string,
            path: route.path,
            meta: route.meta ?? {},
            children: (route.children as AdminRoute['children']) ?? [],
          };
        },
      });
    },
    partition(
      (route) =>
        [
          ROUTE_ROOT_NAME,
          ROUTE_AUTH_NAME,
          ROUTE_NOT_FOUND_NAME,
        ].includes(route.name as string),
    ),
  );

  const accessRoutes = filterTree({
    tree: appRoutes,
    filter: (route) => {
      return hasAuthority({ route, roles });
    },
  });

  const accessRouteNames = accessRoutes.map((route) => route.name as string);

  return {
    coreRoutes,
    accessRoutes,
    accessRouteNames,
  };
}

// Determine if the route has access permissions
function hasAuthority({
  route,
  roles,
}: {
  roles: Array<string>;
  route: AdminRoute;
}) {
  const authority = route.meta?.authority;

  if (!authority) {
    return true;
  }

  const canAccess = roles.some((value) => authority.includes(value));

  return canAccess;
}

function generateMenus(
  { routes, i18n }: { routes: Array<AdminRoute>; i18n: Composer },
) {
  const { t } = i18n;

  let menus = mapTree({
    tree: routes,
    mapper: (route) => {
      const {
        meta = {},
        children,
        path,
      } = route;

      return {
        label: meta.title ? t(meta.title) : '',
        icon: meta.icon as string,
        order: meta.order,
        to: children?.length ? undefined : path,
        children,
      };
    },
  });

  menus = menus.toSorted((a, b) => (a?.order ?? 999) - (b?.order ?? 999));

  return menus;
}
