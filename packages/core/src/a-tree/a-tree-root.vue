<script lang="ts">
import type { Ref } from 'vue';

import type { Direction } from '~~/shared/types';

import { createContext } from '~~/shared';

export interface ATreeRootProps<T = Record<string, any>, U extends Record<string, any> = Record<string, any>> extends APrimitiveProps {
  /** The value of the expanded tree when initially rendered. Use when you do not need to control the state of the expanded tree */
  defaultExpanded?: Array<string>;
  /** The value of the tree when initially rendered. Use when you do not need to control the state of the tree */
  defaultValue?: Array<U> | U;
  /** The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with tree  */
  disabled?: boolean;
  /** The controlled value of the expanded item. Can be binded-with with `v-model`. */
  expanded?: Array<string>;
  /** This function is passed the index of each item and should return a list of children for that item */
  getChildren?: (val: T) => Array<T> | undefined;
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey: (val: T) => string;
  /** List of items */
  items?: Array<T>;
  /** The controlled value of the tree. Can be binded-with with `v-model`. */
  modelValue?: Array<U> | U;
  /** Whether multiple options can be selected or not.  */
  multiple?: boolean;
  /** When `true`, selecting parent will select the descendants. */
  propagateSelect?: boolean;
  /** How multiple selection should behave in the collection. */
  selectionBehavior?: 'replace' | 'toggle';
}

export type ATreeRootEmits<T = Record<string, any>> = {
  'update:expanded': [val: Array<string>];
  'update:modelValue': [val: T];
};

interface ATreeRootContext<T = Record<string, any>> {
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  expanded: Ref<Array<string>>;
  expandedItems: Ref<Array<T>>;
  getChildren: (val: T) => Array<T> | undefined;
  getKey: (val: T) => string;
  handleMultipleReplace: ReturnType<typeof useSelectionBehavior>['handleMultipleReplace'];
  isVirtual: Ref<boolean>;
  items: Ref<Array<T>>;
  modelValue: Ref<Array<T> | T>;
  multiple: Ref<boolean>;
  onSelect: (val: T) => void;
  onToggle: (val: T) => void;
  propagateSelect: Ref<boolean>;
  selectedKeys: Ref<Array<string>>;

  virtualKeydownHook: EventHook<KeyboardEvent>;
}

export type ATreeFlattenedItem<T> = {
  _id: string;
  bind: {
    [key: string]: any;
    level: number;
    value: T;
  };
  hasChildren: boolean;
  index: number;
  level: number;
  parentItem?: T;
  value: T;
};

export const [
  injectATreeRootContext,
  provideATreeRootContext,
] = createContext<ATreeRootContext<any>>('ATreeRoot');
</script>

<script setup lang="ts" generic="T extends Record<string, any>, U extends Record<string, any>">
import { createEventHook, type EventHook, useVModel } from '@vueuse/core';
import { computed, nextTick, ref, toRefs } from 'vue';

import { APrimitive, type APrimitiveProps } from '~~/a-primitive';
import { ARovingFocusGroup } from '~~/a-roving-focus';
import { MAP_KEY_TO_FOCUS_INTENT } from '~~/a-roving-focus/utils';
import { useDirection, useSelectionBehavior, useTypeahead } from '~~/shared';

import { flatten } from './utils';

const props = withDefaults(
  defineProps<ATreeRootProps<T, U>>(),
  {
    as: 'ul',
    selectionBehavior: 'toggle',
    getChildren: (val: T) => val.children,
  },
);

const emits = defineEmits<ATreeRootEmits<U>>();

defineSlots<{
  default: (props: {
    expanded: typeof expanded.value;
    flattenItems: Array<ATreeFlattenedItem<T>>;
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { items, multiple, disabled, propagateSelect, dir: propDir } = toRefs(props);
const { handleTypeaheadSearch } = useTypeahead();
const dir = useDirection(propDir);
const rovingFocusGroupRef = ref<InstanceType<typeof ARovingFocusGroup>>();

// Virtualizer
const isVirtual = ref(false);
const virtualKeydownHook = createEventHook<KeyboardEvent>();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
  // @ts-expect-error idk
    defaultValue: props.defaultValue ?? (multiple.value ? [] : undefined),
    passive: (props.modelValue === undefined) as false,
    deep: true,
  },
) as Ref<Array<U> | U>;

const expanded = useVModel(
  props,
  'expanded',
  emits,
  {
  // @ts-expect-error idk
    defaultValue: props.defaultExpanded ?? [],
    passive: (props.expanded === undefined) as false,
    deep: true,
  },
) as Ref<Array<string>>;

const { onSelectItem, handleMultipleReplace } = useSelectionBehavior({ modelValue, props });

const selectedKeys = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value)) {
    return modelValue.value.map((i) => props.getKey(i as any));
  } else {
    return [props.getKey(modelValue.value as any ?? {})];
  }
});

function flattenItems(
  { items, level = 1, parentItem }:
  { items: Array<T>; level?: number; parentItem?: T },
): Array<ATreeFlattenedItem<T>> {
  return items.reduce((acc: Array<ATreeFlattenedItem<T>>, item: T, index: number) => {
    const key = props.getKey(item);
    const children = props.getChildren(item);
    const isExpanded = expanded.value.includes(key);

    const flattenedItem: ATreeFlattenedItem<T> = {
      _id: key,
      value: item,
      index,
      level,
      parentItem,
      hasChildren: !!children,
      bind: {
        'value': item,
        level,
        'aria-setsize': items.length,
        'aria-posinset': index + 1,
      },
    };
    acc.push(flattenedItem);

    if (children && isExpanded) {
      acc.push(...flattenItems({
        items: children,
        level: level + 1,
        parentItem: item,
      }));
    }

    return acc;
  }, []);
}

const expandedItems = computed(() => {
  const items = props.items;
  const expandedKeys = expanded.value.map((i) => i);

  return flattenItems({ items: items ?? [] });
});

function handleKeydown(event: KeyboardEvent) {
  if (isVirtual.value) {
    virtualKeydownHook.trigger(event);
  } else {
    const collections = rovingFocusGroupRef.value?.getItems().map((i) => i.ref);
    handleTypeaheadSearch({ key: event.key, fallback: collections });
  }
}

function handleKeydownNavigation(event: KeyboardEvent) {
  if (isVirtual.value) {
    return;
  }

  const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];

  nextTick(() => {
    handleMultipleReplace({
      intent,
      currentElement: document.activeElement,
      getItems: rovingFocusGroupRef.value!.getItems!,
      options: expandedItems.value.map((i) => i.value),
    });
  });
}

provideATreeRootContext({
  modelValue,
  selectedKeys,
  onSelect: (val) => {
    function condition(baseValue: U) {
      return props.getKey(baseValue as any ?? {}) === props.getKey(val);
    }

    const exist = props.multiple
      && Array.isArray(modelValue.value)
      ? modelValue.value?.findIndex(condition) !== -1
      : undefined;

    onSelectItem({ val, condition });

    if (
      props.propagateSelect
      && props.multiple
      && Array.isArray(modelValue.value)
    ) {
      const children = flatten<U, any>(props.getChildren(val) ?? []);

      if (exist) {
        // remove all child
        modelValue.value = [...modelValue.value]
          .filter((i) => !children.some((child) => props.getKey(i as any ?? {}) === props.getKey(child as any)));
      } else {
        // select all child
        modelValue.value = [...modelValue.value, ...children];
      }
    }
  },
  expanded,
  onToggle(val) {
    const children = val ? props.getChildren(val) : undefined;

    if (!children) {
      return;
    }

    const key = props.getKey(val) ?? val;
    if (expanded.value.includes(key)) {
      expanded.value = expanded.value.filter((val) => val !== key);
    } else {
      expanded.value.push(key);
    }
  },
  getKey: props.getKey,
  getChildren: props.getChildren,
  items,
  expandedItems,
  disabled,
  multiple,
  dir,
  propagateSelect,

  isVirtual,
  virtualKeydownHook,
  handleMultipleReplace,
});
</script>

<template>
  <ARovingFocusGroup
    ref="rovingFocusGroupRef"
    as-child
    orientation="vertical"
    :dir="dir"
  >
    <APrimitive
      role="tree"
      :as="as"
      :as-child="asChild"
      :aria-multiselectable="multiple ? true : undefined"
      @keydown="handleKeydown"
      @keydown.up.down.shift="handleKeydownNavigation"
    >
      <slot
        :flatten-items="expandedItems"
        :model-value="modelValue"
        :expanded="expanded"
      />
    </APrimitive>
  </ARovingFocusGroup>
</template>
