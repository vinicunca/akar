<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AToolbarLinkProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { ARovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../shared';

const props = withDefaults(
  defineProps<AToolbarLinkProps>(),
  { as: 'a' },
);

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ARovingFocusItem
    as-child
    focusable
  >
    <APrimitive
      v-bind="props"
      :ref="forwardRef"
      @keydown="(event: KeyboardEvent) => {
        if (event.key === ' ') {
          (event.currentTarget as HTMLElement)?.click();
        }
      }"
    >
      <slot />
    </APrimitive>
  </ARovingFocusItem>
</template>
