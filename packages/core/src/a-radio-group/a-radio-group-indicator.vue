<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ARadioGroupIndicatorProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectARadioGroupItemContext } from './a-radio-group-item.vue';

withDefaults(
  defineProps<ARadioGroupIndicatorProps>(),
  {
    as: 'span',
  },
);

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
