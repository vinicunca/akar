<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { TooltipArrowProps, TooltipContentEmits, TooltipContentProps, TooltipRootEmits, TooltipRootProps, TooltipTriggerProps } from 'akar';
import type { VNode } from 'vue';
import type { KbdProps } from '../types';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tooltip';

type Tooltip = ComponentConfig<typeof theme, AppConfig, 'tooltip'>;

export interface TooltipProps extends TooltipRootProps {
  /** The text content of the tooltip. */
  text?: string;
  /** The keyboard keys to display in the tooltip. */
  kbds?: Array<KbdProps['value']> | Array<KbdProps>;
  /**
   * The content of the tooltip.
   *
   * Inherits from the `tooltip.content` of the {@link AppProps} component when not provided.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<TooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<TooltipContentEmits>>;
  /**
   * Display an arrow alongside the tooltip.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<TooltipArrowProps, 'as' | 'asChild'>;
  /**
   * Render the tooltip in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: TooltipTriggerProps['reference'];
  class?: any;
  pohon?: Tooltip['slots'];
}

export interface TooltipEmits extends TooltipRootEmits {}

export interface TooltipSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props: { pohon: Tooltip['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { injectTooltipProviderContext, TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset } from '../composables/useFieldGroup';
import { usePortal } from '../composables/usePortal';
import { uv } from '../utils/uv';
import UKbd from './Kbd.vue';

const props = withDefaults(defineProps<TooltipProps>(), {
  portal: true,
});
const emits = defineEmits<TooltipEmits>();
const slots = defineSlots<TooltipSlots>();

const appConfig = useAppConfig() as Tooltip['AppConfig'];
const pohonProp = useComponentPohon('tooltip', props);

const providerContext = injectTooltipProviderContext();

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'delayDuration', 'disableHoverableContent', 'disableClosingTrigger', 'ignoreNonKeyboardFocus'), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, providerContext.content.value, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as TooltipContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as TooltipArrowProps);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.tooltip || {}) })({
  side: contentProps.value.side,
}));
</script>

<template>
  <TooltipRoot
    v-slot="{ open }"
    v-bind="rootProps"
    :disabled="!(text || kbds?.length || !!slots.content) || props.disabled"
  >
    <TooltipTrigger
      v-if="!!slots.default || !!reference"
      v-bind="$attrs"
      as-child
      :reference="reference"
      :class="props.class"
    >
      <slot :open="open" />
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <FieldGroupReset>
        <TooltipContent
          v-bind="contentProps"
          data-slot="content"
          :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
        >
          <slot
            name="content"
            :pohon="pohon"
          >
            <span
              v-if="text"
              data-slot="text"
              :class="pohon.text({ class: pohonProp?.text })"
            >{{ text }}</span>

            <span
              v-if="kbds?.length"
              data-slot="kbds"
              :class="pohon.kbds({ class: pohonProp?.kbds })"
            >
              <UKbd
                v-for="(kbd, index) in kbds"
                :key="index"
                :size="((pohonProp?.kbdsSize || pohon.kbdsSize()) as KbdProps['size'])"
                v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
              />
            </span>
          </slot>

          <TooltipArrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </TooltipContent>
      </FieldGroupReset>
    </TooltipPortal>
  </TooltipRoot>
</template>
