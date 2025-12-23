<script lang="ts" setup>
import type { DashboardMenuMenuItemProps, DashboardMenuMenuItemRegistered } from '../dashboard-menu.types';
import { PIcon, PTooltip } from '#components';

import { computed, onBeforeUnmount, onMounted, reactive, useSlots } from 'vue';
import { DASHBOARD_MENU_ROOT } from '../dashboard-menu.constants';
import { useDashboardMenu } from '../use-dashboard-menu';
import { useDashboardMenuContext, useDashboardMenuSubMenuContext } from '../use-dashboard-menu-context';
import DashboardMenuBadge from './dashboard-menu-badge.vue';

const props = withDefaults(
  defineProps<DashboardMenuMenuItemProps>(),
  {
    disabled: false,
  },
);

const emits = defineEmits<{ click: [DashboardMenuMenuItemRegistered] }>();

const slots = useSlots();
const rootMenu = useDashboardMenuContext();
const subMenu = useDashboardMenuSubMenuContext();
const { parentMenu, parentPaths } = useDashboardMenu();

const active = computed(() => props.path === rootMenu?.activePath);
const menuIcon = computed(() =>
  active.value ? props.activeIcon || props.icon : props.icon,
);

const isTopLevelMenuItem = computed(
  () => parentMenu.value?.type.name === DASHBOARD_MENU_ROOT,
);

const collapseShowTitle = computed(
  () =>
    rootMenu.props?.collapseShowTitle
    && isTopLevelMenuItem.value
    && rootMenu.props.collapse,
);

const showTooltip = computed(
  () =>
    rootMenu.props.mode === 'vertical'
    && isTopLevelMenuItem.value
    && rootMenu.props?.collapse
    && slots.title,
);

const item: DashboardMenuMenuItemRegistered = reactive({
  active,
  parentPaths: parentPaths.value,
  path: props.path || '',
});

function handleClick() {
  if (props.disabled) {
    return;
  }
  rootMenu?.handleMenuItemClick?.({
    parentPaths: parentPaths.value,
    path: props.path,
  });
  emits('click', item);
}

onMounted(() => {
  subMenu?.addSubMenu?.(item);
  rootMenu?.addMenuItem?.(item);
});

onBeforeUnmount(() => {
  subMenu?.removeSubMenu?.(item);
  rootMenu?.removeMenuItem?.(item);
});
</script>

<template>
  <li
    class="pohon-menu-item"
    :class="[
      rootMenu.theme,
      {
        'is-active': active,
        'is-disabled': disabled,
        'is-collapse-show-title': collapseShowTitle,
      },
    ]"
    role="menuitem"
    @click.stop="handleClick"
  >
    <PTooltip
      v-if="showTooltip"
      :content-class="[rootMenu.theme]"
      :content="{
        side: 'right',
        sideOffset: 5,
      }"
      :delay-duration="0"
    >
      <div class="pohon-menu-tooltip__trigger">
        <PIcon
          v-if="menuIcon"
          class="pohon-menu__icon"
          :name="menuIcon"
        />

        <slot />

        <span
          v-if="collapseShowTitle"
          class="pohon-menu__name"
        >
          <slot name="title" />
        </span>
      </div>

      <template #content>
        <slot name="title" />
      </template>
    </PTooltip>

    <div
      v-show="!showTooltip"
      class="pohon-menu-item__content"
    >
      <DashboardMenuBadge
        v-if="rootMenu.props.mode !== 'horizontal'"
        class="right-2"
        v-bind="props"
      />

      <PIcon
        v-if="menuIcon"
        class="pohon-menu__icon"
        :name="menuIcon"
      />

      <slot />

      <slot name="title" />
    </div>
  </li>
</template>
