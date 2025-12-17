<script lang="ts">
import type theme from '#build/pohon/dashboard-menu-sub-menu-content';
import type { AppConfig } from '@nuxt/schema';
import type { AHoverCardContentProps } from 'akar';
import type { PDashboardMenuBadgeRaw, PDashboardMenuItemRegistered, PDashboardMenuProvider, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';

type DashboardMenuSubMenu = ComponentConfig<typeof theme, AppConfig, 'dashboardMenuSubMenu'>;

export interface PDashboardMenuSubMenuProps extends PDashboardMenuBadgeRaw {
  /**
   * Active icon
   */
  activeIcon?: string;
  /**
   * Whether it is disabled
   */
  disabled?: boolean;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * Submenu name
   */
  path: string;
  isSubMenuMore?: boolean;
  pohon?: DashboardMenuSubMenu['slots'];
}
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useMenu, useMenuStyle } from '../composables/use-dashboard-menu';
import { createSubMenuContext, useMenuContext, useSubMenuContext } from '../composables/use-dashboard-menu-context';
import { P_DASHBOARD_MENU_ROOT, P_DASHBOARD_MENU_SUBMENU } from '../constants';
import PDashboardCollapseTransition from './dashboard-menu-collapse-transition.vue';
import PDashboardMenuSubMenuContent from './dashboard-menu-sub-menu-content.vue';
import PPopover from './popover.vue';

defineOptions({
  name: P_DASHBOARD_MENU_SUBMENU,
});

const props = withDefaults(
  defineProps<PDashboardMenuSubMenuProps>(),
  {
    disabled: false,
    isSubMenuMore: false,
  },
);

const { parentMenu, parentPaths } = useMenu();
const rootMenu = useMenuContext();
const subMenu = useSubMenuContext();
const subMenuStyle = useMenuStyle(subMenu);

const mouseInChild = ref(false);

const items = ref<PDashboardMenuProvider['items']>({});
const subMenus = ref<PDashboardMenuProvider['subMenus']>({});
const timer = ref<null | ReturnType<typeof setTimeout>>(null);

createSubMenuContext({
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
  () => parentMenu.value?.type.name === P_DASHBOARD_MENU_ROOT,
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

function addSubMenu(subMenu: PDashboardMenuItemRegistered) {
  subMenus.value[subMenu.path] = subMenu;
}

function removeSubMenu(subMenu: PDashboardMenuItemRegistered) {
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
    || (rootMenu?.props.collapsed && mode === 'vertical')
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
    (!rootMenu?.props.collapsed && rootMenu?.props.mode === 'vertical')
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

  timer.value && window.clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    rootMenu?.openMenu({ path: props.path, parentPaths: parentPaths.value });
  }, showTimeout);
  parentMenu.value?.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'));
}

function handleMouseleave(deepDispatch = false) {
  if (
    !rootMenu?.props.collapsed
    && rootMenu?.props.mode === 'vertical'
    && subMenu
  ) {
    subMenu.mouseInChild.value = false;
    return;
  }

  timer.value && window.clearTimeout(timer.value);

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
    :class="[
    ]"
    @focus="handleMouseenter"
    @mouseenter="handleMouseenter"
    @mouseleave="() => handleMouseleave()"
  >
    <template v-if="rootMenu.isMenuPopup">
      <PPopover
        :content-class="[
          rootMenu.theme,
        ]"
        :content-props="contentProps"
        :open="true"
        :open-delay="0"
        mode="hover"
      >
        <PDashboardMenuSubMenuContent
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
        </PDashboardMenuSubMenuContent>

        <template #content>
          <div
            @focus="(e) => handleMouseenter(e, 100)"
            @mouseenter="(e) => handleMouseenter(e, 100)"
            @mouseleave="() => handleMouseleave(true)"
          >
            <ul
              :style="subMenuStyle"
            >
              <slot />
            </ul>
          </div>
        </template>
      </PPopover>
    </template>

    <template v-else>
      <PDashboardMenuSubMenuContent
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
      </PDashboardMenuSubMenuContent>

      <PDashboardCollapseTransition>
        <ul
          v-show="opened"
          :style="subMenuStyle"
        >
          <slot />
        </ul>
      </PDashboardCollapseTransition>
    </template>
  </li>
</template>
