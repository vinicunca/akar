<script lang="ts">
import type { AListboxFilterEmits, AListboxFilterProps } from '../listbox';

export type AAutocompleteInputEmits = AListboxFilterEmits;
export interface AAutocompleteInputProps extends AListboxFilterProps {}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { nextTick, onMounted, watch } from 'vue';
import { injectAComboboxRootContext } from '../combobox/combobox-root.vue';
import { AListboxFilter } from '../listbox';
import { injectAListboxRootContext } from '../listbox/listbox-root.vue';
import { usePrimitiveElement } from '../primitive';
import { injectAAutocompleteRootContext } from './autocomplete-root.vue';

const props = withDefaults(
  defineProps<AAutocompleteInputProps>(),
  {
    as: 'input',
  },
);
const emits = defineEmits<AAutocompleteInputEmits>();

const rootContext = injectAComboboxRootContext();
const autocompleteContext = injectAAutocompleteRootContext();
const listboxContext = injectAListboxRootContext();
const { primitiveElement, currentElement } = usePrimitiveElement();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    passive: (props.modelValue === undefined) as false,
  },
);

if (autocompleteContext.modelValue.value) {
  modelValue.value = autocompleteContext.modelValue.value;
}

onMounted(() => {
  if (currentElement.value) {
    rootContext.onInputElementChange(currentElement.value as HTMLInputElement);
  }
});

function handleKeyDown(ev: KeyboardEvent) {
  if (!rootContext.open.value) {
    rootContext.onOpenChange(true);
  }
}

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  if (!rootContext.open.value) {
    rootContext.onOpenChange(true);
    nextTick(() => {
      if (target.value) {
        rootContext.filterSearch.value = target.value;
        listboxContext.highlightFirstItem();
      }
    });
  } else {
    rootContext.filterSearch.value = target.value;
  }
  // Autocomplete-specific: update root's modelValue with the typed text
  autocompleteContext.modelValue.value = target.value;
}

function handleFocus() {
  if (rootContext.openOnFocus.value && !rootContext.open.value) {
    rootContext.onOpenChange(true);
  }
}

function handleClick() {
  if (rootContext.openOnClick.value && !rootContext.open.value) {
    rootContext.onOpenChange(true);
  }
}

// When root's modelValue changes externally (e.g. item click, programmatic), sync the input display
watch(autocompleteContext.modelValue, (newVal) => {
  const text = newVal ?? '';
  if (modelValue.value !== text) {
    modelValue.value = text;
  }
});

// Restore input text when root triggers resetSearchTerm (e.g. on blur with resetSearchTermOnBlur)
rootContext.onResetSearchTerm(() => {
  modelValue.value = autocompleteContext.modelValue.value ?? '';
});

watch(rootContext.filterState, (_newValue, oldValue) => {
  if (!rootContext.isVirtual.value && (oldValue.count === 0)) {
    listboxContext.highlightFirstItem();
  }
});
</script>

<template>
  <AListboxFilter
    ref="primitiveElement"
    v-model="modelValue"
    :as="as"
    :as-child="asChild"
    :auto-focus="autoFocus"
    :disabled="disabled"
    :aria-expanded="rootContext.open.value"
    :aria-controls="rootContext.contentId"
    aria-autocomplete="list"
    role="combobox"
    autocomplete="off"
    @click="handleClick"
    @input="handleInput"
    @keydown.down.up.prevent="handleKeyDown"
    @focus="handleFocus"
  >
    <slot />
  </AListboxFilter>
</template>
