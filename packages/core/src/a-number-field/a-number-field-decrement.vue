<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ANumberFieldDecrementProps extends APrimitiveProps {
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';

import { injectANumberFieldRootContext } from './a-number-field-root.vue';
import { usePressedHold } from './utils';

const props = withDefaults(
  defineProps<ANumberFieldDecrementProps>(),
  {
    as: 'button',
  },
);

const rootContext = injectANumberFieldRootContext();
const isDisabled = computed(() =>
  rootContext.disabled?.value
  || props.disabled
  || rootContext.isDecreaseDisabled.value,
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const { isPressed, onTrigger } = usePressedHold({ target: currentElement, disabled: isDisabled });

onTrigger(() => {
  rootContext.handleDecrease();
});
</script>

<template>
  <APrimitive
    v-bind="props"
    ref="primitiveElement"
    tabindex="-1"
    aria-label="Decrease"
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
