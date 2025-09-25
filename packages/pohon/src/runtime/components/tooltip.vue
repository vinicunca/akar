<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ATooltipArrowProps,
  ATooltipContentEmits,
  ATooltipContentProps,
  ATooltipRootEmits,
  ATooltipRootProps,
  ATooltipTriggerProps,
} from 'akar';
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
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<ATooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<ATooltipContentEmits>>;
  /**
   * Display an arrow alongside the tooltip.
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
  default: (props: { open: boolean }) => any;
  content: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ATooltipArrow,
  ATooltipContent,
  ATooltipPortal,
  ATooltipRoot,
  ATooltipTrigger,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
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
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as ATooltipContentProps);
const arrowProps = toRef(() => props.arrow as ATooltipArrowProps);

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
      <ATooltipContent
        v-bind="contentProps"
        :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })"
      >
        <slot name="content">
          <span
            v-if="text"
            :class="pohon.text({ class: props.pohon?.text })"
          >{{ text }}</span>

          <span
            v-if="kbds?.length"
            :class="pohon.kbds({ class: props.pohon?.kbds })"
          >
            <PKbd
              v-for="(kbd, index) in kbds"
              :key="index"
              :size="((props.pohon?.kbdsSize || pohon.kbdsSize()) as PKbdProps['size'])"
              v-bind="isString(kbd) ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <ATooltipArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
        />
      </ATooltipContent>
    </ATooltipPortal>
  </ATooltipRoot>
</template>
