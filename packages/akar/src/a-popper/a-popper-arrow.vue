<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';
import type { ArrowProps } from '~~/shared/component/a-arrow.vue';

import type { Side } from './utils';

const OPPOSITE_SIDE: Record<Side, Side> = {
  bottom: 'top',
  left: 'right',
  right: 'left',
  top: 'bottom',
};

export interface APopperArrowProps extends ArrowProps, APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { useForwardExpose } from '~~/shared';
import AArrow from '~~/shared/component/a-arrow.vue';

import { injectPopperContentContext } from './a-popper-content.vue';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<APopperArrowProps>(),
  { as: 'svg' },
);

const { forwardRef } = useForwardExpose();
const contentContext = injectPopperContentContext();

const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
</script>

<template>
  <span
    :ref="(el: HTMLElement) => {
      contentContext.onArrowChange(el)
      return undefined
    }"
    :style="{
      position: 'absolute',
      left: contentContext.arrowX?.value ? `${contentContext.arrowX?.value}px` : undefined,
      top: contentContext.arrowY?.value ? `${contentContext.arrowY?.value}px` : undefined,
      [baseSide]: 0,
      transformOrigin: {
        top: '',
        right: '0 0',
        bottom: 'center 0',
        left: '100% 0',
      }[contentContext.placedSide.value],
      transform: {
        top: 'translateY(100%)',
        right: 'translateY(50%) rotate(90deg) translateX(-50%)',
        bottom: `rotate(180deg)`,
        left: 'translateY(50%) rotate(-90deg) translateX(50%)',
      }[contentContext.placedSide.value],
      visibility: contentContext.shouldHideArrow.value ? 'hidden' : undefined,
    }"
  >
    <AArrow
      v-bind="$attrs"
      :ref="forwardRef"
      :style="{
        display: 'block',
      }"
      :as="as"
      :as-child="asChild"
      :width="width"
      :height="height"
    >
      <slot />
    </AArrow>
  </span>
</template>
