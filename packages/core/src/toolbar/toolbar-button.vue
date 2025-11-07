<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AToolbarButtonProps extends APrimitiveProps {
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { ARovingFocusItem } from '../roving-focus';
import { useForwardExpose } from '../shared';

const props = withDefaults(defineProps<AToolbarButtonProps>(), { as: 'button' });
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ARovingFocusItem
    as-child
    :focusable="!disabled"
  >
    <APrimitive
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      v-bind="props"
    >
      <slot />
    </APrimitive>
  </ARovingFocusItem>
</template>
