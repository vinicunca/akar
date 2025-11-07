<script lang="ts">
import type { TooltipContentImplEmits, TooltipContentImplProps } from './tooltip-content-impl.vue';

export type ATooltipContentEmits = TooltipContentImplEmits;

export interface ATooltipContentProps extends TooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../shared';
import TooltipContentHoverable from './tooltip-content-hoverable.vue';
import TooltipContentImpl from './tooltip-content-impl.vue';
import { injectATooltipRootContext } from './tooltip-root.vue';

const props = withDefaults(defineProps<ATooltipContentProps>(), {
  side: 'top',
});
const emits = defineEmits<ATooltipContentEmits>();

const rootContext = injectATooltipRootContext();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <component
      :is="rootContext.disableHoverableContent.value ? TooltipContentImpl : TooltipContentHoverable"
      :ref="forwardRef"
      v-bind="forwarded"
    >
      <slot />
    </component>
  </APresence>
</template>
