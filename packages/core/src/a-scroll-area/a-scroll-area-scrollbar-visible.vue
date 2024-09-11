<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

import type { Sizes } from './a-scroll.types';

export interface AScrollAreaScrollbarVisibleContext {
  handleSizeChange: (payload: Sizes) => void;
  handleThumbDown: (
    event: MouseEvent,
    payload: { x: number; y: number }
  ) => void;
  handleThumbUp: (event: MouseEvent) => void;
  handleWheelScroll: (event: WheelEvent, payload: number) => void;
  hasThumb: Ref<boolean>;
  onDragScroll: (payload: number) => void;
  onThumbChange: (element: HTMLElement) => void;
  onThumbPositionChange: () => void;
  sizes: Ref<Sizes>;
}

export const [
  injectAScrollAreaScrollbarVisibleContext,
  provideAScrollAreaScrollbarVisibleContext,
] = createContext<AScrollAreaScrollbarVisibleContext>('AScrollAreaScrollbarVisible');
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { type Direction, useForwardExpose } from '~~/shared';

import {
  getScrollPositionFromPointer,
  getThumbOffsetFromScroll,
  getThumbRatio,
  isScrollingWithinScrollbarBounds,
} from './a-scroll.utils';
import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import { injectAScrollAreaScrollbarContext } from './a-scroll-area-scrollbar.vue';
import ScrollAreaScrollbarX from './a-scroll-area-scrollbar-x.vue';
import ScrollAreaScrollbarY from './a-scroll-area-scrollbar-y.vue';

const rootContext = injectAScrollAreaRootContext();
const scrollbarContext = injectAScrollAreaScrollbarContext();
const { forwardRef } = useForwardExpose();

const sizes = ref<Sizes>({
  content: 0,
  viewport: 0,
  scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
});

const hasThumb = computed(() => {
  const thumbRatio = getThumbRatio({
    viewportSize: sizes.value.viewport,
    contentSize: sizes.value.content,
  });
  return Boolean(thumbRatio > 0 && thumbRatio < 1);
});

const thumbRef = ref<HTMLElement>();
const pointerOffset = ref(0);

function handleWheelScroll(event: WheelEvent, payload: number) {
  if (isShowingScrollbarX.value) {
    const scrollPos = rootContext.viewport.value!.scrollLeft + event.deltaY;

    rootContext.viewport.value!.scrollLeft = scrollPos;
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds({ scrollPos, maxScrollPos: payload })) {
      event.preventDefault();
    }
  } else {
    const scrollPos = rootContext.viewport.value!.scrollTop + event.deltaY;

    rootContext.viewport.value!.scrollTop = scrollPos;
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds({ scrollPos, maxScrollPos: payload })) {
      event.preventDefault();
    }
  }
}

function handleThumbDown(_event: MouseEvent, payload: { x: number; y: number }) {
  if (isShowingScrollbarX.value) {
    pointerOffset.value = payload.x;
  } else {
    pointerOffset.value = payload.y;
  }
}
function handleThumbUp(_event: MouseEvent) {
  pointerOffset.value = 0;
}

function handleSizeChange(payload: Sizes) {
  sizes.value = payload;
}

function getScrollPosition(pointerPos: number, dir?: Direction) {
  return getScrollPositionFromPointer({
    pointerPos,
    pointerOffset: pointerOffset.value,
    sizes: sizes.value,
    dir,
  });
}

const isShowingScrollbarX = computed(
  () => scrollbarContext.isHorizontal.value,
);

function onDragScroll(payload: number) {
  if (isShowingScrollbarX.value) {
    rootContext.viewport.value!.scrollLeft = getScrollPosition(
      payload,
      rootContext.dir.value,
    );
  } else {
    rootContext.viewport.value!.scrollTop = getScrollPosition(payload);
  }
}

function onThumbPositionChange() {
  if (isShowingScrollbarX.value) {
    if (rootContext.viewport.value && thumbRef.value) {
      const scrollPos = rootContext.viewport.value.scrollLeft;
      const offset = getThumbOffsetFromScroll(
        scrollPos,
        sizes.value,
        rootContext.dir.value,
      );
      thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  } else {
    if (rootContext.viewport.value && thumbRef.value) {
      const scrollPos = rootContext.viewport.value.scrollTop;
      const offset = getThumbOffsetFromScroll(scrollPos, sizes.value);
      thumbRef.value.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  }
}
function onThumbChange(element: HTMLElement) {
  thumbRef.value = element;
}

provideAScrollAreaScrollbarVisibleContext({
  sizes,
  hasThumb,
  handleWheelScroll,
  handleThumbDown,
  handleThumbUp,
  handleSizeChange,
  onThumbPositionChange,
  onThumbChange,
  onDragScroll,
});
</script>

<template>
  <ScrollAreaScrollbarX
    v-if="isShowingScrollbarX"
    v-bind="$attrs"
    :ref="forwardRef"
  >
    <slot />
  </ScrollAreaScrollbarX>

  <ScrollAreaScrollbarY
    v-else
    v-bind="$attrs"
    :ref="forwardRef"
  >
    <slot />
  </ScrollAreaScrollbarY>
</template>
