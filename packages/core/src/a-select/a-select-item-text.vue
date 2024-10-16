<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectASelectContentContext } from './a-select-content-impl.vue';
import { injectASelectItemContext } from './a-select-item.vue';
import { injectASelectNativeOptionsContext } from './a-select-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ASelectItemTextProps>(),
  {
    as: 'span',
  },
);

const contentContext = injectASelectContentContext();
const nativeOptionContext = injectASelectNativeOptionsContext();
const itemContext = injectASelectItemContext();

const { forwardRef, currentElement: itemTextElement } = useForwardExpose();

const nativeOption = computed(() => {
  return h('option', {
    key: itemContext.value.toString(),
    value: itemContext.value,
    disabled: itemContext.disabled.value,
    textContent: itemTextElement.value?.textContent,
  });
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

  nativeOptionContext.onNativeOptionAdd(nativeOption.value);
});

onBeforeUnmount(() => {
  nativeOptionContext.onNativeOptionRemove(nativeOption.value);
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
