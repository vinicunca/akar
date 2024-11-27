<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import {
  type AcceptableValue,
  createContext,
} from '~~/shared';

export type AListboxItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
};
export interface AListboxItemProps<T = AcceptableValue> extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /** The value given as data when submitted with a `name`. */
  value: T;
}

export type SelectEvent<T> = CustomEvent<{ originalEvent: PointerEvent; value?: T }>;

const LISTBOX_SELECT = 'listbox.select';

interface AListboxItemContext {
  isSelected: Ref<boolean>;
}

export const [
  injectAListboxItemContext,
  provideAListboxItemContext,
] = createContext<AListboxItemContext>('AListboxItem');
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, type Ref } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';
import {
  handleAndDispatchCustomEvent,
  useForwardExpose,
  useId,
} from '~~/shared';

import { injectAListboxRootContext } from './a-listbox-root.vue';
import { valueComparator } from './utils';

const props = withDefaults(
  defineProps<AListboxItemProps<T>>(),
  {
    as: 'div',
  },
);
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

function handlePointerMove() {
  if (rootContext.highlightedElement.value === currentElement.value) {
    return;
  }

  if (rootContext.highlightOnHover.value) {
    rootContext.changeHighlight({ el: currentElement.value, scrollIntoView: false });
  } else {
    if (!rootContext.focusable.value) {
      rootContext.changeHighlight({ el: currentElement.value, scrollIntoView: false });
    }
  }
}

async function handleSelect(event: SelectEvent<T>) {
  emits('select', event);

  if (event?.defaultPrevented) {
    return;
  }

  if (!disabled.value && event) {
    rootContext.onValueChange(props.value);
    rootContext.changeHighlight({ el: currentElement.value });
  }
}

function handleSelectCustomEvent(ev: PointerEvent) {
  const eventDetail = { originalEvent: ev, value: props.value as T };
  handleAndDispatchCustomEvent({ name: LISTBOX_SELECT, handler: handleSelect, detail: eventDetail });
}

provideAListboxItemContext({
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
