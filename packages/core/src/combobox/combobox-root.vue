<script lang="ts">
import type { Ref } from 'vue';
import type { AListboxRootProps } from '~~/listbox';
import type { AcceptableValue, GenericComponentInstance } from '~~/shared/types';
import { usePrimitiveElement } from '~~/primitive';
import { createContext, useDirection, useFilter } from '~~/shared';

type ComboboxRootContext<T> = {
  modelValue: Ref<Array<T> | T>;
  multiple: Ref<boolean>;
  disabled: Ref<boolean>;
  open: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  isUserInputted: Ref<boolean>;
  isVirtual: Ref<boolean>;
  contentId: string;
  inputElement: Ref<HTMLInputElement | undefined>;
  onInputElementChange: (el: HTMLInputElement) => void;
  triggerElement: Ref<HTMLElement | undefined>;
  onTriggerElementChange: (el: HTMLElement) => void;
  highlightedElement: Ref<HTMLElement | undefined>;
  parentElement: Ref<HTMLElement | undefined>;
  resetSearchTermOnSelect: Ref<boolean>;
  onResetSearchTerm: EventHookOn;
  allItems: Ref<Map<string, string>>;
  allGroups: Ref<Map<string, Set<string>>>;
  filterState: {
    search: string;
    filtered: { count: number; items: Map<string, number>; groups: Set<string> };
  };
  ignoreFilter: Ref<boolean>;
};

export const [
  injectAComboboxRootContext,
  provideComboboxRootContext,
] = createContext<ComboboxRootContext<AcceptableValue>>('AComboboxRoot');

export type AComboboxRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value changes. */
  'update:modelValue': [value: T];
  /** Event handler when highlighted element changes. */
  'highlight': [payload: undefined | { ref: HTMLElement; value: T }];
  /** Event handler called when the open state of the combobox changes. */
  'update:open': [value: boolean];
};

export interface AComboboxRootProps<T = AcceptableValue> extends Omit<AListboxRootProps<T>, 'orientation' | 'selectionBehavior'> {
  /** The controlled open state of the Combobox. Can be binded with with `v-model:open`. */
  open?: boolean;
  /** The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox input blurred
   * @defaultValue `true`
   */
  resetSearchTermOnBlur?: boolean;
  /**
   * Whether to reset the searchTerm when the Combobox value is selected
   * @defaultValue `true`
   */
  resetSearchTermOnSelect?: boolean;
  /**
   * When `true`, disable the default filters
   */
  ignoreFilter?: boolean;
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { EventHookOn } from '@vueuse/core';
import { createEventHook, useVModel } from '@vueuse/core';
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { AListboxRoot } from '~~/listbox';
import { APopperRoot } from '~~/popper';

const props = withDefaults(
  defineProps<AComboboxRootProps<T>>(),
  {
    open: undefined,
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
  },
);
const emits = defineEmits<AComboboxRootEmits<T>>();

defineSlots<{
  default?: (props: {
    /** Current open state */
    open: typeof open.value;
    /** Current active value */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const {
  primitiveElement,
  currentElement: parentElement,
} = usePrimitiveElement<GenericComponentInstance<typeof AListboxRoot>>();
const {
  multiple,
  disabled,
  ignoreFilter,
  resetSearchTermOnSelect,
  dir: propDir,
} = toRefs(props);

const dir = useDirection(propDir);

const modelValue = useVModel(props as AComboboxRootProps<T>, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
  passive: (props.modelValue === undefined) as false,
  deep: true,
}) as Ref<Array<T> | T>;

const open = useVModel(props, 'open', emits, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

async function onOpenChange(val: boolean) {
  open.value = val;
  filterState.search = '';

  if (val) {
    // make sure dom is ready then only highlight the selected
    await nextTick();

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
const triggerElement = ref<HTMLElement>();

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
  [() => filterState.search, () => allItems.value.size],
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

const currentInstance = getCurrentInstance();
onMounted(() => {
  if (currentInstance?.exposed) {
    currentInstance.exposed.highlightItem = primitiveElement.value?.highlightItem;
    currentInstance.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
    currentInstance.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
  }
});

defineExpose({
  filtered: computed(() => filterState.filtered),
  highlightedElement,
  highlightItem: primitiveElement.value?.highlightItem,
  highlightFirstItem: primitiveElement.value?.highlightFirstItem,
  highlightSelected: primitiveElement.value?.highlightSelected,
});

provideComboboxRootContext({
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
  triggerElement,
  onTriggerElementChange: (val) => {
    triggerElement.value = val;
  },
  parentElement,
  resetSearchTermOnSelect,
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
      :highlight-on-hover="true"
      :by="props.by as any"
      @highlight="emits('highlight', $event as any)"
    >
      <slot
        :open="open"
        :model-value="modelValue"
      />
    </AListboxRoot>
  </APopperRoot>
</template>
