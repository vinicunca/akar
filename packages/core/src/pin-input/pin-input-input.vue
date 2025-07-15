<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface APinInputInputProps extends APrimitiveProps {
  /** Position of the value this input binds to. */
  index: number;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import type { APinInputContextValue } from './pin-input-root.vue';
import { KEY_CODES } from '@vinicunca/perkakas';
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';
import { getActiveElement, useArrowNavigation } from '~~/shared';
import { injectAPinInputRootContext } from './pin-input-root.vue';

const props = withDefaults(
  defineProps<APinInputInputProps>(),
  {
    as: 'input',
  },
);

const context = injectAPinInputRootContext();
const inputElements = computed(() => Array.from(context.inputElements!.value));
const currentValue = computed(() => context.currentModelValue.value[props.index]);

const disabled = computed(() => props.disabled || context.disabled.value);
const isOtpMode = computed(() => context.otp.value);
const isNumericMode = computed(() => context.type.value === 'number');
const isPasswordMode = computed(() => context.mask.value);

const { primitiveElement, currentElement } = usePrimitiveElement();

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;

  if ((event.data?.length ?? 0) > 1) {
    handleMultipleCharacter(target.value);
    return;
  }

  if (isNumericMode.value && !/^\d*$/.test(target.value)) {
    target.value = target.value.replace(/\D/g, '');
    return;
  }

  target.value = target.value.slice(-1);
  updateModelValueAt({
    index: props.index,
    value: target.value,
  });

  const nextEl = inputElements.value[props.index + 1];

  if (nextEl) {
    nextEl.focus();
  }
}

function resetPlaceholder() {
  const target = currentElement.value as HTMLInputElement;
  nextTick(() => {
    if (target && !target.value) {
      target.placeholder = context.placeholder.value;
    }
  });
}

function handleKeydown(event: KeyboardEvent) {
  useArrowNavigation({
    event,
    currentElement: getActiveElement() as HTMLElement,
    options: {
      itemsArray: inputElements.value,
      focus: true,
      loop: false,
      arrowKeyOptions: 'horizontal',
      dir: context.dir.value,
    },
  });
}

function handleBackspace(event: KeyboardEvent) {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value) {
    updateModelValueAt({
      index: props.index,
      value: '',
    });
  } else {
    const prevEl = inputElements.value[props.index - 1];
    if (prevEl) {
      prevEl.focus();
      updateModelValueAt({
        index: props.index - 1,
        value: '',
      });
    }
  }
}

function handleDelete(event: KeyboardEvent) {
  if (event.key === KEY_CODES.DELETE) {
    event.preventDefault();
    updateModelValueAt({
      index: props.index,
      value: '',
    });
  }
}

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement;
  target.setSelectionRange(1, 1);

  if (!target.value) {
    target.placeholder = '';
  }
}

function handleBlur() {
  resetPlaceholder();
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const clipboardData = event.clipboardData;

  if (!clipboardData) {
    return;
  }

  const values = clipboardData.getData('text');
  handleMultipleCharacter(values);
}

function handleMultipleCharacter(values: string) {
  const tempModelValue = [...context.currentModelValue.value] as typeof context.modelValue.value;
  const initialIndex = values.length >= inputElements.value.length ? 0 : props.index;
  const lastIndex = Math.min(initialIndex + values.length, inputElements.value.length);

  for (let i = initialIndex; i < lastIndex; i++) {
    const input = inputElements.value[i];
    const value = values[i - initialIndex];
    if (isNumericMode.value && !/^\d*$/.test(value)) {
      continue;
    }

    tempModelValue[i] = value;
    input.focus();
  }

  context.modelValue.value = tempModelValue;
  inputElements.value[lastIndex]?.focus();
}

function removeTrailingEmptyStrings(input: APinInputContextValue<typeof context.type.value>) {
  let i = input.length - 1;

  while (i >= 0 && input[i] === '') {
    input.pop();
    i--;
  }

  return input;
}

function updateModelValueAt(
  { index, value }:
  { index: number; value: string },
) {
  const tempModelValue = [...context.currentModelValue.value] as typeof context.modelValue.value;
  tempModelValue[index] = isNumericMode.value ? +value : value;
  context.modelValue.value = removeTrailingEmptyStrings(tempModelValue);
}

watch(
  currentValue,
  () => {
    if (!currentValue.value) {
      resetPlaceholder();
    }
  },
);

onMounted(() => {
  context.onInputElementChange(currentElement.value as HTMLInputElement);
});

onUnmounted(() => {
  context.inputElements?.value.delete(currentElement.value as HTMLInputElement);
});
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    autocapitalize="none"
    :as="as"
    :as-child="asChild"
    :autocomplete="isOtpMode ? 'one-time-code' : 'false'"
    :type="isPasswordMode ? 'password' : 'text'"
    :inputmode="isNumericMode ? 'numeric' : 'text'"
    :pattern="isNumericMode ? '[0-9]*' : undefined"
    :placeholder="context.placeholder.value"
    :value="context.modelValue.value[index]"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :data-complete="context.isCompleted.value ? '' : undefined"
    :aria-label="`pin input ${index + 1} of ${inputElements.length}`"
    @input="handleInput($event as InputEvent)"
    @keydown.left.right.up.down.home.end="handleKeydown"
    @keydown.backspace="handleBackspace"
    @keydown.delete="handleDelete"
    @focus="handleFocus"
    @blur="handleBlur"
    @paste="handlePaste"
  >
    <slot />
  </APrimitive>
</template>
