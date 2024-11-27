<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { AcceptableValue } from '~~/shared/types';

import { useCollection } from '~~/collection';
import { createContext } from '~~/shared';

interface ASelectItemContext<T = AcceptableValue> {
  disabled: Ref<boolean>;
  isSelected: Ref<boolean>;
  onItemTextChange: (node: HTMLElement | undefined) => void;
  textId: string;
  value: T;
}

export const [
  injectASelectItemContext,
  provideASelectItemContext,
] = createContext<ASelectItemContext>('ASelectItem');

export interface ASelectItemProps<T = AcceptableValue> extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes.
   *
   * By default the typeahead behavior will use the `.textContent` of the `ASelectItemText` part.
   *
   * Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
  /** The value given as data when submitted with a `name`. */
  value: T;
}
</script>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  toRefs,
} from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose, useId } from '~~/shared';

import { injectASelectContentContext } from './a-select-content-impl.vue';
import { injectASelectRootContext } from './a-select-root.vue';
import { SELECTION_KEYS, valueComparator } from './utils';

const props = defineProps<ASelectItemProps>();
const { disabled } = toRefs(props);

const rootContext = injectASelectRootContext();
const contentContext = injectASelectContentContext();
const { forwardRef, currentElement } = useForwardExpose();
const { ACollectionItem } = useCollection();

const isSelected = computed(() =>
  valueComparator({
    value: rootContext.modelValue?.value,
    currentValue: props.value,
    comparator: rootContext.by,
  }),
);

const isFocused = ref(false);
const textValue = ref(props.textValue ?? '');
const textId = useId(undefined, 'akar-select-item-text');

async function handleASelect(event?: PointerEvent) {
  await nextTick();

  if (event?.defaultPrevented) {
    return;
  }

  if (!disabled.value) {
    rootContext.onValueChange(props.value);

    if (!rootContext.multiple.value) {
      rootContext.onOpenChange(false);
    }
  }
}

async function handleKeyDown(event: KeyboardEvent) {
  await nextTick();

  if (event.defaultPrevented) {
    return;
  }

  const isTypingAhead = contentContext.searchRef?.value !== '';

  if (isTypingAhead && event.key === ' ') {
    return;
  }

  if (SELECTION_KEYS.includes(event.key)) {
    handleASelect();
  }

  // prevent page scroll if using the space key to select an item
  if (event.key === ' ') {
    event.preventDefault();
  }
}

async function handlePointerLeave(event: PointerEvent) {
  await nextTick();

  if (event.defaultPrevented) {
    return;
  }

  if (event.currentTarget === document.activeElement) {
    contentContext.onItemLeave?.();
  }
}

async function handlePointerMove(event: PointerEvent) {
  await nextTick();

  if (event.defaultPrevented) {
    return;
  }
  if (disabled.value) {
    contentContext.onItemLeave?.();
  } else {
    // even though safari doesn't support this option, it's acceptable
    // as it only means it might scroll a few pixels when using the pointer.
    (event.currentTarget as HTMLElement).focus({ preventScroll: true });
  }
}

if (props.value === '') {
  throw new Error(
    'A <ASelectItem /> must have a value prop that is not an empty string. This is because the ASelect value can be set to an empty string to clear the selection and show the placeholder.',
  );
}

onMounted(() => {
  if (!currentElement.value) {
    return;
  }

  contentContext.itemRefCallback({
    node: currentElement.value,
    value: props.value,
    disabled: props.disabled,
  });
});

function handlePointerDown(event: PointerEvent) {
  (event.currentTarget as HTMLElement).focus({ preventScroll: true });
}

provideASelectItemContext({
  value: props.value,
  disabled,
  textId,
  isSelected,
  onItemTextChange: (node) => {
    textValue.value = ((textValue.value || node?.textContent) ?? '').trim();
  },
});
</script>

<template>
  <ACollectionItem>
    <APrimitive
      :ref="forwardRef"
      role="option"
      :aria-labelledby="textId"
      :data-highlighted="isFocused ? '' : undefined"
      :aria-selected="isSelected"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      :tabindex="disabled ? undefined : -1"
      :as="as"
      :as-child="asChild"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @pointerup="handleASelect"
      @pointerdown="handlePointerDown"
      @touchend.prevent.stop
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @keydown="handleKeyDown"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
