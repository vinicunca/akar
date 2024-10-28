<script lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';

export interface AEditableInputProps extends APrimitiveProps {
}
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';

import { injectAEditableRootContext } from './a-editable-root.vue';

const props = withDefaults(
  defineProps<AEditableInputProps>(),
  {
    as: 'input',
  },
);

const context = injectAEditableRootContext();

const disabled = computed(() => context.disabled.value);

const placeholder = computed(() => context.placeholder.value?.edit);

const { primitiveElement, currentElement: inputRef } = usePrimitiveElement();

onMounted(() => {
  context.inputRef.value = inputRef.value as HTMLInputElement;

  if (context.startWithEditMode.value) {
    context.inputRef.value?.focus({ preventScroll: true });

    if (context.selectOnFocus.value) {
      context.inputRef.value?.select();
    }
  }
});

watch(
  context.isEditing,
  (value) => {
    if (value) {
      nextTick(() => {
        context.inputRef.value?.focus({ preventScroll: true });

        if (context.selectOnFocus.value) {
          context.inputRef.value?.select();
        }
      });
    }
  },
);

function handleSubmitKeyDown(event: KeyboardEvent) {
  if (
    (
      context.submitMode.value === 'enter'
      || context.submitMode.value === 'both'
    )
    && event.key === KEY_CODES.ENTER
    && !event.shiftKey
    && !event.metaKey
  ) {
    context.submit();
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    v-bind="props"
    :value="context.modelValue.value"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="context.maxLength.value"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="context.readonly.value ? '' : undefined"
    :readonly="context.readonly.value"
    aria-label="editable input"
    :hidden="context.autoResize.value ? undefined : !context.isEditing.value"
    :style="context.autoResize.value ? { all: 'unset', gridArea: '1 / 1 / auto / auto', visibility: !context.isEditing.value ? 'hidden' : undefined } : undefined"
    @input="context.modelValue.value = $event.target.value"
    @keydown.enter.space="handleSubmitKeyDown"
    @keydown.esc="context.cancel"
  >
    <slot />
  </APrimitive>
</template>
