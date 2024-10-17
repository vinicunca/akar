<script lang="ts">
import { isString } from '@vinicunca/perkakas';

import type { APopperContentProps } from '~~/a-popper';
import type { APrimitiveProps } from '~~/a-primitive';

export type ATooltipContentImplEmits = {
  /** Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault` */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`. */
  pointerDownOutside: [event: Event];
};

export interface ATooltipContentImplProps
  extends APrimitiveProps,
  Pick<
    APopperContentProps,
    | 'align'
    | 'alignOffset'
    | 'arrowPadding'
    | 'avoidCollisions'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'hideWhenDetached'
    | 'side'
    | 'sideOffset'
    | 'sticky'
  > {
  /**
   * By default, screenreaders will announce the content inside
   * the component. If this is not descriptive enough, or you have
   * content that cannot be announced, use aria-label as a more
   * descriptive label.
   *
   * @defaultValue String
   */
  ariaLabel?: string;
}
</script>

<script setup lang="ts">
import type { VNode } from 'vue';

import { useEventListener } from '@vueuse/core';
import { Comment, computed, onMounted, useSlots } from 'vue';

import { ADismissableLayer, type PointerDownOutsideEvent } from '~~/a-dismissable-layer';
import { APopperContent } from '~~/a-popper';
import { AVisuallyHidden } from '~~/a-visually-hidden';
import { useForwardExpose } from '~~/shared';

import { injectATooltipRootContext } from './a-tooltip-root.vue';
import { TOOLTIP_OPEN } from './utils';

const props = withDefaults(
  defineProps<ATooltipContentImplProps>(),
  {
    side: 'top',
    sideOffset: 0,
    align: 'center',
    avoidCollisions: true,
    collisionBoundary: () => [],
    collisionPadding: 0,
    arrowPadding: 0,
    sticky: 'partial',
    hideWhenDetached: false,
  },
);

const emits = defineEmits<ATooltipContentImplEmits>();

const rootContext = injectATooltipRootContext();

const { forwardRef } = useForwardExpose();
const slot = useSlots();
const defaultSlot = computed(() => slot.default?.());
const ariaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }
  let content = '';

  function recursiveTextSearch(node: VNode) {
    if (isString(node.children) && node.type !== Comment) {
      content += node.children;
    } else if (Array.isArray(node.children)) {
      node.children.forEach((child) => {
        recursiveTextSearch(child as VNode);
      });
    }
  }

  defaultSlot.value?.forEach((node) => {
    recursiveTextSearch(node);
  });

  return content;
});

const popperContentProps = computed(() => {
  const { ariaLabel: _, ...restProps } = props;

  return restProps;
});

onMounted(() => {
  // Close the tooltip if the trigger is scrolled
  useEventListener(
    window,
    'scroll',
    (event) => {
      const target = event.target as HTMLElement;
      if (target?.contains(rootContext.trigger.value!)) {
        rootContext.onClose();
      }
    },
  );

  // Close this tooltip if another one opens
  useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
});

function handlePointerDownOutside(event: PointerDownOutsideEvent) {
  if (
    rootContext.disableClosingTrigger.value
    && rootContext.trigger.value?.contains(event.target as HTMLElement)
  ) {
    event.preventDefault();
  }

  emits('pointerDownOutside', event);
}
</script>

<template>
  <ADismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="handlePointerDownOutside"
    @focus-outside.prevent
    @dismiss="rootContext.onClose()"
  >
    <APopperContent
      :ref="forwardRef"
      :data-state="rootContext.stateAttribute.value"
      v-bind="{ ...$attrs, ...popperContentProps }"
      :style="{
        '--akar-tooltip-content-transform-origin': 'var(--akar-popper-transform-origin)',
        '--akar-tooltip-content-available-width': 'var(--akar-popper-available-width)',
        '--akar-tooltip-content-available-height': 'var(--akar-popper-available-height)',
        '--akar-tooltip-trigger-width': 'var(--akar-popper-anchor-width)',
        '--akar-tooltip-trigger-height': 'var(--akar-popper-anchor-height)',
      }"
    >
      <slot />

      <AVisuallyHidden
        :id="rootContext.contentId"
        role="tooltip"
      >
        {{ ariaLabel }}
      </AVisuallyHidden>
    </APopperContent>
  </ADismissableLayer>
</template>
