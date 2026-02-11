import type { PDashboardMenuItem } from 'pohon-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface StateAccess {
  accessRouteNames: Array<string>;
  /**
   * Accessible menu list
   */
  accessMenus: Array<PDashboardMenuItem>;
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
      setAccessMenus(menus: Array<PDashboardMenuItem>) {
        this.accessMenus = menus as any;
      },
    },
  },
);

const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot));
}
