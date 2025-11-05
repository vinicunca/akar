<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, PButtonSlots, PIconProps, PKbdProps, PTooltipProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-search-button';

type ContentSearchButton = ComponentConfig<typeof theme, AppConfig, 'contentSearchButton'>;

export interface PContentSearchButtonProps extends Omit<PButtonProps, 'icon' | 'label' | 'color' | 'variant'> {
  /**
   * The icon displayed in the button.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The label displayed in the button.
   * @defaultValue t('contentSearchButton.label')
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
   * @defaultValue true
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
  pohon?: ContentSearchButton['slots'] & PButtonProps['pohon'];
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
import { useContentSearch } from '../../composables/use-content-search';
import { useLocale } from '../../composables/use-locale';
import { transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';
import PKbd from '../kbd.vue';
import PTooltip from '../tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PContentSearchButtonProps>(),
  {
    color: 'neutral',
    collapsed: true,
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
const tooltipProps = toRef(() => defu(
  isBoolean(props.tooltip) ? {} : props.tooltip,
  { delayDuration: 0, content: { side: 'right' } },
) as PTooltipProps);

const { t } = useLocale();
const { open } = useContentSearch();
const appConfig = useAppConfig() as ContentSearchButton['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentSearchButton || {}),
  })(),
);
</script>

<template>
  <DefineButtonTemplate>
    <PButton
      :icon="icon || appConfig.pohon.icons.search"
      :label="label || t('contentSearchButton.label')"
      :variant="variant || (collapsed ? 'ghost' : 'outline')"
      v-bind="{
        ...buttonProps,
        ...(collapsed ? {
          'square': true,
          'label': undefined,
          'aria-label': label || t('contentSearchButton.label'),
        } : {}),
        ...$attrs,
      }"
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
      :pohon="transformPohon(pohon, props.pohon)"
      @click="open = true"
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
        v-if="!collapsed"
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
    :text="label || t('contentSearchButton.label')"
    v-bind="tooltipProps"
  >
    <ReuseButtonTemplate />
  </PTooltip>
  <ReuseButtonTemplate v-else />
</template>
