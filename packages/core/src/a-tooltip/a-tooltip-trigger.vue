<script lang="ts">
import type { APopperAnchorProps } from '~~/a-popper';

export type ATooltipTriggerDataState =
  | 'closed'
  | 'delayed-open'
  | 'instant-open';

export interface ATooltipTriggerProps extends APopperAnchorProps {}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, useId } from 'vue';

import { APopperAnchor } from '~~/a-popper';
import {
  APrimitive,
} from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATooltipProviderContext } from './a-tooltip-provider.vue';
import { injectATooltipRootContext } from './a-tooltip-root.vue';

const props = withDefaults(
  defineProps<ATooltipTriggerProps>(),
  {
    as: 'button',
  },
);
const rootContext = injectATooltipRootContext();
const providerContext = injectATooltipProviderContext();

rootContext.contentId ||= useId();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

const isPointerDown = ref(false);
const hasPointerMoveOpened = ref(false);

const tooltipListeners = computed(() => {
  if (rootContext.disabled.value) {
    return {};
  }

  return {
    click: handleClick,
    focus: handleFocus,
    pointermove: handlePointerMove,
    pointerleave: handlePointerLeave,
    pointerdown: handlePointerDown,
    blur: handleBlur,
  };
});

onMounted(() => {
  rootContext.onTriggerChange(triggerElement.value);
});

function handlePointerUp() {
  setTimeout(() => {
    isPointerDown.value = false;
  }, 1);
}

function handlePointerDown() {
  isPointerDown.value = true;
  document.addEventListener('pointerup', handlePointerUp, { once: true });
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') {
    return;
  }

  if (
    !hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value
  ) {
    rootContext.onTriggerEnter();
    hasPointerMoveOpened.value = true;
  }
}

function handlePointerLeave() {
  rootContext.onTriggerLeave();
  hasPointerMoveOpened.value = false;
}

function handleFocus(event: FocusEvent) {
  if (isPointerDown.value) {
    return;
  }

  if (rootContext.ignoreNonKeyboardFocus.value && !(event.target as HTMLElement).matches?.(':focus-visible')) {
    return;
  }

  rootContext.onOpen();
}

function handleBlur() {
  rootContext.onClose();
}

function handleClick() {
  if (!rootContext.disableClosingTrigger.value) {
    rootContext.onClose();
  }
}
</script>

<template>
  <APopperAnchor
    as-child
    :reference="reference"
  >
    <APrimitive
      :ref="forwardRef"
      :aria-describedby="
        rootContext.open.value ? rootContext.contentId : undefined
      "
      :data-state="rootContext.stateAttribute.value"
      :as="as"
      :as-child="props.asChild"
      data-grace-area-trigger
      v-on="tooltipListeners"
    >
      <slot />
    </APrimitive>
  </APopperAnchor>
</template>
