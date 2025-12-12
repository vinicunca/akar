import type { PDashboardMenuRaw } from 'pohon-ui';
import { defineStore } from 'pinia';

interface StateAccess {
  accessRouteNames: Array<string>;
  accessMenus: Array<PDashboardMenuRaw>;
}

export const useAccessStore = defineStore(
  'access',
  {
    state: (): StateAccess => ({
      accessRouteNames: [],
      accessMenus: [],
    }),

    actions: {
      setAccessRouteNames(names: Array<string>) {
        this.accessRouteNames = names;
      },
      setAccessMenus(menus: Array<PDashboardMenuRaw>) {
        this.accessMenus = menus;
      },
    },
  },
);
