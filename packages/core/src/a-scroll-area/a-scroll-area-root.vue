<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext, type Direction, useDirection } from '~~/shared';

import type { ScrollType } from './a-scroll.types';

export interface AScrollAreaRootContext {
  content: Ref<HTMLElement | undefined>;
  dir: Ref<Direction>;
  onContentChange: (content: HTMLElement) => void;
  onCornerHeightChange: (height: number) => void;
  onCornerWidthChange: (width: number) => void;
  onScrollbarXChange: (scrollbar: HTMLElement | null) => void;
  onScrollbarXEnabledChange: (rendered: boolean) => void;
  onScrollbarYChange: (scrollbar: HTMLElement | null) => void;
  onScrollbarYEnabledChange: (rendered: boolean) => void;
  onViewportChange: (viewport: HTMLElement | null) => void;
  scrollArea: Ref<HTMLElement | undefined>;
  scrollbarX: Ref<HTMLElement | undefined>;
  scrollbarXEnabled: Ref<boolean>;
  scrollbarY: Ref<HTMLElement | undefined>;
  scrollbarYEnabled: Ref<boolean>;
  scrollHideDelay: Ref<number>;
  type: Ref<ScrollType>;
  viewport: Ref<HTMLElement | undefined>;
}

export const [
  injectAScrollAreaRootContext,
  provideAScrollAreaRootContext,
] = createContext<AScrollAreaRootContext>('AScrollAreaRoot');

export interface AScrollAreaRootProps extends APrimitiveProps {
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;

  /** If type is set to either `scroll` or `hover`, this prop determines the length of time, in milliseconds, <br> before the scrollbars are hidden after the user stops interacting with scrollbars. */
  scrollHideDelay?: number;

  /**
   * Describes the nature of scrollbar visibility, similar to how the scrollbar preferences in MacOS control visibility of native scrollbars.
   *
   * `auto` - means that scrollbars are visible when content is overflowing on the corresponding orientation. <br>
   * `always` - means that scrollbars are always visible regardless of whether the content is overflowing.<br>
   * `scroll` - means that scrollbars are visible when the user is scrolling along its corresponding orientation.<br>
   * `hover` - when the user is scrolling along its corresponding orientation and when the user is hovering over the scroll area.
   */
  type?: ScrollType;
}
</script>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<AScrollAreaRootProps>(),
  {
    type: 'hover',
    scrollHideDelay: 500,
  },
);

const { type, dir: propDir, scrollHideDelay } = toRefs(props);

const dir = useDirection(propDir);

const cornerWidth = ref(0);
const cornerHeight = ref(0);
const viewport = ref<HTMLElement>();
const content = ref<HTMLElement>();
const scrollbarX = ref<HTMLElement>();
const scrollbarY = ref<HTMLElement>();
const scrollbarXEnabled = ref(false);
const scrollbarYEnabled = ref(false);

defineExpose({
  /** Viewport element within ScrollArea */
  viewport,
  /** Scroll viewport to top */
  scrollTop,
  /** Scroll viewport to top-left */
  scrollTopLeft,
});

const { forwardRef, currentElement: scrollArea } = useForwardExpose();

function scrollTop() {
  viewport.value?.scrollTo({
    top: 0,
  });
}

function scrollTopLeft() {
  viewport.value?.scrollTo({
    top: 0,
    left: 0,
  });
}

provideAScrollAreaRootContext({
  type,
  dir,
  scrollHideDelay,
  scrollArea,
  viewport,
  onViewportChange: (el) => {
    viewport.value = el || undefined;
  },
  content,
  onContentChange: (el) => {
    content.value = el;
  },
  scrollbarX,
  scrollbarXEnabled,
  scrollbarY,
  scrollbarYEnabled,
  onScrollbarXChange: (scrollbar) => {
    scrollbarX.value = scrollbar || undefined;
  },
  onScrollbarYChange: (scrollbar) => {
    scrollbarY.value = scrollbar || undefined;
  },
  onScrollbarXEnabledChange: (rendered) => {
    scrollbarXEnabled.value = rendered;
  },
  onScrollbarYEnabledChange: (rendered) => {
    scrollbarYEnabled.value = rendered;
  },
  onCornerWidthChange: (width) => {
    cornerWidth.value = width;
  },
  onCornerHeightChange: (height) => {
    cornerHeight.value = height;
  },
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as-child="props.asChild"
    :as="props.as"
    :dir="dir"
    :style="{
      position: 'relative',
      // Pass corner sizes as CSS vars to reduce re-renders of context consumers
      ['--akar-scroll-area-corner-width']: `${cornerWidth}px`,
      ['--akar-scroll-area-corner-height']: `${cornerHeight}px`,
    }"
  >
    <slot />
  </APrimitive>
</template>
