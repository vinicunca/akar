<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

import { useForwardExpose } from '../useForwardExpose';

export interface ArrowProps extends APrimitiveProps {
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
import { APrimitive } from '~~/APrimitive';

const props = withDefaults(defineProps<ArrowProps>(), {
  as: 'svg',
  height: 5,
  width: 10,
});

useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    :width="width"
    :height="height"
    :viewBox="asChild ? undefined : '0 0 30 10'"
    :preserveAspectRatio="asChild ? undefined : 'none'"
  >
    <slot><polygon points="0,0 30,0 15,10" /></slot>
  </APrimitive>
</template>
