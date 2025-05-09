<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { KEY_CODES } from '@vinicunca/perkakas';
import { APrimitive, usePrimitiveElement } from '~~/primitive';

export interface AEditableInputProps extends APrimitiveProps {
}
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue';
import { injectAEditableRootContext } from './editable-root.vue';

const props = withDefaults(defineProps<AEditableInputProps>(), {
  as: 'input',
});

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

watch(context.isEditing, (value) => {
  if (value) {
    nextTick(() => {
      context.inputRef.value?.focus({ preventScroll: true });
      if (context.selectOnFocus.value) {
        context.inputRef.value?.select();
      }
    });
  }
});

function handleSubmitKeyDown(event: KeyboardEvent) {
  if ((context.submitMode.value === 'enter' || context.submitMode.value === 'both') && event.key === KEY_CODES.ENTER && !event.shiftKey && !event.metaKey) {
    context.submit();
  }
}
</script>

<template>
  <APrimitive
    ref="primitiveElement"
    v-bind="props"
    :value="context.inputValue.value"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="context.maxLength.value"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="context.readonly.value ? '' : undefined"
    :readonly="context.readonly.value"
    aria-label="editable input"
    :hidden="context.autoResize.value ? undefined : !context.isEditing.value"
    :style="context.autoResize.value ? { all: 'unset', gridArea: '1 / 1 / auto / auto', visibility: !context.isEditing.value ? 'hidden' : undefined } : undefined"
    @input="context.inputValue.value = $event.target.value"
    @keydown.enter.space="handleSubmitKeyDown"
    @keydown.esc="context.cancel"
  >
    <slot />
  </APrimitive>
</template>
