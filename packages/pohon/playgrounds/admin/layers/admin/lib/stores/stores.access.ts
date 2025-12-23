import type { DashboardMenuRecord } from '#layers/dashboard-menu/lib';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface StateAccess {
  accessRouteNames: Array<string>;
  /**
   * Accessible menu list
   */
  accessMenus: Array<DashboardMenuRecord>;
  /**
   * Is the screen locked?
   */
  isLockScreen: boolean;
}

export const useAccessStore = defineStore(
  'access',
  {
    state: (): StateAccess => ({
      accessRouteNames: [],
      accessMenus: [],
      isLockScreen: false,
    }),

    actions: {
      setAccessRouteNames(names: Array<string>) {
        this.accessRouteNames = names;
      },
      setAccessMenus(menus: Array<DashboardMenuRecord>) {
        this.accessMenus = menus;
      },
    },
  },
);

const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot));
}
