<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectValueProps extends APrimitiveProps {
  /** The content that will be rendered inside the `ASelectValue` when no `value` or `defaultValue` is set. */
  placeholder?: string;
}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectASelectRootContext } from './a-select-root.vue';

const props = withDefaults(
  defineProps<ASelectValueProps>(),
  {
    as: 'span',
    placeholder: '',
  },
);

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectASelectRootContext();

onMounted(() => {
  rootContext.valueElement = currentElement;
});

const slotText = computed(() => {
  if (Array.isArray(rootContext.modelValue.value)) {
    return rootContext.modelValue.value.length === 0 ? props.placeholder : rootContext.modelValue.value.join(', ');
  } else {
    return rootContext.modelValue.value || props.placeholder;
  }
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :style="{ pointerEvents: 'none' }"
  >
    <slot>{{ slotText }}</slot>
  </APrimitive>
</template>
