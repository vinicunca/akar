<script lang="ts" setup>
import type { DashboardMenuUiMenuItemProps } from '../dashboard-menu-ui.types';

import { PIcon } from '#components';
import { computed } from 'vue';

import { useDashboardMenuUiContext } from '../composables/use-dashboard-menu-ui-context';

interface Props extends DashboardMenuUiMenuItemProps {
  isMenuMore?: boolean;
  isTopLevelMenuSubmenu: boolean;
  level?: number;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isMenuMore: false,
    level: 0,
  },
);

const rootMenu = useDashboardMenuUiContext();

const opened = computed(() => {
  return rootMenu?.openedMenus.includes(props.path);
});

const collapse = computed(() => {
  return rootMenu.props.collapse;
});

const isFirstLevel = computed(() => {
  return props.level === 1;
});

const getCollapseShowTitle = computed(() => {
  return (
    rootMenu.props.collapseShowTitle && isFirstLevel.value && collapse.value
  );
});

const mode = computed(() => {
  return rootMenu?.props.mode;
});

const showArrowIcon = computed(() => {
  return mode.value === 'horizontal' || !(isFirstLevel.value && collapse.value);
});

const hiddenTitle = computed(() => {
  return (
    mode.value === 'vertical'
    && isFirstLevel.value
    && collapse.value
    && !getCollapseShowTitle.value
  );
});

const iconComp = computed(() => {
  return (mode.value === 'horizontal' && !isFirstLevel.value)
    || (mode.value === 'vertical' && collapse.value)
    ? 'i-lucide:chevron-right'
    : 'i-lucide:chevron-down';
});

const iconArrowStyle = computed(() => {
  return opened.value ? { transform: 'rotate(180deg)' } : {};
});
</script>

<template>
  <div
    class="pohon-sub-menu-content"
    :class="[
      {
        'is-collapse-show-title': getCollapseShowTitle,
        'is-more': isMenuMore,
      },
    ]"
  >
    <slot />

    <PIcon
      v-if="!isMenuMore && icon"
      class="pohon-menu__icon"
      :name="icon"
    />

    <div
      v-if="!hiddenTitle"
      class="pohon-sub-menu-content__title"
    >
      <slot name="title" />
    </div>

    <component
      :is="iconComp"
      v-if="!isMenuMore"
      v-show="showArrowIcon"
      class="pohon-sub-menu-content__icon-arrow size-4"
      :style="iconArrowStyle"
    />
  </div>
</template>
