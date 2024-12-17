<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { computed, onMounted, onUnmounted } from 'vue';
import { useArrowNavigation, useForwardExpose } from '~~/shared';

export interface AStepperTriggerProps extends APrimitiveProps {
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectAStepperItemContext } from './stepper-item.vue';
import { injectAStepperRootContext } from './stepper-root.vue';

withDefaults(defineProps<AStepperTriggerProps>(), {
  as: 'button',
});

const rootContext = injectAStepperRootContext();
const itemContext = injectAStepperItemContext();

const stepperItems = computed(() => Array.from(rootContext.totalStepperItems.value));

function handleMouseDown(event: MouseEvent) {
  if (itemContext.disabled.value) {
    return;
  }
  if (rootContext.linear.value) {
    if (itemContext.step.value <= rootContext.modelValue.value! || itemContext.step.value === rootContext.modelValue.value! + 1) {
      if (event.ctrlKey === false) {
        rootContext.changeModelValue(itemContext.step.value);
        return;
      }
    }
  } else {
    if (event.ctrlKey === false) {
      rootContext.changeModelValue(itemContext.step.value);
      return;
    }
  }

  // prevent focus to avoid accidental activation
  event.preventDefault();
}

function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault();

  if (itemContext.disabled.value) {
    return;
  }

  if ((event.key === KEY_CODES.ENTER || event.key === KEY_CODES.SPACE) && !event.ctrlKey && !event.shiftKey) {
    rootContext.changeModelValue(itemContext.step.value);
  }

  if (
    isIncludedIn(event.key, [KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_UP])
  ) {
    useArrowNavigation({
      event,
      currentElement: document.activeElement as HTMLElement,
      options: {
        itemsArray: stepperItems.value,
        focus: true,
        loop: false,
        arrowKeyOptions: rootContext.orientation.value,
        dir: rootContext.dir.value,
      },
    });
  }
}

const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  rootContext.totalStepperItems.value.add(currentElement.value);
});

onUnmounted(() => {
  rootContext.totalStepperItems.value.delete(currentElement.value);
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :as-child="asChild"
    :data-state="itemContext.state.value"
    :disabled="itemContext.disabled.value || !itemContext.isFocusable.value ? '' : undefined"
    :data-disabled="itemContext.disabled.value || !itemContext.isFocusable.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :tabindex="itemContext.isFocusable.value ? 0 : -1"
    :aria-describedby="itemContext.descriptionId"
    :aria-labelledby="itemContext.titleId"
    @mousedown.left="handleMouseDown"
    @keydown.enter.space.left.right.up.down="handleKeyDown"
  >
    <slot />
  </APrimitive>
</template>
