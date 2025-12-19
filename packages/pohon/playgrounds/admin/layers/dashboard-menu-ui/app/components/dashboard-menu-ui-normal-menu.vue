<script setup lang="ts">
import type { DashboardMenuUiRecord } from '../dashboard-menu-ui.types';
import { PIcon } from '#components';

interface NormalMenuProps {
  /**
   * Menu active path
   */
  activePath?: string;
  /**
   * Whether to collapse
   */
  collapse?: boolean;
  /**
   * Menu items
   */
  menus?: Array<DashboardMenuUiRecord>;
  /**
   * Whether to use rounded style
   * @default true
   */
  rounded?: boolean;
  /**
   * Theme
   */
  theme?: 'dark' | 'light';
}

const props = withDefaults(
  defineProps<NormalMenuProps>(),
  {
    activePath: '',
    collapse: false,
    menus: () => [],
    theme: 'dark',
  },
);

const emits = defineEmits<{
  enter: [DashboardMenuUiRecord];
  select: [DashboardMenuUiRecord];
}>();

function menuIcon(menu: DashboardMenuUiRecord) {
  return props.activePath === menu.path
    ? menu.activeIcon || menu.icon
    : menu.icon;
}
</script>

<template>
  <ul
    :class="[
      theme,
      {
        'is-collapse': collapse,
        'is-rounded': rounded,
      },
      `is-${theme}`,
    ]"
    class="pohon-normal-menu relative"
  >
    <template
      v-for="menu in menus"
      :key="menu.path"
    >
      <li
        class="pohon-normal-menu__item"
        :class="{
          'is-active': activePath === menu.path,
        }"
        @click="() => emits('select', menu)"
        @mouseenter="() => emits('enter', menu)"
      >
        <PIcon
          class="pohon-normal-menu__icon"
          :name="menuIcon(menu) ?? 'lucide:chevron-right'"
        />

        <span
          class="pohon-normal-menu__name truncate"
        > {{ menu.name }}</span>
      </li>
    </template>
  </ul>
</template>
