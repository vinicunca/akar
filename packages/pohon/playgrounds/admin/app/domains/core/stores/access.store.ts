import type { AdminMenu, AdminRoute } from '~/domains/core/navigation.typings';
import { defineStore } from 'pinia';

interface StateAccess {
  coreRoutes: Array<AdminRoute>;
  accessRoutes: Array<AdminRoute>;
  accessRouteNames: Array<string>;
  accessMenus: Array<AdminMenu>;
}

export const useAccessStore = defineStore(
  'access',
  {
    state: (): StateAccess => ({
      coreRoutes: [],
      accessRoutes: [],
      accessRouteNames: [],
      accessMenus: [],
    }),

    actions: {
      setCoreRoutes(routes: Array<AdminRoute>) {
        this.coreRoutes = routes;
      },
      setAccessRoutes(routes: Array<AdminRoute>) {
        this.accessRoutes = routes;
      },
      setAccessRouteNames(names: Array<string>) {
        this.accessRouteNames = names;
      },
      setAccessMenus(menus: Array<AdminMenu>) {
        this.accessMenus = menus;
      },
    },
  },
);
