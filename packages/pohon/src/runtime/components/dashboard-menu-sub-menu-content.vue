<script lang="ts">
import type theme from '#build/pohon/dashboard-menu-sub-menu-content';
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardMenuItemBaseProps } from '../types/dashboard-menu';
import type { ComponentConfig } from '../types/uv';

type DashboardMenuSubMenuContent = ComponentConfig<typeof theme, AppConfig, 'dashboardMenuSubMenuContent'>;

export interface PDashboardMenuSubMenuContent extends PDashboardMenuItemBaseProps {
  isMenuMore?: boolean;
  isTopLevelMenuSubmenu: boolean;
  level?: number;
  pohon?: DashboardMenuSubMenuContent['slots'];
}
</script>

<script lang="ts" setup>
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useMenuContext } from '../composables/use-dashboard-menu-context';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PDashboardMenuSubMenuContent>(),
  {
    isMenuMore: false,
    level: 0,
  },
);

const rootMenu = useMenuContext();

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

const appConfig = useAppConfig() as DashboardMenuSubMenuContent['AppConfig'];

const iconComp = computed(() => {
  return (mode.value === 'horizontal' && !isFirstLevel.value)
    || (mode.value === 'vertical' && collapse.value)
    ? appConfig.pohon.icons.chevronRight
    : appConfig.pohon.icons.chevronDown;
});

const iconArrowStyle = computed(() => {
  return opened.value ? { transform: 'rotate(180deg)' } : {};
});
</script>

<template>
  <div
    :class="[
    ]"
  >
    <slot />

    <PIcon
      v-if="!isMenuMore"
      :name="icon"
    />

    <div
      v-if="!hiddenTitle"
    >
      <slot name="title" />
    </div>

    <component
      :is="iconComp"
      v-if="!isMenuMore"
      v-show="showArrowIcon"
      :style="iconArrowStyle"
    />
  </div>
</template>
