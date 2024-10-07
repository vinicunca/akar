<script lang="ts">
import { computed, watch } from 'vue';

import type { AVisuallyHiddenProps } from './a-visually-hidden.vue';

export interface AVisuallyHiddenInputBubbleProps<T> {
  checked?: boolean;
  disabled?: boolean;
  feature?: AVisuallyHiddenProps['feature'];
  name: string;
  required?: boolean;
  value: T;
}
</script>

<script lang="ts" setup generic="T">
import { usePrimitiveElement } from '~~/a-primitive';

import AVisuallyHidden from './a-visually-hidden.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AVisuallyHiddenInputBubbleProps<T>>(),
  {
    feature: 'fully-hidden',
    checked: undefined,
  },
);

const { primitiveElement, currentElement } = usePrimitiveElement();
const valueState = computed(() => props.checked ?? props.value);

watch(
  valueState,
  (curr, prev) => {
    if (!currentElement.value) {
      return;
    }

    const input = currentElement.value as HTMLInputElement;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value') as PropertyDescriptor;
    const setValue = descriptor.set;

    if (setValue && curr !== prev) {
      const inputEvent = new Event('input', { bubbles: true });
      const changeEvent = new Event('change', { bubbles: true });
      setValue.call(input, curr);
      input.dispatchEvent(inputEvent);
      input.dispatchEvent(changeEvent);
    }
  },
);
</script>

<template>
  <AVisuallyHidden
    ref="primitiveElement"
    v-bind="{ ...props, ...$attrs }"
    as="input"
  />
</template>
