import type { PNavigationMenuItem } from 'pohon-ui';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface StateAccess {
  accessRouteNames: Array<string>;
  /**
   * Accessible menu list
   */
  accessMenus: Array<PNavigationMenuItem>;
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
      setAccessMenus(menus: Array<PNavigationMenuItem>) {
        this.accessMenus = menus;
      },
    },
  },
);

const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot));
}
