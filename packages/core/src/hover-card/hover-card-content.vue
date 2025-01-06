<script lang="ts">
import type { HoverCardContentImplEmits, HoverCardContentImplProps } from './hover-card-content-impl.vue';

export type AHoverCardContentEmits = HoverCardContentImplEmits;

export interface AHoverCardContentProps extends HoverCardContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';
import HoverCardContentImpl from './hover-card-content-impl.vue';
import { injectAHoverCardRootContext } from './hover-card-root.vue';
import { excludeTouch } from './utils';

const props = defineProps<AHoverCardContentProps>();
const emits = defineEmits<AHoverCardContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

const rootContext = injectAHoverCardRootContext();
</script>

<template>
  <APresence
    :present="forceMount || rootContext.open.value"
  >
    <HoverCardContentImpl
      v-bind="forwarded"
      :ref="forwardRef"
      @pointerenter="excludeTouch(rootContext.onOpen)($event)"
    >
      <slot />
    </HoverCardContentImpl>
  </APresence>
</template>
