<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATooltipArrowProps extends APrimitiveProps {
  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 5
   */
  height?: number;

  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 10
   */
  width?: number;
}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/a-popper';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<ATooltipArrowProps>(),
  {
    width: 10,
    height: 5,
    as: 'svg',
  },
);

useForwardExpose();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
