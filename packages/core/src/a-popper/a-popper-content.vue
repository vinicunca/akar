<script lang="ts">
import type {
  Middleware,
  Placement,
  ReferenceElement,
} from '@floating-ui/vue';
import type { Ref } from 'vue';

import { isNumber } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext, useForwardExpose, useSize } from '~~/shared';

import type {
  Align,
  Side,
} from './utils';

export const APopperContentPropsDefaultValue = {
  align: 'center' as Align,
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  hideWhenDetached: false,
  prioritizePosition: false,
  side: 'bottom' as Side,
  sideOffset: 0,
  sticky: 'partial' as 'always' | 'partial',
  updatePositionStrategy: 'optimized' as 'always' | 'optimized',
};

export interface APopperContentProps extends APrimitiveProps {
  /**
   * The preferred alignment against the trigger.
   * May change when collisions occur.
   *
   * @defaultValue "center"
   */
  align?: Align;

  /**
   * An offset in pixels from the `start` or `end` alignment options.
   *
   * @defaultValue 0
   */
  alignOffset?: number;

  /**
   * The padding between the arrow and the edges of the content.
   * If your content has border-radius, this will prevent it from
   * overflowing the corners.
   *
   * @defaultValue 0
   */
  arrowPadding?: number;

  /**
   * When `true`, overrides the side and align preferences
   * to prevent collisions with boundary edges.
   *
   * @defaultValue true
   */
  avoidCollisions?: boolean;

  /**
   * The element used as the collision boundary. By default
   * this is the viewport, though you can provide additional
   * element(s) to be included in this check.
   *
   * @defaultValue []
   */
  collisionBoundary?: Array<Element | null> | Element | null;

  /**
   * The distance in pixels from the boundary edges where collision
   * detection should occur. Accepts a number (same for all sides),
   * or a partial padding object, for example: { top: 20, left: 20 }.
   *
   * @defaultValue 0
   */
  collisionPadding?: number | Partial<Record<Side, number>>;

  /**
   * Whether to disable the update position for the content when the layout shifted.
   *
   * @defaultValue false
   */
  disableUpdateOnLayoutShift?: boolean;

  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   *
   * @defaultValue false
   */
  hideWhenDetached?: boolean;

  /**
   *  The type of CSS position property to use.
   */
  positionStrategy?: 'absolute' | 'fixed';

  /**
   * Force content to be position within the viewport.
   *
   * Might overlap the reference element, which may not be desired.
   *
   * @defaultValue false
   */
  prioritizePosition?: boolean;

  /**
   *  The custom element or virtual element that will be set as the reference
   *  to position the floating element.
   *
   *  If provided, it will replace the default anchor element.
   */
  reference?: ReferenceElement;

  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and avoidCollisions
   * is enabled.
   *
   * @defaultValue "top"
   */
  side?: Side;

  /**
   * The distance in pixels from the trigger.
   *
   * @defaultValue 0
   */
  sideOffset?: number;

  /**
   * The sticky behavior on the align axis. `partial` will keep the
   * content in the boundary as long as the trigger is at least partially
   * in the boundary whilst "always" will keep the content in the boundary
   * regardless.
   *
   * @defaultValue "partial"
   */
  sticky?: 'always' | 'partial';

  /**
   * Strategy to update the position of the floating element on every animation frame.
   *
   * @defaultValue 'optimized'
   */
  updatePositionStrategy?: 'always' | 'optimized';
}

export interface APopperContentContext {
  arrowX?: Ref<number>;
  arrowY?: Ref<number>;
  onArrowChange: (arrow: HTMLElement | undefined) => void;
  placedSide: Ref<Side>;
  shouldHideArrow: Ref<boolean>;
}

export const [injectAPopperContentContext, provideAPopperContentContext]
  = createContext<APopperContentContext>('PopperContent');
</script>

<script setup lang="ts">
import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/vue';
import { useThrottleFn } from '@vueuse/core';
import { computed, ref, watchEffect, watchPostEffect } from 'vue';

import {
  APrimitive,
} from '~~/a-primitive';

import { injectAPopperRootContext } from './a-popper-root.vue';
import {
  getSideAndAlignFromPlacement,
  isNotNull,
  transformOrigin,
} from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<APopperContentProps>(), {
  ...APopperContentPropsDefaultValue,
});

const emits = defineEmits<{
  placed: [void];
}>();

const rootContext = injectAPopperRootContext();
const { currentElement: contentElement, forwardRef } = useForwardExpose();

const floatingRef = ref<HTMLElement>();

const arrow = ref<HTMLElement>();
const { height: arrowHeight, width: arrowWidth } = useSize(arrow);

const desiredPlacement = computed(
  () =>
    (props.side
      + (props.align !== 'center' ? `-${props.align}` : '')) as Placement,
);

const collisionPadding = computed(() => {
  return isNumber(props.collisionPadding)
    ? props.collisionPadding
    : { bottom: 0, left: 0, right: 0, top: 0, ...props.collisionPadding };
});

const boundary = computed(() => {
  return Array.isArray(props.collisionBoundary)
    ? props.collisionBoundary
    : [props.collisionBoundary];
});

const detectOverflowOptions = computed(() => {
  return {
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: boundary.value.length > 0,
    boundary: boundary.value.filter(isNotNull),
    padding: collisionPadding.value,
  };
});

const computedMiddleware = computed(() => {
  return [
    offset({
      alignmentAxis: props.alignOffset,
      mainAxis: props.sideOffset + arrowHeight.value,
    }),

    props.prioritizePosition
    && props.avoidCollisions
    && flip({
      ...detectOverflowOptions.value,
    }),

    props.avoidCollisions
    && shift({
      crossAxis: !!props.prioritizePosition,
      limiter: props.sticky === 'partial' ? limitShift() : undefined,
      mainAxis: true,
      ...detectOverflowOptions.value,
    }),

    !props.prioritizePosition
    && props.avoidCollisions
    && flip({
      ...detectOverflowOptions.value,
    }),

    size({
      ...detectOverflowOptions.value,
      apply: ({ availableHeight, availableWidth, elements, rects }) => {
        const { height: anchorHeight, width: anchorWidth } = rects.reference;
        const contentStyle = elements.floating.style;

        contentStyle.setProperty(
          '--akar-popper-available-width',
          `${availableWidth}px`,
        );

        contentStyle.setProperty(
          '--akar-popper-available-height',
          `${availableHeight}px`,
        );

        contentStyle.setProperty(
          '--akar-popper-anchor-width',
          `${anchorWidth}px`,
        );

        contentStyle.setProperty(
          '--akar-popper-anchor-height',
          `${anchorHeight}px`,
        );
      },
    }),

    arrow.value
    && floatingUIarrow({ element: arrow.value, padding: props.arrowPadding }),
    transformOrigin({
      arrowHeight: arrowHeight.value,
      arrowWidth: arrowWidth.value,
    }),

    props.hideWhenDetached
    && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value }),
  ] as Array<Middleware>;
});

// If provided custom reference, it will overwrite the default anchor element
const reference = computed(() => props.reference ?? rootContext.anchor.value);

const { floatingStyles, isPositioned, middlewareData, placement, update } = useFloating(
  reference,
  floatingRef,
  {
    middleware: computedMiddleware,
    placement: desiredPlacement,
    strategy: props.positionStrategy,
    whileElementsMounted: (...args) => {
      return autoUpdate(...args, {
        layoutShift: !props.disableUpdateOnLayoutShift,
        animationFrame: props.updatePositionStrategy === 'always',
      });
    },
  },
);

const placedSide = computed(
  () => getSideAndAlignFromPlacement(placement.value)[0],
);

const placedAlign = computed(
  () => getSideAndAlignFromPlacement(placement.value)[1],
);

watchPostEffect(() => {
  if (isPositioned.value) {
    emits('placed');
  }
});

// update position automatically when `boundingClientRect` changes
const throttleUpdate = useThrottleFn(update, 10, true, true);
watchEffect(() => {
  if (reference.value?.getBoundingClientRect()) {
    throttleUpdate();
  }
});

const cannotCenterArrow = computed(
  () => middlewareData.value.arrow?.centerOffset !== 0,
);

const contentZIndex = ref('');
watchEffect(() => {
  if (contentElement.value) {
    contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
  }
});

const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);

provideAPopperContentContext({
  arrowX,
  arrowY,
  onArrowChange: (element) => {
    arrow.value = element;
  },
  placedSide,
  shouldHideArrow: cannotCenterArrow,
});
</script>

<template>
  <div
    ref="floatingRef"
    data-akar-popper-content-wrapper=""
    :style="{
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
      minWidth: 'max-content',
      zIndex: contentZIndex,
      ['--akar-popper-transform-origin' as any]: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y,
      ].join(' '),

      /**
       * Hide the content if using the hide middleware and should be hidden
       * set visibility to hidden and disable pointer events so the UI behaves
       * as if the PopperContent isn't there at all
       */
      ...(middlewareData.hide?.referenceHidden && {
        visibility: 'hidden',
        pointerEvents: 'none',
      }),
    }"
  >
    <APrimitive
      :ref="forwardRef"
      v-bind="$attrs"
      :as-child="props.asChild"
      :as="as"
      :data-side="placedSide"
      :data-align="placedAlign"
      :style="{
        /**
         * if the PopperContent hasn't been placed yet (not all measurements done)
         * we prevent animations so that users's animation don't kick in too early referring wrong sides
         */
        animation: !isPositioned ? 'none' : undefined,
      }"
    >
      <slot />
    </APrimitive>
  </div>
</template>
