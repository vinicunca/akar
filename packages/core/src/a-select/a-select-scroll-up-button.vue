<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectScrollUpButtonProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';

import { useForwardExpose } from '~~/shared';

import { injectASelectContentContext } from './a-select-content-impl.vue';
import { injectASelectItemAlignedPositionContext } from './a-select-item-aligned-position.vue';
import ASelectScrollButtonImpl from './a-select-scroll-button-impl.vue';

defineProps<ASelectScrollUpButtonProps>();

const contentContext = injectASelectContentContext();

const alignedPositionContext
  = contentContext.position === 'item-aligned'
    ? injectASelectItemAlignedPositionContext()
    : undefined;

const { forwardRef, currentElement } = useForwardExpose();

const canScrollUp = ref(false);

watchEffect((cleanupFn) => {
  if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
    const viewport = contentContext.viewport.value;

    function handleScroll() {
      canScrollUp.value = viewport.scrollTop > 0;
    }

    handleScroll();
    viewport.addEventListener('scroll', handleScroll);

    cleanupFn(() => viewport.removeEventListener('scroll', handleScroll));
  }
});

watch(currentElement, () => {
  if (currentElement.value) {
    alignedPositionContext?.onScrollButtonChange(currentElement.value);
  }
});

function handleAutoScroll() {
  const { viewport, selectedItem } = contentContext;

  if (viewport?.value && selectedItem?.value) {
    viewport.value.scrollTop = viewport.value.scrollTop - selectedItem.value.offsetHeight;
  }
}
</script>

<template>
  <ASelectScrollButtonImpl
    v-if="canScrollUp"
    :ref="forwardRef"
    @auto-scroll="handleAutoScroll"
  >
    <slot />
  </ASelectScrollButtonImpl>
</template>
