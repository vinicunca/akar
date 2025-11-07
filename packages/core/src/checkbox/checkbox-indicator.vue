<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ACheckboxIndicatorProps extends APrimitiveProps {
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
import { injectACheckboxRootContext } from './checkbox-root.vue';
import { getState, isIndeterminate } from './utils';

withDefaults(defineProps<ACheckboxIndicatorProps>(), {
  as: 'span',
});
const { forwardRef } = useForwardExpose();

const rootContext = injectACheckboxRootContext();
</script>

<template>
  <APresence
    :present="forceMount || isIndeterminate(rootContext.state.value) || rootContext.state.value === true"
  >
    <APrimitive
      :ref="forwardRef"
      :data-state="getState(rootContext.state.value)"
      :data-disabled="rootContext.disabled.value ? '' : undefined"
      :style="{ pointerEvents: 'none' }"
      :as-child="asChild"
      :as="as"
      v-bind="$attrs"
    >
      <slot />
    </APrimitive>
  </APresence>
</template>
