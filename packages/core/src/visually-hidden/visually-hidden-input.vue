<script setup lang="ts" generic="T">
import type { VisuallyHiddenInputBubbleProps } from './visually-hidden-input-bubble.vue';
import { isBoolean, isNumber, isString } from '@vinicunca/perkakas';
import { computed } from 'vue';
import VisuallyHiddenInputBubble from './visually-hidden-input-bubble.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<VisuallyHiddenInputBubbleProps<T>>(),
  {
    feature: 'fully-hidden',
    checked: undefined,
  },
);

const isFormArrayEmptyAndRequired = computed(() =>
  typeof props.value === 'object'
  && Array.isArray(props.value)
  && props.value.length === 0
  && props.required,
);

const parsedValue = computed(() => {
  // if primitive value
  if (isString(props.value) || isNumber(props.value) || isBoolean(props.value)) {
    return [{ name: props.name, value: props.value }];
  } else if (typeof props.value === 'object' && Array.isArray(props.value)) { // if array value
    return props.value.flatMap((obj, index) => {
      // if item in array is object
      if (typeof obj === 'object') {
        return Object.entries(obj).map(([key, value]) => ({ name: `[${props.name}][${index}][${key}]`, value }));
      } else { // if item in array is not object, may be primitive
        return ({ name: `[${props.name}][${index}]`, value: obj });
      }
    });
  } else if (props.value !== null && typeof props.value === 'object' && !Array.isArray(props.value)) { // if object value
    return Object.entries(props.value as object).map(([key, value]) => ({ name: `[${props.name}][${key}]`, value }));
  }

  return [];
});
</script>

<template>
  <!-- We render single input if it's required -->
  <VisuallyHiddenInputBubble
    v-if="isFormArrayEmptyAndRequired"
    :key="name"
    v-bind="{ ...props, ...$attrs }"
    :name="name"
    :value="value"
  />

  <VisuallyHiddenInputBubble
    v-for="parsed in parsedValue"
    v-else
    :key="parsed.name"
    v-bind="{ ...props, ...$attrs }"
    :name="parsed.name"
    :value="parsed.value"
  />
</template>
