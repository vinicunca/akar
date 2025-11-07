<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ASelectScrollUpButtonProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { injectSelectContentContext } from './select-content-impl.vue';
import { injectSelectItemAlignedPositionContext } from './select-item-aligned-position.vue';
import SelectScrollButtonImpl from './select-scroll-button-impl.vue';

defineProps<ASelectScrollUpButtonProps>();

const contentContext = injectSelectContentContext();
const alignedPositionContext
  = contentContext.position === 'item-aligned'
    ? injectSelectItemAlignedPositionContext()
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
</script>

<template>
  <SelectScrollButtonImpl
    v-if="canScrollUp"
    :ref="forwardRef"
    @auto-scroll="() => {
      const { viewport, selectedItem } = contentContext;
      if (viewport?.value && selectedItem?.value) {
        viewport.value.scrollTop = viewport.value.scrollTop - selectedItem.value.offsetHeight;
      }
    }"
  >
    <slot />
  </SelectScrollButtonImpl>
</template>
