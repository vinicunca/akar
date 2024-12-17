<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface LabelProps extends APrimitiveProps {
  /** The id of the element the label is associated with. */
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<LabelProps>(), {
  as: 'label',
});

useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    @mousedown="(event) => {
      // prevent text selection when double clicking label
      if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
    }"
  >
    <slot />
  </APrimitive>
</template>
