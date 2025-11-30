<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  PButtonProps,
  PButtonSlots,
  PIconProps,
  PKbdProps,
  PLinkPropsKeys,
  PTooltipProps,
} from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-search-button';

type DashboardSearchButton = ComponentConfig<typeof theme, AppConfig, 'dashboardSearchButton'>;

export interface PDashboardSearchButtonProps extends Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'label' | 'color' | 'variant'> {
  /**
   * The icon displayed in the button.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The label displayed in the button.
   * @defaultValue t('dashboardSearchButton.label')
   */
  label?: string;
  /**
   * The color of the button.
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * The variant of the button.
   * Defaults to 'outline' when not collapsed, 'ghost' when collapsed.
   */
  variant?: PButtonProps['variant'];
  /**
   * Whether the button is collapsed.
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * Display a tooltip on the button when is collapsed with the button label.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | PTooltipProps;
  /**
   * The keyboard keys to display in the button.
   * `{ variant: 'subtle' }`{lang="ts-type"}
   * @defaultValue ['meta', 'k']
   */
  kbds?: Array<PKbdProps['value']> | Array<PKbdProps>;
  pohon?: DashboardSearchButton['slots'] & PButtonProps['pohon'];
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isBoolean, isString, omit } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { transformPohon } from '../utils';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PKbd from './kbd.vue';
import PTooltip from './tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PDashboardSearchButtonProps>(),
  {
    color: 'neutral',
    collapsed: false,
    tooltip: false,
    kbds: () => ['meta', 'k'],
  },
);
const slots = defineSlots<PButtonSlots>();

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

const getProxySlots = () => omit(slots, ['trailing']);

const buttonProps = useForwardProps(
  reactiveOmit(props, 'icon', 'label', 'variant', 'collapsed', 'tooltip', 'kbds', 'class', 'pohon'),
);
const tooltipProps = toRef(() =>
  defu(
    isBoolean(props.tooltip) ? {} : props.tooltip,
    { delayDuration: 0, content: { side: 'right' } },
  ) as PTooltipProps);

const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSearchButton['AppConfig'];
const { toggleSearch } = useDashboard({ toggleSearch: () => {} });

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSearchButton || {}),
  })({
    collapsed: props.collapsed,
  }),
);
</script>

<template>
  <DefineButtonTemplate>
    <PButton
      :icon="icon || appConfig.pohon.icons.search"
      :label="label || t('dashboardSearchButton.label')"
      :variant="variant || (collapsed ? 'ghost' : 'outline')"
      v-bind="{
        ...buttonProps,
        ...(collapsed ? {
          'square': true,
          'aria-label': label || t('dashboardSearchButton.label'),
        } : {}),
        ...$attrs,
      }"
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
      :pohon="transformPohon(pohon, props.pohon)"
      @click="toggleSearch"
    >
      <template
        v-for="(_, name) in getProxySlots()"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>

      <template
        #trailing="{ pohon: pohonProxy }"
      >
        <div :class="pohon.trailing({ class: props.pohon?.trailing })">
          <slot
            name="trailing"
            :pohon="pohonProxy"
          >
            <template v-if="kbds?.length">
              <PKbd
                v-for="(kbd, index) in kbds"
                :key="index"
                variant="subtle"
                v-bind="isString(kbd) ? { value: kbd } : kbd"
              />
            </template>
          </slot>
        </div>
      </template>
    </PButton>
  </DefineButtonTemplate>

  <PTooltip
    v-if="collapsed && tooltip"
    :text="label || t('dashboardSearchButton.label')"
    v-bind="tooltipProps"
  >
    <ReuseButtonTemplate />
  </PTooltip>
  <ReuseButtonTemplate v-else />
</template>
