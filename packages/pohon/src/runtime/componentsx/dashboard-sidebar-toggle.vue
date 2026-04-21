<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar-toggle';

type DashboardSidebarToggle = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarToggle'>;

export interface DashboardSidebarToggleProps extends Omit<PButtonProps, PLinkPropsKeys | 'color' | 'variant'> {
  /**
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant'];
  /**
   * The side of the sidebar to toggle.
   * @defaultValue 'left'
   */
  side?: 'left' | 'right';
  pohon?: { base?: any };
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { computed, ref } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PButton from './button.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DashboardSidebarToggleProps>(), {
  color: 'neutral',
  variant: 'ghost',
  side: 'left',
});

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'side', 'class'));

const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebarToggle['AppConfig'];
const pohonProp = useComponentPohon('dashboardSidebarToggle', props);
const { sidebarOpen, toggleSidebar } = useDashboard({ sidebarOpen: ref(false), toggleSidebar: () => {} });

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardSidebarToggle || {}) }));
</script>

<template>
  <PButton
    v-bind="{
      ...buttonProps,
      'icon': props.icon || (sidebarOpen ? appConfig.pohon.icons.close : appConfig.pohon.icons.menu),
      'aria-label': sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open'),
      ...$attrs,
    }"
    :class="pohon({ class: [pohonProp?.base, props.class], side: props.side })"
    @click="toggleSidebar"
  />
</template>
