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

const arrowWrapperStyle = computed(() => {
  const style: Record<string, any> = {
    [baseSide.value]: 0,
    left: contentContext.arrowX?.value ? `${contentContext.arrowX.value}px` : undefined,
    position: 'absolute',
    top: contentContext.arrowY?.value ? `${contentContext.arrowY.value}px` : undefined,
    visibility: contentContext.shouldHideArrow.value ? 'hidden' : undefined,
  };

  const transformOrigins = {
    bottom: 'center 0',
    left: '100% 0',
    right: '0 0',
    top: '',
  };
  style.transformOrigin = transformOrigins[contentContext.placedSide.value];

  const transforms = {
    bottom: 'rotate(180deg)',
    left: 'translateY(50%) rotate(-90deg) translateX(50%)',
    right: 'translateY(50%) rotate(90deg) translateX(-50%)',
    top: 'translateY(100%)',
  };
  style.transform = transforms[contentContext.placedSide.value];

  return style;
});

const arrowStyle = computed(() => ({
  display: 'block',
}));

function setArrowRef(el: HTMLElement) {
  contentContext.onArrowChange(el);
  return undefined;
}
</script>

<template>
  <span
    :ref="setArrowRef"
    :style="arrowWrapperStyle"
  >
    <AArrow
      v-bind="$attrs"
      :ref="forwardRef"
      :style="arrowStyle"
      :as="as"
      :as-child="asChild"
      :width="width"
      :height="height"
    >
      <slot />
    </AArrow>
  </span>
</template>
