<script lang="ts" setup generic="T">
import { isBoolean, isNumber, isPlainObject, isString } from '@vinicunca/perkakas';
import { computed } from 'vue';

import type { AVisuallyHiddenInputBubbleProps } from './a-visually-hidden-input-bubble.vue';

import AVisuallyHiddenInputBubble from './a-visually-hidden-input-bubble.vue';

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

const parsedValue = computed(() => {
  // primitive value
  if (
    isString(props.value)
    || isNumber(props.value)
    || isBoolean(props.value)
  ) {
    return [{
      name: props.name,
      value: props.value,
    }];
  } else if (Array.isArray(props.value)) {
    return props.value.flatMap((obj, index) => {
      if (isPlainObject(obj)) {
        return Object.entries(obj).map(([key, value]) => ({
          name: `${props.name}[${index}][${key}]`,
          value,
        }));
      } else {
        return {
          name: `${props.name}[${index}]`,
          value: obj,
        };
      }
    });
  } else if (
    props.value !== null
    && isPlainObject(props.value)
    && !Array.isArray(props.value)
  ) {
    return Object.entries(props.value).map(([key, value]) => ({
      name: `${props.name}[${key}]`,
      value,
    }));
  }

  return [];
});
</script>

<template>
  <AVisuallyHiddenInputBubble
    v-for="parsed in parsedValue"
    :key="parsed.name"
    v-bind="{ ...$props, ...$attrs }"
    :name="parsed.name"
    :value="parsed.value"
  />
</template>
