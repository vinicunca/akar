<script lang="ts">
import type theme from '#build/pohon/dashboard-menu-root';
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardMenuItemPayload, PDashboardMenuItemRegistered, PDashboardMenuProps, PDashboardMenuProvider } from '../types/dashboard-menu';
import type { ComponentConfig } from '../types/uv';

type DashboardMenuRoot = ComponentConfig<typeof theme, AppConfig, 'dashboardMenuRoot'>;

export interface PDashboardMenuRoot extends PDashboardMenuProps {
  pohon?: DashboardMenuRoot['slots'];
}
</script>

<script lang="ts" setup>
import type { UseResizeObserverReturn } from '@vueuse/core';
import type { VNodeArrayChildren } from 'vue';
import { funnel } from '@vinicunca/perkakas';
import { useResizeObserver } from '@vueuse/core';
import { computed, nextTick, reactive, ref, toRef, useSlots, watch, watchEffect } from 'vue';
import { useMenuStyle } from '../composables/use-dashboard-menu';
import { createMenuContext, createSubMenuContext } from '../composables/use-dashboard-menu-context';
import { useMenuScroll } from '../composables/use-dashboard-menu-scroll';
import { flattedChildren } from '../utils/dashboard';
import PDashboardMenuSubMenu from './dashboard-menu-sub-menu.vue';

const props = withDefaults(
  defineProps<PDashboardMenuProps>(),
  {
    accordion: true,
    collapse: false,
    mode: 'vertical',
    rounded: true,
    scrollToActive: false,
    theme: 'dark',
  },
);

const emits = defineEmits<{
  close: [PDashboardMenuItemPayload];
  open: [PDashboardMenuItemPayload];
  select: [PDashboardMenuItemPayload];
}>();

const menuStyle = useMenuStyle();
const slots = useSlots();
const menu = ref<HTMLUListElement>();
const sliceIndex = ref(-1);
const openedMenus = ref<PDashboardMenuProvider['openedMenus']>(
  props.defaultOpeneds && !props.collapse ? [...props.defaultOpeneds] : [],
);
const activePath = ref<PDashboardMenuProvider['activePath']>(props.defaultActive);
const items = ref<PDashboardMenuProvider['items']>({});
const subMenus = ref<PDashboardMenuProvider['subMenus']>({});
const mouseInChild = ref(false);

const isMenuPopup = computed<PDashboardMenuProvider['isMenuPopup']>(() => {
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

createMenuContext(
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

createSubMenuContext({
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

const { scrollToActiveItem } = useMenuScroll(activePath, {
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

  // expand all subMenus of the menu item
  parentPaths.forEach((path) => {
    const subMenu = subMenus.value[path];
    if (subMenu) {
      openMenu({ path, parentPaths: subMenu.parentPaths });
    }
  });
}

function updateActiveName(val: string) {
  const itemsInData = items.value;
  const item
    = itemsInData[val]
      || (activePath.value && itemsInData[activePath.value])
      || itemsInData[props.defaultActive || ''];

  activePath.value = item ? item.path : val;
}

function handleMenuItemClick(data: PDashboardMenuItemPayload) {
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

function handleSubMenuClick({ parentPaths, path }: PDashboardMenuItemRegistered) {
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

function closeMenu({ path, parentPaths }: PDashboardMenuItemPayload) {
  if (props.accordion) {
    openedMenus.value = subMenus.value[path]?.parentPaths ?? [];
  }

  close(path);

  emits('close', { path, parentPaths });
}

function openMenu({ path, parentPaths }: PDashboardMenuItemPayload) {
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

function addMenuItem(item: PDashboardMenuItemRegistered) {
  items.value[item.path] = item;
}

function addSubMenu(subMenu: PDashboardMenuItemRegistered) {
  subMenus.value[subMenu.path] = subMenu;
}

function removeSubMenu(subMenu: PDashboardMenuItemRegistered) {
  Reflect.deleteProperty(subMenus.value, subMenu.path);
}

function removeMenuItem(item: PDashboardMenuItemRegistered) {
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
    :class="[
      theme,
    ]"
    :style="menuStyle"
    role="menu"
  >
    <template v-if="mode === 'horizontal' && getSlot.showSlotMore">
      <template
        v-for="item in getSlot.slotDefault"
        :key="item.key"
      >
        <component :is="item" />
      </template>

      <PDashboardMenuSubMenu
        is-sub-menu-more
        path="sub-menu-more"
      >
        <template #title>
          <!-- <Ellipsis class="size-4" /> -->
        </template>
        <template
          v-for="item in getSlot.slotMore"
          :key="item.key"
        >
          <component :is="item" />
        </template>
      </PDashboardMenuSubMenu>
    </template>
    <template v-else>
      <slot />
    </template>
  </ul>
</template>
