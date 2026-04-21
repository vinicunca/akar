<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PButtonProps, ButtonSlots, PIconProps, KbdProps, PLinkPropsKeys, TooltipProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-search-button';

type ContentSearchButton = ComponentConfig<typeof theme, AppConfig, 'contentSearchButton'>;

export interface ContentSearchButtonProps extends Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'label' | 'color' | 'variant'> {
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
  tooltip?: boolean | TooltipProps;
  /**
   * The keyboard keys to display in the button.
   * `{ variant: 'subtle' }`{lang="ts-type"}
   * @defaultValue ['meta', 'k']
   */
  kbds?: Array<KbdProps['value']> | Array<KbdProps>;
  pohon?: ContentSearchButton['slots'] & PButtonProps['pohon'];
  class?: any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { defu } from 'defu';
import { useForwardProps } from 'akar';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useContentSearch } from '../../composables/useContentSearch';
import { useLocale } from '../../composables/use-locale';
import { omit, transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';
import UKbd from '../Kbd.vue';
import UTooltip from '../Tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ContentSearchButtonProps>(), {
  color: 'neutral',
  collapsed: true,
  tooltip: false,
  kbds: () => ['meta', 'k'],
});
const slots = defineSlots<ButtonSlots>();

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

const getProxySlots = () => omit(slots, ['trailing']);

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'label', 'variant', 'collapsed', 'tooltip', 'kbds', 'class', 'pohon'));
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps);

const { t } = useLocale();
const { open } = useContentSearch();
const appConfig = useAppConfig() as ContentSearchButton['AppConfig'];
const pohonProp = useComponentPohon('contentSearchButton', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contentSearchButton || {}) })({
  collapsed: props.collapsed,
}));
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
          'aria-label': label || t('contentSearchButton.label'),
        } : {}),
        ...$attrs,
      }"
      :class="pohon.base({ class: [pohonProp?.base, props.class] })"
      :pohon="transformPohon(ui, pohonProp)"
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

      <template #trailing="{ pohon: uiProxy }">
        <div
          data-slot="trailing"
          :class="pohon.trailing({ class: pohonProp?.trailing })"
        >
          <slot
            name="trailing"
            :pohon="uiProxy"
          >
            <template v-if="kbds?.length">
              <UKbd
                v-for="(kbd, index) in kbds"
                :key="index"
                variant="subtle"
                v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
              />
            </template>
          </slot>
        </div>
      </template>
    </PButton>
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
