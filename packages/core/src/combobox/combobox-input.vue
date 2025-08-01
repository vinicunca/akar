<script lang="ts">
import type { AListboxFilterEmits, AListboxFilterProps } from '~~/listbox';
import { useVModel } from '@vueuse/core';
import { nextTick, onMounted, watch } from 'vue';
import { usePrimitiveElement } from '~~/primitive';

export type AComboboxInputEmits = AListboxFilterEmits;
export interface AComboboxInputProps extends AListboxFilterProps {
  /** The display value of input for selected item. Does not work with `multiple`. */
  displayValue?: (val: any) => string;
}
</script>

<script setup lang="ts">
import { AListboxFilter } from '~~/listbox';
import { injectAListboxRootContext } from '~~/listbox/listbox-root.vue';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = withDefaults(defineProps<AComboboxInputProps>(), {
  as: 'input',
});
const emits = defineEmits<AComboboxInputEmits>();

const rootContext = injectAComboboxRootContext();
const listboxContext = injectAListboxRootContext();
const { primitiveElement, currentElement } = usePrimitiveElement();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: (props.modelValue === undefined) as false,
});

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

function resetSearchTerm() {
  const rootModelValue = rootContext.modelValue.value;

  if (props.displayValue) {
    modelValue.value = props.displayValue(rootModelValue);
  } else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) {
    if (typeof rootModelValue !== 'object') {
      modelValue.value = rootModelValue.toString();
    } else {
      modelValue.value = '';
    }
  } else {
    modelValue.value = '';
  }

  nextTick(() => {
    // Temporary force reassign
    // eslint-disable-next-line no-self-assign
    modelValue.value = modelValue.value;
  });
}

rootContext.onResetSearchTerm(() => {
  resetSearchTerm();
});

watch(rootContext.modelValue, async () => {
  if (
    !rootContext.isUserInputted.value
    && rootContext.resetSearchTermOnSelect.value
  ) {
    resetSearchTerm();
  }
}, { immediate: true, deep: true });

watch(
  rootContext.filterState,
  () => {
    // we exclude virtualized list as the state would be constantly updated
    if (!rootContext.isVirtual.value) {
      listboxContext.highlightFirstItem();
    }
  },
);
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
