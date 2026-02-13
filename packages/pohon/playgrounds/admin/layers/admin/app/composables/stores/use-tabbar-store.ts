import type { Router } from 'vue-router';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useTabbarStore = defineStore(
  'tabbar',
  {

    actions: {
      async refresh(router: Router | string) {},
    },
  },
);

const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useTabbarStore, hot));
}
