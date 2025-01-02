<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectASelectRootContext } from './select-root.vue';

export interface ASelectItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectSelectContentContext } from './select-content-impl.vue';
import { injectASelectItemContext } from './select-item.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ASelectItemTextProps>(), {
  as: 'span',
});

const rootContext = injectASelectRootContext();
const contentContext = injectSelectContentContext();
const itemContext = injectASelectItemContext();

const { forwardRef, currentElement: itemTextElement } = useForwardExpose();

const optionProps = computed(() => {
  return {
    value: itemContext.value,
    disabled: itemContext.disabled.value,
    textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? '',
  };
});

onMounted(() => {
  if (!itemTextElement.value) {
    return;
  }
  itemContext.onItemTextChange(itemTextElement.value);
  contentContext.itemTextRefCallback(
    itemTextElement.value,
    itemContext.value,
    itemContext.disabled.value,
  );
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
    data-item-text
  >
    <slot />
  </APrimitive>
</template>
