<script lang="ts" setup>
import type { UseResizeObserverReturn } from '@vueuse/core';
import type { SetupContext, VNodeArrayChildren } from 'vue';
import type {
  DashboardMenuMenuItemPayload,
  DashboardMenuMenuItemRegistered,
  DashboardMenuMenuProvider,
  DashboardMenuProps,
} from '../dashboard-menu.types';
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
import { useDashboardMenuStyle } from '../composables/use-dashboard-menu';
import {
  createDashboardMenuContext,
  createDashboardMenuSubMenuContext,
} from '../composables/use-dashboard-menu-context';
import { useDashboardMenuScroll } from '../composables/use-dashboard-menu-scroll';
import { DASHBOARD_MENU_ROOT } from '../dashboard-menu.constants';
import { flattedChildren } from '../utils/dashboard-menu.utils';
import DashboardMenuSubMenu from './dashboard-menu-sub-menu.vue';

defineOptions({ name: DASHBOARD_MENU_ROOT });

const props = withDefaults(
  defineProps<DashboardMenuProps>(),
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
  close: [DashboardMenuMenuItemPayload];
  open: [DashboardMenuMenuItemPayload];
  select: [DashboardMenuMenuItemPayload];
}>();

const menuStyle = useDashboardMenuStyle();
const slots: SetupContext['slots'] = useSlots();
const menu = ref<HTMLUListElement>();
const sliceIndex = ref(-1);
const openedMenus = ref<DashboardMenuMenuProvider['openedMenus']>(
  props.defaultOpeneds && !props.collapse ? [...props.defaultOpeneds] : [],
);
const activePath = ref<DashboardMenuMenuProvider['activePath']>(props.defaultActive);
const items = ref<DashboardMenuMenuProvider['items']>({});
const subMenus = ref<DashboardMenuMenuProvider['subMenus']>({});
const mouseInChild = ref(false);

const isMenuPopup = computed<DashboardMenuMenuProvider['isMenuPopup']>(() => {
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

createDashboardMenuContext(
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

createDashboardMenuSubMenuContext({
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

const { scrollToActiveItem } = useDashboardMenuScroll(activePath, {
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

function handleMenuItemClick(data: DashboardMenuMenuItemPayload) {
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

function handleSubMenuClick({ parentPaths, path }: DashboardMenuMenuItemRegistered) {
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

function closeMenu({ path, parentPaths }: DashboardMenuMenuItemPayload) {
  if (props.accordion) {
    openedMenus.value = subMenus.value[path]?.parentPaths ?? [];
  }

  close(path);

  emits('close', { path, parentPaths });
}

function openMenu({ path, parentPaths }: DashboardMenuMenuItemPayload) {
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

function addMenuItem(item: DashboardMenuMenuItemRegistered) {
  items.value[item.path] = item;
}

function addSubMenu(subMenu: DashboardMenuMenuItemRegistered) {
  subMenus.value[subMenu.path] = subMenu;
}

function removeSubMenu(subMenu: DashboardMenuMenuItemRegistered) {
  Reflect.deleteProperty(subMenus.value, subMenu.path);
}

function removeMenuItem(item: DashboardMenuMenuItemRegistered) {
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
    class="pohon-menu"
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

      <DashboardMenuSubMenu
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
      </DashboardMenuSubMenu>
    </template>

    <template v-else>
      <slot />
    </template>
  </ul>
</template>
