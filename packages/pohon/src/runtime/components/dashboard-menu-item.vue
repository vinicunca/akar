<script lang="ts">
import type theme from '#build/pohon/dashboard-menu-sub-menu-content';
import type { AppConfig } from '@nuxt/schema';
import type { PDashboardMenuItemBaseProps, PDashboardMenuItemRegistered } from '../types';
import type { ComponentConfig } from '../types/uv';

type DashboardMenuItem = ComponentConfig<typeof theme, AppConfig, 'dashboardMenuItem'>;

export interface PDashboardMenuItemProps extends PDashboardMenuItemBaseProps {
  pohon?: DashboardMenuItem['slots'];
}
</script>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive, useSlots } from 'vue';
import { useMenu } from '../composables/use-dashboard-menu';
import { useMenuContext, useSubMenuContext } from '../composables/use-dashboard-menu-context';
import { P_DASHBOARD_MENU_ROOT } from '../utils/dashboard';
import PIcon from './icon.vue';
import PTooltip from './tooltip.vue';

const props = withDefaults(
  defineProps<PDashboardMenuItemProps>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  click: [PDashboardMenuItemRegistered];
}>();

const slots = useSlots();
const rootMenu = useMenuContext();
const subMenu = useSubMenuContext();
const { parentMenu, parentPaths } = useMenu();

const active = computed(() => props.path === rootMenu?.activePath);
const menuIcon = computed(() =>
  active.value ? props.activeIcon || props.icon : props.icon,
);

const isTopLevelMenuItem = computed(
  () => parentMenu.value?.type.name === P_DASHBOARD_MENU_ROOT,
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

const item: PDashboardMenuItemRegistered = reactive({
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
  emit('click', item);
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
    :class="[
      rootMenu.theme,
    ]"
    role="menuitem"
    @click.stop="handleClick"
  >
    <PTooltip
      v-if="showTooltip"
      :content-class="[rootMenu.theme]"
      side="right"
    >
      <template #trigger>
        <div>
          <PIcon
            :name="menuIcon"
          />
          <slot />
          <span
            v-if="collapseShowTitle"
          >
            <slot name="title" />
          </span>
        </div>
      </template>
      <slot name="title" />
    </PTooltip>
    <div
      v-show="!showTooltip"
    >
      <!-- <MenuBadge
        v-if="rootMenu.props.mode !== 'horizontal'"
        class="right-2"
        v-bind="props"
      />
      <VbenIcon
        :class="nsMenu.e('icon')"
        :icon="menuIcon"
      /> -->
      <slot />

      <slot name="title" />
    </div>
  </li>
</template>
