<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { IconProps, KbdProps, PButtonProps, PButtonSlots, PTooltipProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/content/content-search-button';

type ContentSearchButton = ComponentConfig<typeof theme, AppConfig, 'contentSearchButton'>;

export interface ContentSearchButtonProps {
  /**
   * The icon displayed in the button.
   * @defaultValue appConfig.ui.icons.search
   * @IconifyIcon
   */
  icon?: IconProps['name'];
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
  size?: PButtonProps['size'];
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
  kbds?: Array<KbdProps['value']> | Array<KbdProps>;
  pohon?: ContentSearchButton['slots'] & PButtonProps['ui'];
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { defu } from 'defu';
import { useForwardProps } from 'reka-ui';
import { computed, toRef } from 'vue';
import { useContentSearch } from '../../composables/useContentSearch';
import { useLocale } from '../../composables/useLocale';
import { omit, transformUI } from '../../utils';
import { tv } from '../../utils/tv';
import UButton from '../button.vue';
import PKbd from '../Kbd.vue';
import UTooltip from '../Tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ContentSearchButtonProps>(), {
  color: 'neutral',
  collapsed: true,
  tooltip: false,
  kbds: () => ['meta', 'k'],
});
const slots = defineSlots<PButtonSlots>();

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

const getProxySlots = () => omit(slots, ['trailing']);

const rootProps = useForwardProps(reactivePick(props, 'color', 'size'));
const tooltipProps = toRef(() => defu(isBoolean(props.tooltip) ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as PTooltipProps);

const { t } = useLocale();
const { open } = useContentSearch();
const appConfig = useAppConfig() as ContentSearchButton['AppConfig'];

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.contentSearchButton || {}) })());
</script>

<template>
  <DefineButtonTemplate>
    <UButton
      :icon="icon || appConfig.ui.icons.search"
      :label="label || t('contentSearchButton.label')"
      :variant="variant || (collapsed ? 'ghost' : 'outline')"
      v-bind="{
        ...rootProps,
        ...(collapsed ? {
          'square': true,
          'label': undefined,
          'aria-label': label || t('contentSearchButton.label'),
        } : {}),
        ...$attrs,
      }"
      :class="ui.base({ class: [props.pohon?.base, props.class] })"
      :ui="transformUI(ui, props.ui)"
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
        #trailing
      >
        <div :class="ui.trailing({ class: props.pohon?.trailing })">
          <slot name="trailing">
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
    </UButton>
  </DefineButtonTemplate>

  <UTooltip
    v-if="collapsed && tooltip"
    :text="label || t('contentSearchButton.label')"
    v-bind="tooltipProps"
  >
    <ReuseButtonTemplate />
  </UTooltip>
  <ReuseButtonTemplate v-else />
</template>
