import { preferencesManager } from '#layers/admin/app/preferences';

export function useAdminExtraMenu(useRootMenus?: ComputedRef<Array<PDashboardMenuRecord>>) {
  const accessStore = useAccessStore();
  const { navigation, willOpenedByWindow } = useAdminNavigation();
  const preferences = preferencesManager.getPreferences();

  const menus = computed(() => useRootMenus?.value ?? accessStore.accessMenus);

  /** Record which submenu under the current top-level menu was last activated */
  const defaultSubMap = new Map<string, string>();
  const extraRootMenus = ref<Array<PDashboardMenuRecord>>([]);
  const route = useRoute();
  const extraMenus = ref<Array<PDashboardMenuRecord>>([]);
  const isSidebarExtraVisible = ref<boolean>(false);
  const extraActiveMenu = ref('');
  const parentLevel = computed(() =>
    preferences.app.layout === 'header-mixed-nav' ? 1 : 0,
  );

  async function handleMixedMenuSelect(menu: PDashboardMenuRecord) {
    const _extraMenus = menu?.children ?? [];
    const hasChildren = _extraMenus.length > 0;

    if (!willOpenedByWindow(menu.path)) {
      extraMenus.value = _extraMenus ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      isSidebarExtraVisible.value = hasChildren;
    }

    if (!hasChildren) {
      await navigation(menu.path);
    } else if (preferences.sidebar.autoActivateChild) {
      await navigation(
        defaultSubMap.has(menu.path)
          ? (defaultSubMap.get(menu.path) as string)
          : menu.path,
      );
    }
  }

  async function handleDefaultSelect(
    { menu, rootMenu }:
    { menu: PDashboardMenuRecord; rootMenu?: PDashboardMenuRecord },
  ) {
    extraMenus.value = rootMenu?.children ?? extraRootMenus.value ?? [];
    extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;

    if (preferences.sidebar.expandChildrenOnHover) {
      isSidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  function handleSideMouseLeave() {
    if (preferences.sidebar.expandChildrenOnHover) {
      return;
    }

    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath({
      menus: menus.value,
      path: route.path,
    });
    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];
  }

  function handleMenuMouseEnter(menu: PDashboardMenuRecord) {
    if (!preferences.sidebar.expandChildrenOnHover) {
      const { findMenu } = findRootMenuByPath({
        menus: menus.value,
        path: menu.path,
      });

      extraMenus.value = findMenu?.children ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      isSidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  function calcExtraMenus(path: string) {
    const currentPath = route.meta?.activePath || path;
    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath({
      menus: menus.value,
      path: currentPath,
      level: parentLevel.value,
    });

    extraRootMenus.value = rootMenu?.children ?? [];

    if (rootMenuPath) {
      defaultSubMap.set(rootMenuPath, currentPath);
    }

    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];

    if (preferences.sidebar.expandChildrenOnHover) {
      isSidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  watch(
    () => [route.path, preferences.app.layout],
    ([path]) => {
      calcExtraMenus(path || '');
    },
    { immediate: true },
  );

  return {
    extraActiveMenu,
    extraMenus,
    handleDefaultSelect,
    handleMenuMouseEnter,
    handleMixedMenuSelect,
    handleSideMouseLeave,
    isSidebarExtraVisible,
  };
}
