<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { useNonce } from '~~/shared/use-nonce';

export interface ASelectViewportProps extends APrimitiveProps {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits globally from `AConfigProvider`.
   */
  nonce?: string;
}
</script>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import {
  APrimitive,
} from '~~/primitive';
import { injectSelectContentContext } from './select-content-impl.vue';
import { injectSelectItemAlignedPositionContext } from './select-item-aligned-position.vue';
import { CONTENT_MARGIN } from './utils';

const props = defineProps<ASelectViewportProps>();
const { nonce: propNonce } = toRefs(props);
const nonce = useNonce(propNonce);

const contentContext = injectSelectContentContext();
const alignedPositionContext
  = contentContext.position === 'item-aligned'
    ? injectSelectItemAlignedPositionContext()
    : undefined;

const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  contentContext?.onViewportChange(currentElement.value);
});

const prevScrollTopRef = ref(0);

function handleScroll(event: WheelEvent) {
  const viewport = event.currentTarget as HTMLElement;
  const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
  if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
    const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
    if (scrolledBy > 0) {
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const cssMinHeight = Number.parseFloat(
        contentWrapper.value.style.minHeight,
      );
      const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
      const prevHeight = Math.max(cssMinHeight, cssHeight);

      if (prevHeight < availableHeight) {
        const nextHeight = prevHeight + scrolledBy;
        const clampedNextHeight = Math.min(availableHeight, nextHeight);
        const heightDiff = nextHeight - clampedNextHeight;

        contentWrapper.value.style.height = `${clampedNextHeight}px`;
        if (contentWrapper.value.style.bottom === '0px') {
          viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
          // ensure the content stays pinned to the bottom
          contentWrapper.value.style.justifyContent = 'flex-end';
        }
      }
    }
  }
  prevScrollTopRef.value = viewport.scrollTop;
}
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    data-akar-select-viewport
    role="presentation"
    v-bind="{ ...$attrs, ...props }"
    :style="{
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: 'relative',
      flex: 1,
      overflow: 'hidden auto',
    }"
    @scroll="handleScroll"
  >
    <slot />
  </APrimitive>
  <APrimitive
    as="style"
    :nonce="nonce"
  >
    /* Hide scrollbars cross-browser and enable momentum scroll for touch
    devices */ [data-akar-select-viewport] { scrollbar-width:none; -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch; }
    [data-akar-select-viewport]::-webkit-scrollbar { display: none; }
  </APrimitive>
</template>
