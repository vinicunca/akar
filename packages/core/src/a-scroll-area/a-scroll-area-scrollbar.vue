<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

export interface AScrollAreaScrollbarProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
  /** The orientation of the scrollbar */
  orientation?: 'horizontal' | 'vertical';
}

export interface AScrollAreaScollbarContext {
  as: Ref<APrimitiveProps['as']>;
  asChild: Ref<boolean>;
  forceMount?: Ref<boolean>;
  isHorizontal: Ref<boolean>;
  orientation: Ref<'horizontal' | 'vertical'>;
}

export const [
  injectAScrollAreaScrollbarContext,
  provideAScrollAreaScrollbarContext,
] = createContext<AScrollAreaScollbarContext>('ScrollAreaScrollbar');
</script>

<script lang="ts" setup>
import {
  computed,
  onUnmounted,
  toRefs,
  watch,
} from 'vue';

import { useForwardExpose } from '~~/shared';

import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import AScrollAreaScrollbarAuto from './a-scroll-area-scrollbar-auto.vue';
import AScrollAreaScrollbarHover from './a-scroll-area-scrollbar-hover.vue';
import AScrollAreaScrollbarScroll from './a-scroll-area-scrollbar-scroll.vue';
import AScrollAreaScrollbarVisible from './a-scroll-area-scrollbar-visible.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AScrollAreaScrollbarProps>(),
  {
    orientation: 'vertical',
    as: 'div',
  },
);

const { forwardRef } = useForwardExpose();
const rootContext = injectAScrollAreaRootContext();

const isHorizontal = computed(() => props.orientation === 'horizontal');

watch(
  isHorizontal,
  () => {
    if (isHorizontal.value) {
      rootContext.onScrollbarXEnabledChange(true);
    } else {
      rootContext.onScrollbarYEnabledChange(true);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  rootContext.onScrollbarXEnabledChange(false);
  rootContext.onScrollbarYEnabledChange(false);
});

const { orientation, forceMount, asChild, as } = toRefs(props);

provideAScrollAreaScrollbarContext({
  orientation,
  forceMount,
  isHorizontal,
  as,
  asChild,
});
</script>

<template>
  <AScrollAreaScrollbarHover
    v-if="rootContext.type.value === 'hover'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </AScrollAreaScrollbarHover>

  <AScrollAreaScrollbarScroll
    v-else-if="rootContext.type.value === 'scroll'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </AScrollAreaScrollbarScroll>

  <AScrollAreaScrollbarAuto
    v-else-if="rootContext.type.value === 'auto'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </AScrollAreaScrollbarAuto>

  <AScrollAreaScrollbarVisible
    v-else-if="rootContext.type.value === 'always'"
    v-bind="$attrs"
    :ref="forwardRef"
    data-state="visible"
  >
    <slot />
  </AScrollAreaScrollbarVisible>
</template>
