<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ALabelProps extends APrimitiveProps {
  /** The id of the element the label is associated with. */
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ALabelProps>(), {
  as: 'label',
});

useForwardExpose();

function handleMouseDown(event: MouseEvent) {
  // prevent text selection when double clicking label
  if (!event.defaultPrevented && event.detail > 1) {
    event.preventDefault();
  }
}
</script>

<template>
  <APrimitive
    v-bind="props"
    @mousedown="handleMouseDown"
  >
    <slot />
  </APrimitive>
</template>
