<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectValueProps extends APrimitiveProps {
  /** The content that will be rendered inside the `ASelectValue` when no `value` or `defaultValue` is set. */
  placeholder?: string;
}
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import type { AcceptableValue } from '~~/shared/types';

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

const selectedLabel = computed(() => {
  let list: Array<string> = [];
  const options = Array.from(rootContext.optionsSet.value);
  const getOption = (value?: AcceptableValue) => options.find((option) => option.value === value);

  if (Array.isArray(rootContext.modelValue.value)) {
    list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? '');
  } else {
    list = [getOption(rootContext.modelValue.value)?.textContent ?? ''];
  }

  return list.filter(Boolean);
});

const slotText = computed(() => {
  return selectedLabel.value.length ? selectedLabel.value.join(', ') : props.placeholder;
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :style="{ pointerEvents: 'none' }"
    :data-placeholder="selectedLabel.length ? undefined : props.placeholder"
  >
    <slot :selected-label="selectedLabel">
      {{ slotText }}
    </slot>
  </APrimitive>
</template>
