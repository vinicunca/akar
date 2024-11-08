<script lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, onMounted } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { injectAListboxRootContext } from './a-listbox-root.vue';

export interface AListboxFilterProps extends APrimitiveProps {
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
  /** The controlled value of the filter. Can be binded-with with v-model. */
  modelValue?: string;
}

export type AListboxFilterEmits = {
  'update:modelValue': [string];
};
</script>

<script setup lang="ts">
import { APrimitive, usePrimitiveElement } from '~~/a-primitive';

const props = withDefaults(
  defineProps<AListboxFilterProps>(),
  {
    as: 'input',
  },
);

const emits = defineEmits<AListboxFilterEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: '',
    passive: (props.modelValue === undefined) as false,
  },
);

const rootContext = injectAListboxRootContext();
rootContext.focusable.value = false;

const { primitiveElement, currentElement } = usePrimitiveElement();
const disabled = computed(() => props.disabled || rootContext.disabled.value || false);

onMounted(() => {
  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) {
      currentElement.value?.focus();
    }
  }, 1);
});

function handleInput(event: InputEvent) {
  modelValue.value = (event.target as HTMLInputElement).value;
  rootContext.highlightFirstItem(event);
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :value="modelValue"
    :disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    type="text"
    @keydown.down.up.home.end.prevent="rootContext.onKeydownNavigation"
    @keydown.enter="rootContext.onKeydownEnter"
    @input="handleInput"
  >
    <slot :model-value="modelValue" />
  </APrimitive>
</template>
