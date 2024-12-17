<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ATooltipArrowProps extends APrimitiveProps {
  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 10
   */
  width?: number;

  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 5
   */
  height?: number;
}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/popper';

const props = withDefaults(defineProps<ATooltipArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
useForwardExpose();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
