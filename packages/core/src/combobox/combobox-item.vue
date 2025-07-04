<script lang="ts">
import type { AListboxItemEmits, AListboxItemProps } from '~~/listbox';
import type { SelectEvent } from '~~/listbox/listbox-item.vue';
import type { AcceptableValue } from '~~/shared/types';
import { computed, onMounted, onUnmounted } from 'vue';
import { usePrimitiveElement } from '~~/primitive';
import { useId } from '~~/shared';
import { injectAComboboxGroupContext } from './combobox-group.vue';
import { injectAComboboxRootContext } from './combobox-root.vue';

export { injectAListboxItemContext as injectComboboxItemContext } from '~~/listbox';

export type AComboboxItemEmits<T = AcceptableValue> = AListboxItemEmits<T>;
export interface AComboboxItemProps<T = AcceptableValue> extends AListboxItemProps<T> {
  /**
   * A string representation of the item contents.
   *
   * If the children are not plain text, then the `textValue` prop must also be set to a plain text representation, which will be used for autocomplete in the ComboBox.
   */
  textValue?: string;
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { AListboxItem } from '~~/listbox';

const props = defineProps<AComboboxItemProps<T>>();
const emits = defineEmits<AComboboxItemEmits<T>>();

const id = useId(undefined, 'akar-combobox-item');
const rootContext = injectAComboboxRootContext();
const groupContext = injectAComboboxGroupContext(null);

const { primitiveElement, currentElement } = usePrimitiveElement();

if (props.value === '') {
  throw new Error(
    'A <AComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.',
  );
}

const isRender = computed(() => {
  if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterSearch.value) {
    return true;
  } else {
    const filteredCurrentItem = rootContext.filterState.value.items.get(id);
    // If the filtered items is undefined means not in the all times map yet
    // Do the first render to add into the map
    if (filteredCurrentItem === undefined) {
      return true;
    }

    // Check with filter
    return filteredCurrentItem > 0;
  }
});

function handleSelect(event: SelectEvent<T>) {
  emits('select', event);

  if (event.defaultPrevented) {
    return;
  }

  if (
    !rootContext.multiple.value
    && !props.disabled
    && !rootContext.disabled.value
  ) {
    event.preventDefault();
    rootContext.onOpenChange(false);
    rootContext.modelValue.value = props.value;
  }
}

onMounted(() => {
  // textValue to perform filter
  rootContext.allItems.value.set(
    id,
    // eslint-disable-next-line unicorn/prefer-dom-node-text-content
    props.textValue || currentElement.value.textContent || currentElement.value.innerText,
  );

  const groupId = groupContext?.id;
  if (groupId) {
    if (!rootContext.allGroups.value.has(groupId)) {
      rootContext.allGroups.value.set(groupId, new Set([id]));
    } else {
      rootContext.allGroups.value.get(groupId)?.add(id);
    }
  }
});

onUnmounted(() => {
  rootContext.allItems.value.delete(id);
});
</script>

<template>
  <AListboxItem
    v-if="isRender"
    v-bind="props"
    :id="id"
    ref="primitiveElement"
    :disabled="rootContext.disabled.value || disabled"
    @select="handleSelect"
  >
    <slot>{{ value }}</slot>
  </AListboxItem>
</template>
