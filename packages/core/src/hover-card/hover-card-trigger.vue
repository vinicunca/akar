<script lang="ts">
import type { APopperAnchorProps } from '~~/popper';

export interface AHoverCardTriggerProps extends APopperAnchorProps {}
</script>

<script setup lang="ts">
import { APopperAnchor } from '~~/popper';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAHoverCardRootContext } from './hover-card-root.vue';
import { excludeTouch } from './utils';

withDefaults(
  defineProps<AHoverCardTriggerProps>(),
  {
    as: 'a',
  },
);

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectAHoverCardRootContext();
rootContext.triggerElement = currentElement;

function handleLeave() {
  setTimeout(() => {
    if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) {
      rootContext.onClose();
    }
  }, 0);
}
</script>

<template>
  <APopperAnchor
    as-child
    :reference="reference"
  >
    <APrimitive
      :ref="forwardRef"
      :as-child="asChild"
      :as="as"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      data-grace-area-trigger
      @pointerenter="excludeTouch(rootContext.onOpen)($event)"
      @pointerleave="excludeTouch(handleLeave)($event)"
      @focus="rootContext.onOpen()"
      @blur="rootContext.onClose()"
    >
      <slot />
    </APrimitive>
  </APopperAnchor>
</template>
