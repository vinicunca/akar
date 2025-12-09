import type { AdminMenu } from '~/domains/core/navigation.typings';
import { computed, useI18n } from '#imports';
import { useAccessStore } from '~/domains/core/stores/access.store';

export function useNavigationMenu() {
  const { t } = useI18n();
  const accessStore = useAccessStore();

  const menus = computed<Array<AdminMenu>>(() => {
    const itu = accessStore.accessMenus.map((menu) => menu);

    return accessStore.accessMenus.map((menu) => {
      return {};
    });
  });

  return {
    menus,
  };
}
