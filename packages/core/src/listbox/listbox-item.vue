<script lang="ts">
import { createContext, handleAndDispatchCustomEvent, useForwardExpose, useId } from '~~/shared';

export interface AListboxItemProps<T = AcceptableValue> extends APrimitiveProps {
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}
export type SelectEvent<T> = CustomEvent<{ originalEvent: PointerEvent; value?: T }>;

export type AListboxItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
};

const LISTBOX_SELECT = 'listbox.select';

interface ListboxItemContext {
  isSelected: Ref<boolean>;
}

export const [
  injectAListboxItemContext,
  provideListboxItemContext,
] = createContext<ListboxItemContext>('AListboxItem');
</script>

<script setup lang="ts"  generic="T extends AcceptableValue = AcceptableValue">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { AcceptableValue } from '~~/shared/types';
import { computed } from 'vue';
import { useCollection } from '~~/collection';
import { APrimitive } from '~~/primitive';
import { injectAListboxRootContext } from './listbox-root.vue';
import { valueComparator } from './utils';

const props = withDefaults(defineProps<AListboxItemProps<T>>(), {
  as: 'div',
});
const emits = defineEmits<AListboxItemEmits<T>>();

const id = useId(undefined, 'akar-listbox-item');
const { ACollectionItem } = useCollection();
const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectAListboxRootContext();

const isHighlighted = computed(() => currentElement.value === rootContext.highlightedElement.value);
const isSelected = computed(() => valueComparator({
  value: rootContext.modelValue.value,
  currentValue: props.value,
  comparator: rootContext.by,
}));

const disabled = computed(() => rootContext.disabled.value || props.disabled);

async function handleSelect(event: SelectEvent<T>) {
  emits('select', event);
  if (event?.defaultPrevented) {
    return;
  }

  if (!disabled.value && event) {
    rootContext.onValueChange(props.value);
    rootContext.changeHighlight(currentElement.value);
  }
}

function handleSelectCustomEvent(event: PointerEvent) {
  const eventDetail = { originalEvent: event, value: props.value as T };
  handleAndDispatchCustomEvent({
    name: LISTBOX_SELECT,
    handler: handleSelect,
    detail: eventDetail,
  });
}

function handlePointerMove() {
  if (rootContext.highlightedElement.value === currentElement.value) {
    return;
  }

  if (rootContext.highlightOnHover.value) {
    rootContext.changeHighlight(currentElement.value, false);
  } else {
    if (rootContext.focusable.value) {
      return;
    }

    rootContext.changeHighlight(currentElement.value, false);
  }
}

provideListboxItemContext({
  isSelected,
});
</script>

<template>
  <ACollectionItem :value="value">
    <APrimitive
      :id="id"
      v-bind="$attrs"
      :ref="forwardRef"
      v-memo="[isHighlighted, isSelected]"
      role="option"
      :tabindex="rootContext.focusable.value ? isHighlighted ? '0' : '-1' : -1"
      :aria-selected="isSelected"
      :as="as"
      :as-child="asChild"
      :disabled="disabled ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isHighlighted ? '' : undefined"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      @click="handleSelectCustomEvent"
      @keydown.space.prevent="handleSelectCustomEvent"
      @pointermove="handlePointerMove"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
