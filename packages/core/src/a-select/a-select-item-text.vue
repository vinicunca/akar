<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectASelectContentContext } from './a-select-content-impl.vue';
import { injectASelectItemContext } from './a-select-item.vue';
import { injectASelectRootContext } from './a-select-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ASelectItemTextProps>(),
  {
    as: 'span',
  },
);

const rootContext = injectASelectRootContext();
const contentContext = injectASelectContentContext();
const itemContext = injectASelectItemContext();

const { forwardRef, currentElement: itemTextElement } = useForwardExpose();

const optionProps = computed(() => {
  return {
    value: itemContext.value,
    disabled: itemContext.disabled.value,
    textContent: itemTextElement.value?.textContent ?? itemContext.value.toString(),
  };
});

onMounted(() => {
  if (!itemTextElement.value) {
    return;
  }
  itemContext.onItemTextChange(itemTextElement.value);

  contentContext.itemTextRefCallback({
    node: itemTextElement.value,
    value: itemContext.value,
    disabled: itemContext.disabled.value,
  });

  rootContext.onOptionAdd(optionProps.value);
});

onBeforeUnmount(() => {
  rootContext.onOptionRemove(optionProps.value);
});
</script>

<template>
  <APrimitive
    :id="itemContext.textId"
    :ref="forwardRef"
    v-bind="{ ...props, ...$attrs }"
  >
    <slot />
  </APrimitive>
</template>
