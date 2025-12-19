<script lang="ts" setup>
import type { DashboardMenuUiMenuItemProps, DashboardMenuUiMenuItemRegistered } from '../dashboard-menu-ui.types';
import { PIcon, PTooltip } from '#components';

import { computed, onBeforeUnmount, onMounted, reactive, useSlots } from 'vue';
import { useDashboardMenuUi } from '../composables/use-dashboard-menu-ui';
import { useDashboardMenuUiContext, useDashboardMenuUiSubMenuContext } from '../composables/use-dashboard-menu-ui-context';
import DashboardMenuUiBadge from './dashboard-menu-ui-badge.vue';

const props = withDefaults(
  defineProps<DashboardMenuUiMenuItemProps>(),
  {
    disabled: false,
  },
);

const emits = defineEmits<{ click: [DashboardMenuUiMenuItemRegistered] }>();

const slots = useSlots();
const rootMenu = useDashboardMenuUiContext();
const subMenu = useDashboardMenuUiSubMenuContext();
const { parentMenu, parentPaths } = useDashboardMenuUi();

const active = computed(() => props.path === rootMenu?.activePath);
const menuIcon = computed(() =>
  active.value ? props.activeIcon || props.icon : props.icon,
);

const isTopLevelMenuItem = computed(
  () => parentMenu.value?.type.name === 'NgiburMenuRoot',
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

const item: DashboardMenuUiMenuItemRegistered = reactive({
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
    class="ngibur-menu-item"
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
      <DashboardMenuUiBadge
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
