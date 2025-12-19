<script lang="ts" setup>
import type { UseResizeObserverReturn } from '@vueuse/core';
import type { SetupContext, VNodeArrayChildren } from 'vue';
import type {
  DashboardMenuUiMenuItemPayload,
  DashboardMenuUiMenuItemRegistered,
  DashboardMenuUiMenuProvider,
  DashboardMenuUiProps,
} from '../dashboard-menu-ui.types';
import { funnel } from '@vinicunca/perkakas';

import { useResizeObserver } from '@vueuse/core';
import {
  computed,
  nextTick,
  reactive,
  ref,
  toRef,
  useSlots,
  watch,
  watchEffect,
} from 'vue';
import { useDashboardMenuUiStyle } from '../composables/use-dashboard-menu-ui';
import {
  createDashboardMenuUiContext,
  createDashboardMenuUiSubMenuContext,
} from '../composables/use-dashboard-menu-ui-context';
import { useDashboardMenuUiScroll } from '../composables/use-dashboard-menu-ui-scroll';
import { DASHBOARD_MENU_UI_ROOT } from '../dashboard-menu-ui.constants';
import { flattedChildren } from '../utils/dashboard-menu-ui.utils';
import DashboardMenuUiSubMenu from './dashboard-menu-ui-sub-menu.vue';

defineOptions({ name: DASHBOARD_MENU_UI_ROOT });

const props = withDefaults(
  defineProps<DashboardMenuUiProps>(),
  {
    accordion: true,
    collapse: false,
    mode: 'vertical',
    rounded: true,
    theme: 'dark',
    scrollToActive: false,
  },
);

const emits = defineEmits<{
  close: [DashboardMenuUiMenuItemPayload];
  open: [DashboardMenuUiMenuItemPayload];
  select: [DashboardMenuUiMenuItemPayload];
}>();

const menuStyle = useDashboardMenuUiStyle();
const slots: SetupContext['slots'] = useSlots();
const menu = ref<HTMLUListElement>();
const sliceIndex = ref(-1);
const openedMenus = ref<DashboardMenuUiMenuProvider['openedMenus']>(
  props.defaultOpeneds && !props.collapse ? [...props.defaultOpeneds] : [],
);
const activePath = ref<DashboardMenuUiMenuProvider['activePath']>(props.defaultActive);
const items = ref<DashboardMenuUiMenuProvider['items']>({});
const subMenus = ref<DashboardMenuUiMenuProvider['subMenus']>({});
const mouseInChild = ref(false);

const isMenuPopup = computed<DashboardMenuUiMenuProvider['isMenuPopup']>(() => {
  return (
    props.mode === 'horizontal' || (props.mode === 'vertical' && props.collapse)
  );
});

const getSlot = computed(() => {
  const defaultSlots: VNodeArrayChildren = slots.default?.() ?? [];

  const originalSlot = flattedChildren(defaultSlots) as VNodeArrayChildren;
  const slotDefault
    = sliceIndex.value === -1
      ? originalSlot
      : originalSlot.slice(0, sliceIndex.value);

  const slotMore
    = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);

  return { showSlotMore: slotMore.length > 0, slotDefault, slotMore };
});

watch(
  () => props.collapse,
  (value) => {
    if (value) {
      openedMenus.value = [];
    }
  },
);

watch(items.value, initMenu);

watch(
  () => props.defaultActive,
  (currentActive = '') => {
    if (!items.value[currentActive]) {
      activePath.value = '';
    }
    updateActiveName(currentActive);
  },
);

let resizeStopper: UseResizeObserverReturn['stop'];
watchEffect(() => {
  if (props.mode === 'horizontal') {
    resizeStopper = useResizeObserver(menu, handleResize).stop;
  } else {
    resizeStopper?.();
  }
});

createDashboardMenuUiContext(
  reactive({
    activePath,
    addMenuItem,
    addSubMenu,
    closeMenu,
    handleMenuItemClick,
    handleSubMenuClick,
    isMenuPopup,
    openedMenus,
    openMenu,
    props,
    removeMenuItem,
    removeSubMenu,
    subMenus,
    theme: toRef(props, 'theme'),
    items,
  }),
);

createDashboardMenuUiSubMenuContext({
  addSubMenu,
  level: 1,
  mouseInChild,
  removeSubMenu,
});

function calcMenuItemWidth(menuItem: HTMLElement) {
  const computedStyle = getComputedStyle(menuItem);
  const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
  const marginRight = Number.parseInt(computedStyle.marginRight, 10);
  return menuItem.offsetWidth + marginLeft + marginRight || 0;
}

function calcSliceIndex() {
  if (!menu.value) {
    return -1;
  }
  const items = [...(menu.value?.childNodes ?? [])].filter(
    (item) =>
      // remove comment type node #12634
      item.nodeName !== '#comment'
      && (item.nodeName !== '#text' || item.nodeValue),
  ) as Array<HTMLElement>;

  const moreItemWidth = 46;
  const computedMenuStyle = getComputedStyle(menu?.value);

  const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
  const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
  const menuWidth = menu.value?.clientWidth - paddingLeft - paddingRight;

  let calcWidth = 0;
  let sliceIndex = 0;
  items.forEach((item, index) => {
    calcWidth += calcMenuItemWidth(item);
    if (calcWidth <= menuWidth - moreItemWidth) {
      sliceIndex = index + 1;
    }
  });
  return sliceIndex === items.length ? -1 : sliceIndex;
}

const resizeDebouncer = funnel(
  callbackResize,
  { minQuietPeriodMs: 33.34 },
);

function callbackResize() {
  sliceIndex.value = -1;

  nextTick(() => {
    sliceIndex.value = calcSliceIndex();
  });
}

let isFirstTimeRender = true;
function handleResize() {
  if (sliceIndex.value === calcSliceIndex()) {
    return;
  }

  callbackResize();
  // execute callback directly when first time resize to avoid shaking
  if (isFirstTimeRender) {
    callbackResize();
  } else {
    resizeDebouncer.call();
  }
  isFirstTimeRender = false;
}

const enableScroll = computed(
  () => props.scrollToActive && props.mode === 'vertical' && !props.collapse,
);

const { scrollToActiveItem } = useDashboardMenuUiScroll(activePath, {
  enable: enableScroll,
  delay: 320,
});

// Listen to activePath changes and automatically scroll to the active item
watch(activePath, () => {
  scrollToActiveItem();
});

// Default expanded menu
function initMenu() {
  const parentPaths = getActivePaths();

  // Expand all subMenus of the menu item
  parentPaths.forEach((path) => {
    const subMenu = subMenus.value[path];

    if (subMenu) {
      openMenu({ path, parentPaths: subMenu.parentPaths });
    }
  });
}

function updateActiveName(val: string) {
  const itemsInData = items.value;
  const item = itemsInData[val]
    || (activePath.value && itemsInData[activePath.value])
    || itemsInData[props.defaultActive || ''];

  activePath.value = item ? item.path : val;
}

function handleMenuItemClick(data: DashboardMenuUiMenuItemPayload) {
  const { collapse, mode } = props;
  if (mode === 'horizontal' || collapse) {
    openedMenus.value = [];
  }
  const { parentPaths, path } = data;
  if (!path || !parentPaths) {
    return;
  }

  emits('select', { path, parentPaths });
}

function handleSubMenuClick({ parentPaths, path }: DashboardMenuUiMenuItemRegistered) {
  const isOpened = openedMenus.value.includes(path);

  if (isOpened) {
    closeMenu({ path, parentPaths });
  } else {
    openMenu({ path, parentPaths });
  }
}

function close(path: string) {
  const i = openedMenus.value.indexOf(path);

  if (i !== -1) {
    openedMenus.value.splice(i, 1);
  }
}

function closeMenu({ path, parentPaths }: DashboardMenuUiMenuItemPayload) {
  if (props.accordion) {
    openedMenus.value = subMenus.value[path]?.parentPaths ?? [];
  }

  close(path);

  emits('close', { path, parentPaths });
}

function openMenu({ path, parentPaths }: DashboardMenuUiMenuItemPayload) {
  if (openedMenus.value.includes(path)) {
    return;
  }

  if (props.accordion) {
    const activeParentPaths = getActivePaths();
    if (activeParentPaths.includes(path)) {
      parentPaths = activeParentPaths;
    }
    openedMenus.value = openedMenus.value.filter((path: string) =>
      parentPaths.includes(path),
    );
  }

  openedMenus.value.push(path);
  emits('open', { path, parentPaths });
}

function addMenuItem(item: DashboardMenuUiMenuItemRegistered) {
  items.value[item.path] = item;
}

function addSubMenu(subMenu: DashboardMenuUiMenuItemRegistered) {
  subMenus.value[subMenu.path] = subMenu;
}

function removeSubMenu(subMenu: DashboardMenuUiMenuItemRegistered) {
  Reflect.deleteProperty(subMenus.value, subMenu.path);
}

function removeMenuItem(item: DashboardMenuUiMenuItemRegistered) {
  Reflect.deleteProperty(items.value, item.path);
}

function getActivePaths() {
  const activeItem = activePath.value && items.value[activePath.value];

  if (!activeItem || props.mode === 'horizontal' || props.collapse) {
    return [];
  }

  return activeItem.parentPaths;
}
</script>

<template>
  <ul
    ref="menu"
    class="ngibur-menu"
    :class="[
      theme,
      `is-${mode}`,
      `is-${theme}`,
      {
        'is-collapsed': collapse,
        'is-rounded': rounded,
        'justify-$menu-align': mode === 'horizontal',
      },
    ]"
    :style="menuStyle"
    role="menu"
  >
    <template v-if="mode === 'horizontal' && getSlot.showSlotMore">
      <template
        v-for="item in getSlot.slotDefault"
        :key="(item as any).key"
      >
        <component :is="item" />
      </template>

      <DashboardMenuUiSubMenu
        is-sub-menu-more
        path="sub-menu-more"
      >
        <template #title>
          <i class="i-lucide-ellipsis size-4" />
        </template>

        <template
          v-for="item in getSlot.slotMore"
          :key="(item as any).key"
        >
          <component :is="item" />
        </template>
      </DashboardMenuUiSubMenu>
    </template>

    <template v-else>
      <slot />
    </template>
  </ul>
</template>
