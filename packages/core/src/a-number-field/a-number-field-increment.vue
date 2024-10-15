<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ANumberFieldIncrementProps extends APrimitiveProps {
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';

import { injectANumberFieldRootContext } from './a-number-field-root.vue';
import { usePressedHold } from './utils';

const props = withDefaults(
  defineProps<ANumberFieldIncrementProps>(),
  {
    as: 'button',
  },
);

const rootContext = injectANumberFieldRootContext();
const isDisabled = computed(() =>
  rootContext.disabled?.value
  || props.disabled
  || rootContext.isIncreaseDisabled.value,
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const { isPressed, onTrigger } = usePressedHold({ target: currentElement, disabled: isDisabled });

onTrigger(() => {
  rootContext.handleIncrease();
});
</script>

<template>
  <APrimitive
    v-bind="props"
    ref="primitiveElement"
    tabindex="-1"
    aria-label="Increase"
    :type="as === 'button' ? 'button' : undefined"
    :style="{
      userSelect: isPressed ? 'none' : undefined,
    }"
    :disabled="isDisabled ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-pressed="isPressed ? 'true' : undefined"
    @contextmenu.prevent
  >
    <slot />
  </APrimitive>
</template>
