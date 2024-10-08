<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACheckboxIndicatorProps extends APrimitiveProps {
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

import { injectACheckboxRootContext } from './a-checkbox-root.vue';
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
