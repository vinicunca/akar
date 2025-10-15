<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar-collapse';

type DashboardSidebarCollapse = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarCollapse'>;

export interface PDashboardSidebarCollapseProps extends /** @vue-ignore */ Pick<PButtonProps, 'as' | 'size' | 'disabled' | 'pohon'> {
  side?: 'left' | 'right';
  /**
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant'];
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { computed, ref } from 'vue';
import { useLocale } from '../composables/use-locale';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = withDefaults(
  defineProps<PDashboardSidebarCollapseProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
    side: 'left',
  },
);

const rootProps = useForwardProps(
  reactivePick(props, 'color', 'variant', 'size'),
);

const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebarCollapse['AppConfig'];
const { sidebarCollapsed, collapseSidebar } = useDashboard({ sidebarCollapsed: ref(false), collapseSidebar: () => {} });

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSidebarCollapse || {}),
  }),
);
</script>

<template>
  <PButton
    v-bind="rootProps"
    :aria-label="sidebarCollapsed ? t('dashboardSidebarCollapse.expand') : t('dashboardSidebarCollapse.collapse')"
    :icon="sidebarCollapsed ? appConfig.pohon.icons.panelOpen : appConfig.pohon.icons.panelClose"
    :class="pohon({ class: props.class, side: props.side })"
    @click="collapseSidebar?.(!sidebarCollapsed)"
  />
</template>
