<script lang="ts">
import type { PopperContentProps } from '@/Popper';
import type { PrimitiveProps } from '@/Primitive';
import { defu } from 'defu';
import { useForwardExpose } from '@/shared';
import { injectTooltipProviderContext } from './TooltipProvider.vue';

export type TooltipContentImplEmits = {
  /** Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault` */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`. */
  pointerDownOutside: [event: Event];
};

export interface TooltipContentImplProps
  extends PrimitiveProps,
  Pick<
    PopperContentProps,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'avoidCollisions'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'arrowPadding'
    | 'sticky'
    | 'hideWhenDetached'
    | 'positionStrategy'
    | 'updatePositionStrategy'
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
import { useEventListener } from '@vueuse/core';
import { computed, onMounted } from 'vue';
import { DismissableLayer } from '@/DismissableLayer';
import { PopperContent } from '@/Popper';
import { VisuallyHidden } from '@/VisuallyHidden';
import { injectTooltipRootContext } from './TooltipRoot.vue';
import { TOOLTIP_OPEN } from './utils';

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  avoidCollisions: undefined,
  asChild: undefined,
  hideWhenDetached: undefined,
});
const emits = defineEmits<TooltipContentImplEmits>();

const rootContext = injectTooltipRootContext();
const providerContext = injectTooltipProviderContext();

const { forwardRef, currentElement } = useForwardExpose();
const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);

const popperContentProps = computed(() => {
  const { ariaLabel: _, ...restProps } = props;

  return defu(restProps, providerContext.content.value ?? {}, {
    side: 'top',
    sideOffset: 0,
    align: 'center',
    avoidCollisions: true,
    collisionBoundary: [],
    collisionPadding: 0,
    arrowPadding: 0,
    sticky: 'partial',
    hideWhenDetached: false,
  } satisfies TooltipContentImplProps);
});

onMounted(() => {
  // Close the tooltip if the trigger is scrolled
  useEventListener(window, 'scroll', (event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(rootContext.trigger.value!)) {
      rootContext.onClose();
    }
  }, { capture: true });
  // Close this tooltip if another one opens
  useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
});
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="(event) => {
      if (rootContext.disableClosingTrigger.value && rootContext.trigger.value?.contains(event.target as HTMLElement))
        event.preventDefault()

      emits('pointerDownOutside', event)
    }"
    @focus-outside.prevent
    @dismiss="rootContext.onClose()"
  >
    <PopperContent
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
      <VisuallyHidden
        :id="rootContext.contentId"
        role="tooltip"
      >
        {{ ariaLabel }}
      </VisuallyHidden>
    </PopperContent>
  </DismissableLayer>
</template>
