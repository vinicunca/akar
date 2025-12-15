<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardMenuItemBaseProps } from '../types/dashboard-menu';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-menu-sub-menu-content';

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
import { uv } from '../utils/uv';
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

const iconComp = computed(() => {
  return (mode.value === 'horizontal' && !isFirstLevel.value)
    || (mode.value === 'vertical' && collapse.value)
    ? appConfig.pohon.icons.chevronRight
    : appConfig.pohon.icons.chevronDown;
});

const iconArrowStyle = computed(() => {
  return opened.value ? { transform: 'rotate(180deg)' } : {};
});

const appConfig = useAppConfig() as DashboardMenuSubMenuContent['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardMenuSubMenuContent || {}),
  })(),
);
</script>

<template>
  <div
    :class="[
      pohon.root({ class: props.pohon?.root }),
    ]"
    :data-is-collapse-show-title="getCollapseShowTitle"
    :data-is-more="isMenuMore"
  >
    <slot />

    <PIcon
      v-if="!isMenuMore"
      :name="icon"
      :class="pohon.icon({ class: props.pohon?.icon })"
    />

    <div
      v-if="!hiddenTitle"
      :class="pohon.title({ class: props.pohon?.title })"
    >
      <slot name="title" />
    </div>

    <component
      :is="iconComp"
      v-if="!isMenuMore"
      v-show="showArrowIcon"
      :class="pohon.iconArrow({ class: props.pohon?.iconArrow })"
      :style="iconArrowStyle"
    />
  </div>
</template>
