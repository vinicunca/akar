<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ARadioGroupIndicatorProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '../presence';
import { APrimitive } from '../primitive';
import { injectARadioGroupItemContext } from './radio-group-item.vue';

withDefaults(defineProps<ARadioGroupIndicatorProps>(), {
  as: 'span',
});

const { forwardRef } = useForwardExpose();
const itemContext = injectARadioGroupItemContext();
</script>

<template>
  <APresence
    :present="forceMount || itemContext.checked.value"
  >
    <APrimitive
      :ref="forwardRef"
      :data-state="itemContext.checked.value ? 'checked' : 'unchecked'"
      :data-disabled="itemContext.disabled.value ? '' : undefined"
      :as-child="asChild"
      :as="as"
      v-bind="$attrs"
    >
      <slot />
    </APrimitive>
  </APresence>
</template>
