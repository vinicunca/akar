<script lang="ts">
import type { APrimitiveProps } from '../primitive';

const ALLOWED_INPUT_RE = /[\d.-]/;

export interface AColorFieldInputProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';
import { computed, ref } from 'vue';
import { APrimitive } from '../primitive';
import { injectAColorFieldRootContext } from './color-field-root.vue';

const props = withDefaults(
  defineProps<AColorFieldInputProps>(),
  {
    as: 'input',
  },
);

const rootContext = injectAColorFieldRootContext();

const isFocused = ref(false);

const inputType = computed(() => {
  return rootContext.channel.value ?? 'text';
});

const inputMode = computed(() => {
  return rootContext.channel.value ? 'numeric' : 'text';
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  rootContext.updateValue(target.value);
}

function handleBlur() {
  isFocused.value = false;
  rootContext.commit();
}

function handleFocus() {
  isFocused.value = true;
}

function handleWheel(event: WheelEvent) {
  if (!isFocused.value) {
    return;
  }
  rootContext.handleWheel(event);
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case KEY_CODES.ARROW_UP:
      event.preventDefault();
      rootContext.increment();
      break;
    case KEY_CODES.ARROW_DOWN:
      event.preventDefault();
      rootContext.decrement();
      break;
    case KEY_CODES.PAGE_UP:
      event.preventDefault();
      rootContext.incrementPage();
      break;
    case KEY_CODES.PAGE_DOWN:
      event.preventDefault();
      rootContext.decrementPage();
      break;
    case KEY_CODES.HOME:
      event.preventDefault();
      rootContext.decrementToMin();
      break;
    case KEY_CODES.END:
      event.preventDefault();
      rootContext.incrementToMax();
      break;
    case KEY_CODES.ENTER:
      event.preventDefault();
      rootContext.commit();
      break;
  }
}

// Handle numeric key validation for channel mode
function handleBeforeInput(event: InputEvent) {
  if (!rootContext.channel.value) {
    return;
  } // No validation for hex mode

  const target = event.target as HTMLInputElement;
  const data = event.data;

  // Allow numbers, decimal point, minus sign
  if (data && !ALLOWED_INPUT_RE.test(data)) {
    event.preventDefault();
    return;
  }

  // Check the resulting value would be valid
  const nextValue = target.value.slice(0, target.selectionStart ?? undefined)
    + (data ?? '')
    + target.value.slice(target.selectionEnd ?? undefined);

  // Allow empty or partial values while typing
  if (nextValue === '-' || nextValue === '.' || nextValue === '-.') {
    return;
  }

  const numValue = Number.parseFloat(nextValue);
  if (Number.isNaN(numValue)) {
    event.preventDefault();
  }
}
</script>

<template>
  <APrimitive
    :as-child="asChild"
    :as="props.as"
    :type="inputType"
    :inputmode="inputMode"
    :value="rootContext.inputValue.value"
    :placeholder="rootContext.placeholder.value"
    :disabled="rootContext.disabled.value"
    :readonly="rootContext.readonly.value"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-readonly="rootContext.readonly.value ? '' : undefined"
    :aria-invalid="!rootContext.channel.value ? undefined : undefined"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
    @keydown="handleKeydown"
    @wheel="handleWheel"
    @beforeinput="handleBeforeInput"
  >
    <slot />
  </APrimitive>
</template>
