<script lang="ts">
export interface DashboardMenuNormalMenuProps {
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
  menus?: Array<DashboardMenuRecord>;
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
</script>

<script setup lang="ts">
import type { DashboardMenuRecord } from '../dashboard-menu.types';
import { PIcon } from '#components';

const props = withDefaults(
  defineProps<DashboardMenuNormalMenuProps>(),
  {
    activePath: '',
    collapse: false,
    menus: () => [],
    theme: 'dark',
  },
);

const emits = defineEmits<{
  enter: [DashboardMenuRecord];
  select: [DashboardMenuRecord];
}>();

function menuIcon(menu: DashboardMenuRecord) {
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
