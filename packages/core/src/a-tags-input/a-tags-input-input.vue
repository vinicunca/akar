<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATagsInputInputProps extends APrimitiveProps {
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** Maximum number of character allowed. */
  maxLength?: number;
  /** The placeholder character to use for empty tags input. */
  placeholder?: string;
}
</script>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATagsInputRootContext } from './a-tags-input-root.vue';

const props = withDefaults(
  defineProps<ATagsInputInputProps>(),
  {
    as: 'input',
  },
);

const context = injectATagsInputRootContext();
const { forwardRef, currentElement } = useForwardExpose();

function handleBlur(event: Event) {
  if (!context.addOnBlur.value) {
    return;
  }

  const target = event.target as HTMLInputElement;
  if (!target.value) {
    return;
  }

  const isAdded = context.onAddValue(target.value);
  if (isAdded) {
    target.value = '';
  }
}

function handleTab(event: Event) {
  if (!context.addOnTab.value) {
    return;
  }

  handleCustomKeydown(event);
}

async function handleCustomKeydown(event: Event) {
  await nextTick();
  // if keydown KEY_CODES.ENTER or `Tab` was prevented, we let user handle updating the value themselves
  if (event.defaultPrevented) {
    return;
  }

  const target = event.target as HTMLInputElement;
  if (!target.value) {
    return;
  }

  const isAdded = context.onAddValue(target.value);
  if (isAdded) {
    target.value = '';
  }

  // prevent reloading when using inside of form
  event.preventDefault();
}

function handleInput(event: InputEvent) {
  context.isInvalidInput.value = false;
  const delimiter = context.delimiter.value;
  if (delimiter === event.data) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replaceAll(delimiter, '');

    const isAdded = context.onAddValue(target.value);
    if (isAdded) {
      target.value = '';
    }
  }
}

function handlePaste(event: ClipboardEvent) {
  if (context.addOnPaste.value) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    const value = clipboardData.getData('text');
    if (context.delimiter.value) {
      const splitValue = value.split(context.delimiter.value);
      splitValue.forEach((v) => {
        context.onAddValue(v);
      });
    } else {
      context.onAddValue(value);
    }
  }
}

onMounted(() => {
  const inputEl = currentElement.value.nodeName === 'INPUT'
    ? currentElement.value
    : currentElement.value.querySelector('input');

  if (!inputEl) {
    return;
  }

  setTimeout(() => {
    // make sure all DOM was flush then only capture the focus
    if (props.autoFocus) {
      inputEl?.focus();
    }
  }, 1);
});
</script>

<template>
  <APrimitive
    :id="context.id?.value"
    :ref="forwardRef"
    type="text"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    :as="as"
    :as-child="asChild"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :disabled="context.disabled.value"
    :data-invalid="context.isInvalidInput.value ? '' : undefined"
    @input="handleInput"
    @keydown.enter="handleCustomKeydown"
    @keydown.tab="handleTab"
    @blur="handleBlur"
    @keydown="context.onInputKeydown"
    @paste="handlePaste"
  >
    <slot />
  </APrimitive>
</template>
