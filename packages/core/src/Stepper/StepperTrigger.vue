<script lang="ts">
import type { PrimitiveProps } from '@/Primitive';
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { computed, onMounted, onUnmounted } from 'vue';
import { getActiveElement, useArrowNavigation, useForwardExpose } from '@/shared';

export interface StepperTriggerProps extends PrimitiveProps {
}
</script>

<script setup lang="ts">
import { Primitive } from '@/Primitive';
import { injectStepperItemContext } from './StepperItem.vue';
import { injectStepperRootContext } from './StepperRoot.vue';

withDefaults(defineProps<StepperTriggerProps>(), {
  as: 'button',
});

const rootContext = injectStepperRootContext();
const itemContext = injectStepperItemContext();

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

  if ((event.key === KEY_CODES.ENTER || event.key === ' ') && !event.ctrlKey && !event.shiftKey) {
    rootContext.changeModelValue(itemContext.step.value);
  }

  if (isIncludedIn(event.key, [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN])) {
    useArrowNavigation(event, getActiveElement() as HTMLElement, undefined, {
      itemsArray: stepperItems.value,
      focus: true,
      loop: false,
      arrowKeyOptions: rootContext.orientation.value,
      dir: rootContext.dir.value,
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
  <Primitive
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
  </Primitive>
</template>
