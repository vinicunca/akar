<script lang="ts">
export interface ScrollAreaScrollbarScrollProps {
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { computed, watchEffect } from 'vue';
import { APresence } from '~~/presence';
import { useForwardExpose } from '~~/shared';
import { useStateMachine } from '../shared/use-state-machine';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarVisible from './scroll-area-scrollbar-visible.vue';
import { injectAScrollAreaScrollbarContext } from './scroll-area-scrollbar.vue';

defineProps<ScrollAreaScrollbarScrollProps>();

const rootContext = injectAScrollAreaRootContext();
const scrollbarContext = injectAScrollAreaScrollbarContext();

const { forwardRef } = useForwardExpose();

const { state, dispatch } = useStateMachine('hidden', {
  hidden: {
    SCROLL: 'scrolling',
  },
  scrolling: {
    SCROLL_END: 'idle',
    POINTER_ENTER: 'interacting',
  },
  interacting: {
    SCROLL: 'interacting',
    POINTER_LEAVE: 'idle',
  },
  idle: {
    HIDE: 'hidden',
    SCROLL: 'scrolling',
    POINTER_ENTER: 'interacting',
  },
});

const visible = computed(() => state.value !== 'hidden');

watchEffect((onCleanup) => {
  if (state.value === 'idle') {
    const timeId = window.setTimeout(
      () => dispatch('HIDE'),
      rootContext.scrollHideDelay.value,
    );

    onCleanup(() => {
      window.clearTimeout(timeId);
    });
  }
});

const debounceScrollEnd = useDebounceFn(() => dispatch('SCROLL_END'), 100);

watchEffect((onCleanup) => {
  const viewport = rootContext.viewport.value;
  const scrollDirection = scrollbarContext.isHorizontal.value
    ? 'scrollLeft'
    : 'scrollTop';

  if (viewport) {
    let prevScrollPos = viewport[scrollDirection];
    const handleScroll = () => {
      const scrollPos = viewport[scrollDirection];
      const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
      if (hasScrollInDirectionChanged) {
        dispatch('SCROLL');
        debounceScrollEnd();
      }
      prevScrollPos = scrollPos;
    };
    viewport.addEventListener('scroll', handleScroll);

    onCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll);
    });
  }
});
</script>

<template>
  <APresence :present="forceMount || visible">
    <ScrollAreaScrollbarVisible
      v-bind="$attrs"
      :ref="forwardRef"
      :data-state="visible ? 'visible' : 'hidden'"
    >
      <slot />
    </ScrollAreaScrollbarVisible>
  </APresence>
</template>
