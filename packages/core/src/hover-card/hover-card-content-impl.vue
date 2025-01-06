<script lang="ts">
import type { DismissableLayerEmits } from '~~/dismissable-layer';
import type { APopperContentProps } from '~~/popper';

export type HoverCardContentImplEmits = DismissableLayerEmits;
export interface HoverCardContentImplProps extends APopperContentProps {}
</script>

<script setup lang="ts">
import { syncRef } from '@vueuse/shared';
import { nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { DismissableLayer } from '~~/dismissable-layer';
import { APopperContent } from '~~/popper';
import { useForwardExpose, useGraceArea } from '~~/shared';
import { useForwardProps } from '..';
import { injectAHoverCardRootContext } from './hover-card-root.vue';
import { getTabbableNodes } from './utils';

const props = defineProps<HoverCardContentImplProps>();
const emits = defineEmits<HoverCardContentImplEmits>();
const forwarded = useForwardProps(props);

const { forwardRef, currentElement: contentElement } = useForwardExpose();
const rootContext = injectAHoverCardRootContext();
const { isPointerInTransit, onPointerExit } = useGraceArea({
  triggerElement: rootContext.triggerElement,
  containerElement: contentElement,
});

syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: 'rtl' });

onPointerExit(() => {
  rootContext.onClose();
});

const containSelection = ref(false);

let originalBodyUserSelect: string;
watchEffect((cleanupFn) => {
  if (containSelection.value) {
    const body = document.body;

    // Safari requires prefix
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;

    body.style.userSelect = 'none';
    body.style.webkitUserSelect = 'none';

    cleanupFn(() => {
      body.style.userSelect = originalBodyUserSelect;
      body.style.webkitUserSelect = originalBodyUserSelect;
    });
  }
});

function handlePointerUp() {
  containSelection.value = false;
  rootContext.isPointerDownOnContentRef.value = false;

  // Delay a frame to ensure we always access the latest selection
  nextTick(() => {
    const hasSelection = document.getSelection()?.toString() !== '';
    if (hasSelection) {
      rootContext.hasSelectionRef.value = true;
    }
  });
}

onMounted(() => {
  if (contentElement.value) {
    document.addEventListener('pointerup', handlePointerUp);

    const tabbables = getTabbableNodes(contentElement.value);
    tabbables.forEach((tabbable) => {
      tabbable.setAttribute('tabindex', '-1');
    });
  }
});

onUnmounted(() => {
  document.removeEventListener('pointerup', handlePointerUp);
  rootContext.hasSelectionRef.value = false;
  rootContext.isPointerDownOnContentRef.value = false;
});
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
    @focus-outside.prevent="emits('focusOutside', $event)"
    @dismiss="rootContext.onDismiss"
  >
    <APopperContent
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :style="{
        'userSelect': containSelection ? 'text' : undefined,
        // Safari requires prefix
        'WebkitUserSelect': containSelection ? 'text' : undefined,
        // re-namespace exposed content custom properties
        '--akar-hover-card-content-transform-origin': 'var(--akar-popper-transform-origin)',
        '--akar-hover-card-content-available-width': 'var(--akar-popper-available-width)',
        '--akar-hover-card-content-available-height': 'var(--akar-popper-available-height)',
        '--akar-hover-card-trigger-width': 'var(--akar-popper-anchor-width)',
        '--akar-hover-card-trigger-height': 'var(--akar-popper-anchor-height)',
      }"
      @pointerdown="(event: PointerEvent) => {
        // Contain selection to current layer
        if ((event.currentTarget as HTMLElement).contains(event.target as HTMLElement)) {
          containSelection = true
        }
        rootContext.hasSelectionRef.value = false;
        rootContext.isPointerDownOnContentRef.value = true;
      }"
    >
      <slot />
    </APopperContent>
  </DismissableLayer>
</template>
