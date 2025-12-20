<script lang="ts" setup>
import type { AHoverCardContentProps } from 'akar';

import type { DashboardMenuMenuItemRegistered, DashboardMenuMenuProvider, DashboardMenuSubMenuProps } from '../dashboard-menu.types';
import { PPopover } from '#components';

import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useDashboardMenu, useDashboardMenuStyle } from '../composables/use-dashboard-menu';
import {
  createDashboardMenuSubMenuContext,
  useDashboardMenuContext,
  useDashboardMenuSubMenuContext,
} from '../composables/use-dashboard-menu-context';
import { DASHBOARD_MENU_ROOT, DASHBOARD_MENU_SUB_MENU } from '../dashboard-menu.constants';
import DashboardMenuCollapseTransition from './dashboard-menu-collapse-transition.vue';
import DashboardMenuSubMenuContent from './dashboard-menu-sub-menu-content.vue';

defineOptions({ name: DASHBOARD_MENU_SUB_MENU });

const props = withDefaults(
  defineProps<Props>(),
  {
    disabled: false,
    isSubMenuMore: false,
  },
);

interface Props extends DashboardMenuSubMenuProps {
  isSubMenuMore?: boolean;
}

const { parentMenu, parentPaths } = useDashboardMenu();
const rootMenu = useDashboardMenuContext();
const subMenu = useDashboardMenuSubMenuContext();
const subMenuStyle = useDashboardMenuStyle(subMenu);

const mouseInChild = ref(false);

const items = ref<DashboardMenuMenuProvider['items']>({});
const subMenus = ref<DashboardMenuMenuProvider['subMenus']>({});
const timer = ref<null | ReturnType<typeof setTimeout>>(null);

createDashboardMenuSubMenuContext({
  addSubMenu,
  handleMouseleave,
  level: (subMenu?.level ?? 0) + 1,
  mouseInChild,
  removeSubMenu,
});

const opened = computed(() => {
  return rootMenu?.openedMenus.includes(props.path);
});
const isTopLevelMenuSubmenu = computed(
  () => parentMenu.value?.type.name === DASHBOARD_MENU_ROOT,
);
const mode = computed(() => rootMenu?.props.mode ?? 'vertical');
const rounded = computed(() => rootMenu?.props.rounded);
const currentLevel = computed(() => subMenu?.level ?? 0);
const isFirstLevel = computed(() => {
  return currentLevel.value === 1;
});

const contentProps = computed<AHoverCardContentProps>(() => {
  const isHorizontal = mode.value === 'horizontal';
  const side = isHorizontal && isFirstLevel.value ? 'bottom' : 'right';

  return {
    collisionPadding: { top: 20 },
    side,
    sideOffset: isHorizontal ? 5 : 10,
  };
});

const active = computed(() => {
  let isActive = false;

  Object.values(items.value).forEach((item) => {
    if (item.active) {
      isActive = true;
    }
  });

  Object.values(subMenus.value).forEach((subItem) => {
    if (subItem.active) {
      isActive = true;
    }
  });

  return isActive;
});

function addSubMenu(subMenu: DashboardMenuMenuItemRegistered) {
  subMenus.value[subMenu.path] = subMenu;
}

function removeSubMenu(subMenu: DashboardMenuMenuItemRegistered) {
  Reflect.deleteProperty(subMenus.value, subMenu.path);
}

/**
 * Click submenu to expand/close
 */
function handleClick() {
  const mode = rootMenu?.props.mode;
  if (
    // When the current menu is disabled, do not expand
    props.disabled
    || (rootMenu?.props.collapse && mode === 'vertical')
    // Do not expand in horizontal mode
    || mode === 'horizontal'
  ) {
    return;
  }

  rootMenu?.handleSubMenuClick({
    active: active.value,
    parentPaths: parentPaths.value,
    path: props.path,
  });
}

function handleMouseenter(event: FocusEvent | MouseEvent, showTimeout = 300) {
  if (event.type === 'focus') {
    return;
  }

  if (
    (!rootMenu?.props.collapse && rootMenu?.props.mode === 'vertical')
    || props.disabled
  ) {
    if (subMenu) {
      subMenu.mouseInChild.value = true;
    }
    return;
  }
  if (subMenu) {
    subMenu.mouseInChild.value = true;
  }

  if (timer.value) {
    window.clearTimeout(timer.value);
  }

  timer.value = setTimeout(() => {
    rootMenu?.openMenu({ path: props.path, parentPaths: parentPaths.value });
  }, showTimeout);

  parentMenu.value?.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'));
}

function handleMouseleave(deepDispatch = false) {
  if (
    !rootMenu?.props.collapse
    && rootMenu?.props.mode === 'vertical'
    && subMenu
  ) {
    subMenu.mouseInChild.value = false;
    return;
  }

  if (timer.value) {
    window.clearTimeout(timer.value);
  }

  if (subMenu) {
    subMenu.mouseInChild.value = false;
  }
  timer.value = setTimeout(() => {
    if (!mouseInChild.value) {
      rootMenu?.closeMenu({ path: props.path, parentPaths: parentPaths.value });
    }
  }, 300);

  if (deepDispatch) {
    subMenu?.handleMouseleave?.(true);
  }
}

const menuIcon = computed(() =>
  active.value ? props.activeIcon || props.icon : props.icon,
);

const item = reactive({
  active,
  parentPaths,
  path: props.path,
});

onMounted(() => {
  subMenu?.addSubMenu?.(item);
  rootMenu?.addSubMenu?.(item);
});

onBeforeUnmount(() => {
  subMenu?.removeSubMenu?.(item);
  rootMenu?.removeSubMenu?.(item);
});
</script>

<template>
  <li
    class="pohon-sub-menu"
    :class="{
      'is-opened': opened,
      'is-active': active,
      'is-disabled': disabled,
    }"
    @focus="handleMouseenter"
    @mouseenter="handleMouseenter"
    @mouseleave="() => handleMouseleave()"
  >
    <template v-if="rootMenu.isMenuPopup">
      <PPopover
        :content="contentProps"
        :open="true"
        :open-delay="0"
        mode="hover"
        :pohon="{
          content: [
            rootMenu.theme,
            'pohon-menu__popup-container',
            `is-${rootMenu.theme}`,
            opened ? '' : 'hidden',
            'overflow-auto',
            'max-h-[calc(var(--radix-hover-card-content-available-height)-20px)]',
          ],
        }"
      >
        <DashboardMenuSubMenuContent
          :class="{
            'is-active': active,
          }"
          :icon="menuIcon"
          :is-menu-more="isSubMenuMore"
          :is-top-level-menu-submenu="isTopLevelMenuSubmenu"
          :level="currentLevel"
          :path="path"
          @click.stop="handleClick"
        >
          <template #title>
            <slot name="title" />
          </template>
        </DashboardMenuSubMenuContent>

        <template #content>
          <div
            :class="[`pohon-menu-is-${mode}`]"
            class="pohon-menu__popup"
            @focus="(e) => handleMouseenter(e, 100)"
            @mouseenter="(e) => handleMouseenter(e, 100)"
            @mouseleave="() => handleMouseleave(true)"
          >
            <ul
              class="pohon-menu"
              :class="{
                'is-rounded': rounded,
              }"
              :style="subMenuStyle"
            >
              <slot />
            </ul>
          </div>
        </template>
      </PPopover>
    </template>

    <template v-else>
      <DashboardMenuSubMenuContent
        :class="{
          'is-active': active,
        }"
        :icon="menuIcon"
        :is-menu-more="isSubMenuMore"
        :is-top-level-menu-submenu="isTopLevelMenuSubmenu"
        :level="currentLevel"
        :path="path"
        @click.stop="handleClick"
      >
        <slot name="content" />

        <template #title>
          <slot name="title" />
        </template>
      </DashboardMenuSubMenuContent>

      <DashboardMenuCollapseTransition>
        <ul
          v-show="opened"
          class="pohon-menu"
          :class="{
            'is-rounded': rounded,
          }"
          :style="subMenuStyle"
        >
          <slot />
        </ul>
      </DashboardMenuCollapseTransition>
    </template>
  </li>
</template>
