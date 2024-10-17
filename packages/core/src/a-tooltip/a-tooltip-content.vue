<script lang="ts">
import type { ATooltipContentImplEmits, ATooltipContentImplProps } from './a-tooltip-content-impl.vue';

export type ATooltipContentEmits = ATooltipContentImplEmits;

export interface ATooltipContentProps extends ATooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';

import ATooltipContentHoverable from './a-tooltip-content-hoverable.vue';
import ATooltipContentImpl from './a-tooltip-content-impl.vue';
import { injectATooltipRootContext } from './a-tooltip-root.vue';

const props = withDefaults(
  defineProps<ATooltipContentProps>(),
  {
    side: 'top',
  },
);

const emits = defineEmits<ATooltipContentEmits>();

const rootContext = injectATooltipRootContext();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <component
      :is="rootContext.disableHoverableContent.value ? ATooltipContentImpl : ATooltipContentHoverable"
      :ref="forwardRef"
      v-bind="forwarded"
    >
      <slot />
    </component>
  </APresence>
</template>
