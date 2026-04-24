<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ATooltipArrowProps, ATooltipContentEmits, ATooltipContentProps, ATooltipRootEmits, ATooltipRootProps, ATooltipTriggerProps } from 'akar';
import type { VNode } from 'vue';
import type { PKbdProps } from '../types';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tooltip';

type Tooltip = ComponentConfig<typeof theme, AppConfig, 'tooltip'>;

export interface PTooltipProps extends ATooltipRootProps {
  /** The text content of the tooltip. */
  text?: string;
  /** The keyboard keys to display in the tooltip. */
  kbds?: Array<PKbdProps['value']> | Array<PKbdProps>;
  /**
   * The content of the tooltip.
   *
   * Inherits from the `tooltip.content` of the {@link PAppProps} component when not provided.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<ATooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<ATooltipContentEmits>>;
  /**
   * Display an arrow alongside the tooltip.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<ATooltipArrowProps, 'as' | 'asChild'>;
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
  reference?: ATooltipTriggerProps['reference'];
  class?: any;
  pohon?: Tooltip['slots'];
}

export interface PTooltipEmits extends ATooltipRootEmits {}

export interface PTooltipSlots {
  default?: (props: { open: boolean }) => Array<VNode>;
  content?: (props: { pohon: Tooltip['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipRoot, ATooltipTrigger, injectATooltipProviderContext, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset } from '../composables/use-field-group';
import { usePortal } from '../composables/use-portal';
import { uv } from '../utils/uv';
import PKbd from './kbd.vue';

const props = withDefaults(
  defineProps<PTooltipProps>(),
  {
    portal: true,
  },
);
const emits = defineEmits<PTooltipEmits>();
const slots = defineSlots<PTooltipSlots>();

const appConfig = useAppConfig() as Tooltip['AppConfig'];
const pohonProp = useComponentPohon('tooltip', props);

const providerContext = injectATooltipProviderContext();

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'defaultOpen',
    'open',
    'delayDuration',
    'disableHoverableContent',
    'disableClosingTrigger',
    'ignoreNonKeyboardFocus',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, providerContext.content.value, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as ATooltipContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as ATooltipArrowProps);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.tooltip || {}) })({
  side: contentProps.value.side,
}));
</script>

<template>
  <ATooltipRoot
    v-slot="{ open }"
    v-bind="rootProps"
    :disabled="!(text || kbds?.length || !!slots.content) || props.disabled"
  >
    <ATooltipTrigger
      v-if="!!slots.default || !!reference"
      v-bind="$attrs"
      as-child
      :reference="reference"
      :class="props.class"
    >
      <slot :open="open" />
    </ATooltipTrigger>

    <ATooltipPortal v-bind="portalProps">
      <FieldGroupReset>
        <ATooltipContent
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
              <PKbd
                v-for="(kbd, index) in kbds"
                :key="index"
                :size="((pohonProp?.kbdsSize || pohon.kbdsSize()) as PKbdProps['size'])"
                v-bind="isString(kbd) ? { value: kbd } : kbd"
              />
            </span>
          </slot>

          <ATooltipArrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </ATooltipContent>
      </FieldGroupReset>
    </ATooltipPortal>
  </ATooltipRoot>
</template>
