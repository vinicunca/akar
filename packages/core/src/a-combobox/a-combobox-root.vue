<script lang="ts">
import type { Ref } from 'vue';

import type { AListboxRootProps } from '~~/a-listbox';
import type { AcceptableValue, GenericComponentInstance } from '~~/shared/types';

import { createContext } from '~~/shared';

type AComboboxRootContext<T> = {
  allGroups: Ref<Map<string, Set<string>>>;
  allItems: Ref<Map<string, string>>;
  contentId: string;
  disabled: Ref<boolean>;
  filterState: {
    filtered: { count: number; groups: Set<string>; items: Map<string, number> };
    search: string;
  };
  highlightedElement: Ref<HTMLElement | undefined>;
  ignoreFilter: Ref<boolean>;
  inputElement: Ref<HTMLInputElement | undefined>;
  isUserInputted: Ref<boolean>;
  isVirtual: Ref<boolean>;
  modelValue: Ref<Array<T> | T>;
  multiple: Ref<boolean>;
  onInputElementChange: (el: HTMLInputElement) => void;
  onOpenChange: (value: boolean) => void;
  onResetSearchTerm: EventHookOn;
  open: Ref<boolean>;
  parentElement: Ref<HTMLElement | undefined>;
};

export const [
  injectAComboboxRootContext,
  provideAComboboxRootContext,
] = createContext<AComboboxRootContext<AcceptableValue>>('ComboboxRoot');

export type AComboboxRootEmits<T = AcceptableValue> = {
  /** Event handler when highlighted element changes. */
  'highlight': [payload: { ref: HTMLElement; value: T } | undefined];
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler called when the open state of the combobox changes. */
  'update:open': [value: boolean];
};

export interface AComboboxRootProps<T = AcceptableValue> extends Omit<AListboxRootProps<T>, 'orientation' | 'selectionBehavior' > {
  /** The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * When `true`, disable the default filters
   */
  ignoreFilter?: boolean;
  /** The controlled open state of the Combobox. Can be binded-with with `v-model:open`. */
  open?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   * @defaultValue `true`
   */
  resetSearchTermOnBlur?: boolean;
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { createEventHook, type EventHookOn, useVModel } from '@vueuse/core';
import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue';

import { AListboxRoot } from '~~/a-listbox';
import { APopperRoot } from '~~/a-popper';
import { usePrimitiveElement } from '~~/a-primitive';
import { useDirection, useFilter } from '~~/shared';

const props = withDefaults(
  defineProps<AComboboxRootProps<T>>(),
  {
    open: undefined,
    resetSearchTermOnBlur: true,
  },
);

const emits = defineEmits<AComboboxRootEmits<T>>();

defineSlots<{
  default: (props: {
    /** Current active value */
    modelValue: typeof modelValue.value;
    /** Current open state */
    open: typeof open.value;
  }) => any;
}>();

const { primitiveElement, currentElement: parentElement } = usePrimitiveElement<GenericComponentInstance<typeof AListboxRoot>>();
const { multiple, disabled, ignoreFilter, dir: propDir } = toRefs(props);

const dir = useDirection(propDir);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    // @ts-expect-error ignore the type error here
    defaultValue: props.defaultValue ?? multiple.value ? [] : undefined,
    passive: (props.modelValue === undefined) as false,
    deep: true,
  },
) as Ref<Array<T> | T>;

const open = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as Ref<boolean>;

async function onOpenChange(val: boolean) {
  open.value = val;
  filterState.search = '';

  if (val) {
    primitiveElement.value?.highlightSelected();
    isUserInputted.value = true;
  } else {
    isUserInputted.value = false;
  }

  inputElement.value?.focus();

  setTimeout(() => {
    if (!val && props.resetSearchTermOnBlur) {
      resetSearchTerm.trigger();
    }
  }, 1);
}

const resetSearchTerm = createEventHook();
const isUserInputted = ref(false);
const isVirtual = ref(false);
const inputElement = ref<HTMLInputElement>();

const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? undefined);

const allItems = ref<Map<string, string>>(new Map());
const allGroups = ref<Map<string, Set<string>>>(new Map());

const { contains } = useFilter({ sensitivity: 'base' });
const filterState = reactive({
  search: '',
  filtered: {
    /** The count of all visible items. */
    count: 0,
    /** Map from visible item id to its search score. */
    items: new Map() as Map<string, number>,
    /** Set of groups with at least one visible item. */
    groups: new Set() as Set<string>,
  },
});

function filterItems() {
  if (!filterState.search || props.ignoreFilter || isVirtual.value) {
    filterState.filtered.count = allItems.value.size;
    // Do nothing, each item will know to show itself because search is empty
    return;
  }

  // Reset the groups
  filterState.filtered.groups = new Set();
  let itemCount = 0;

  // Check which items should be included
  for (const [id, value] of allItems.value) {
    const score = contains({ string: value, substring: filterState.search });
    filterState.filtered.items.set(id, score ? 1 : 0);
    if (score) {
      itemCount++;
    }
  }

  // Check which groups have at least 1 item shown
  for (const [groupId, group] of allGroups.value) {
    for (const itemId of group) {
      if (filterState.filtered.items.get(itemId)! > 0) {
        filterState.filtered.groups.add(groupId);
        break;
      }
    }
  }

  filterState.filtered.count = itemCount;
}

watch(
  () => filterState.search,
  () => {
    filterItems();
  },
  { immediate: true },
);

watch(
  () => open.value,
  () => {
  // nextTick to allow multiple items to be mounted first
    nextTick(() => {
      if (open.value) {
        filterItems();
      }
    });
  },
  { flush: 'post' },
);

defineExpose({
  highlightedElement,
  highlightItem: primitiveElement.value?.highlightItem,
  highlightFirstItem: primitiveElement.value?.highlightFirstItem,
  highlightSelected: primitiveElement.value?.highlightSelected,
});

provideAComboboxRootContext({
  modelValue,
  multiple,
  disabled,
  open,
  onOpenChange,
  contentId: '',
  isUserInputted,
  isVirtual,
  inputElement,
  highlightedElement,
  onInputElementChange: (val) => {
    inputElement.value = val;
  },
  parentElement,
  onResetSearchTerm: resetSearchTerm.on,
  allItems,
  allGroups,
  filterState,
  ignoreFilter,
});
</script>

<template>
  <APopperRoot>
    <AListboxRoot
      ref="primitiveElement"
      v-bind="$attrs"
      v-model="modelValue"
      :style="{
        pointerEvents: open ? 'auto' : undefined,
      }"
      :as="as"
      :as-child="asChild"
      :dir="dir"
      :multiple="multiple"
      :name="name"
      :required="required"
      :disabled="disabled"
      @highlight="emits('highlight', $event as any)"
    >
      <slot
        :open="open"
        :model-value="modelValue"
      />
    </AListboxRoot>
  </APopperRoot>
</template>
