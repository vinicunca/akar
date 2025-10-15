<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-sidebar-toggle';

type DashboardSidebarToggle = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarToggle'>;

export interface PDashboardSidebarToggleProps extends /** @vue-ignore */ Pick<PButtonProps, 'as' | 'size' | 'disabled' | 'pohon'> {
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
  defineProps<PDashboardSidebarToggleProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
    side: 'left',
  },
);

const rootProps = useForwardProps(reactivePick(props, 'color', 'variant', 'size'));

const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebarToggle['AppConfig'];
const { sidebarOpen, toggleSidebar } = useDashboard({ sidebarOpen: ref(false), toggleSidebar: () => {} });

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSidebarToggle || {}),
  }),
);
</script>

<template>
  <PButton
    v-bind="rootProps"
    :aria-label="sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open')"
    :icon="sidebarOpen ? appConfig.pohon.icons.close : appConfig.pohon.icons.menu"
    :class="pohon({ class: props.class, side: props.side })"
    @click="toggleSidebar"
  />
</template>
