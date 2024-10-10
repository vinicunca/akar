<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ALabelProps extends APrimitiveProps {
  /** The id of the element the label is associated with. */
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<ALabelProps>(),
  {
    as: 'label',
  },
);

useForwardExpose();

function handleMousedown(event: MouseEvent): void {
  // prevent text selection when double clicking label
  if (!event.defaultPrevented && event.detail > 1) {
    event.preventDefault();
  }
}
</script>

<template>
  <APrimitive
    v-bind="props"
    @mousedown="handleMousedown"
  >
    <slot />
  </APrimitive>
</template>
