<script lang="ts">
export interface ATreeItemProps<T> extends APrimitiveProps {
  /** Value given to this item */
  value: T;
  /** Level of depth */
  level: number;
}

export type SelectEvent<T> = CustomEvent<{ originalEvent: KeyboardEvent | PointerEvent; value?: T; isExpanded: boolean; isSelected: boolean }>;
export type ToggleEvent<T> = CustomEvent<{ originalEvent: KeyboardEvent | PointerEvent; value?: T; isExpanded: boolean; isSelected: boolean }>;

export type ATreeItemEmits<T> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  toggle: [event: ToggleEvent<T>];
};

const TREE_SELECT = 'tree.select';
const TREE_TOGGLE = 'tree.toggle';
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { APrimitiveProps } from '../primitive';
import { computed } from 'vue';
import { useCollection } from '../collection';
import { APrimitive } from '../primitive';
import { ARovingFocusItem } from '../roving-focus';
import { getActiveElement, handleAndDispatchCustomEvent } from '../shared';
import { injectATreeRootContext } from './tree-root.vue';
import { flatten } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ATreeItemProps<T>>(),
  {
    as: 'li',
  },
);

const emits = defineEmits<ATreeItemEmits<T>>();

defineSlots<{
  default?: (props: {
    isExpanded: boolean;
    isSelected: boolean;
    isIndeterminate: boolean | undefined;
    handleToggle: () => void;
    handleSelect: () => void;
  }) => any;
}>();
const rootContext = injectATreeRootContext();
const { getItems } = useCollection();

const hasChildren = computed(() => !!rootContext.getChildren(props.value));

const isExpanded = computed(() => {
  const key = rootContext.getKey(props.value);
  return rootContext.expanded.value.includes(key);
});

const isSelected = computed(() => {
  const key = rootContext.getKey(props.value);
  return rootContext.selectedKeys.value.includes(key);
});

const isIndeterminate = computed(() => {
  if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
    const children = flatten<T, any>(rootContext.getChildren(props.value) || []);

    return children.some((child) => rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child)))
      && !children.every((child) => rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child)));
  } else if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
    const children = flatten<T, any>(rootContext.getChildren(props.value) || []);

    return !children.every((child) => rootContext.modelValue.value.find((v: any) => rootContext.getKey(v) === rootContext.getKey(child)));
  } else {
    return undefined;
  }
});

function handleKeydownRight(event: KeyboardEvent) {
  if (!hasChildren.value) {
    return;
  }

  if (isExpanded.value) {
    // go to first child
    const collection = getItems().map((i) => i.ref);
    const currentElement = getActiveElement() as HTMLElement;
    const currentIndex = collection.indexOf(currentElement);
    const list = [...collection].slice(currentIndex);
    const nextElement = list.find((el) => Number(el.getAttribute('data-indent')) === (props.level + 1));

    if (nextElement) {
      nextElement.focus();
    }
  } else {
    //  open expanded
    handleToggleCustomEvent(event);
  }
}

function handleKeydownLeft(event: KeyboardEvent) {
  if (isExpanded.value) {
    //  close expanded
    handleToggleCustomEvent(event);
  } else {
    // go back to parent
    const collection = getItems().map((i) => i.ref);
    const currentElement = getActiveElement() as HTMLElement;
    const currentIndex = collection.indexOf(currentElement);
    const list = [...collection].slice(0, currentIndex).reverse();
    const parentElement = list.find((el) => Number(el.getAttribute('data-indent')) === (props.level - 1));

    if (parentElement) {
      parentElement.focus();
    }
  }
}

async function handleSelect(event: SelectEvent<T>) {
  emits('select', event);
  if (event?.defaultPrevented) {
    return;
  }

  rootContext.onSelect(props.value);
}
async function handleToggle(event: ToggleEvent<T>) {
  emits('toggle', event);
  if (event?.defaultPrevented) {
    return;
  }

  rootContext.onToggle(props.value);
}

async function handleSelectCustomEvent(event?: KeyboardEvent | PointerEvent) {
  if (!event) {
    return;
  }

  const eventDetail = { originalEvent: event, value: props.value, isExpanded: isExpanded.value, isSelected: isSelected.value };
  handleAndDispatchCustomEvent({
    name: TREE_SELECT,
    handler: handleSelect,
    detail: eventDetail,
  });
}

async function handleToggleCustomEvent(event?: KeyboardEvent | PointerEvent) {
  if (!event) {
    return;
  }

  const eventDetail = { originalEvent: event, value: props.value, isExpanded: isExpanded.value, isSelected: isSelected.value };
  handleAndDispatchCustomEvent({
    name: TREE_TOGGLE,
    handler: handleToggle,
    detail: eventDetail,
  });
}

defineExpose({
  isExpanded,
  isSelected,
  isIndeterminate,
  handleToggle: () => rootContext.onToggle(props.value),
  handleSelect: () => rootContext.onSelect(props.value),
});
</script>

<template>
  <ARovingFocusItem
    as-child
    :value="value"
    allow-shift-key
  >
    <APrimitive
      v-bind="$attrs"
      role="treeitem"
      :as="as"
      :as-child="asChild"
      :aria-selected="isSelected"
      :aria-expanded="hasChildren ? isExpanded : undefined"
      :aria-level="level"
      :data-indent="level"
      :data-selected="isSelected ? '' : undefined"
      :data-expanded="isExpanded ? '' : undefined"
      @keydown.enter.space.self.prevent="handleSelectCustomEvent"
      @keydown.right.prevent="(event: KeyboardEvent) => rootContext.dir.value === 'ltr' ? handleKeydownRight(event) : handleKeydownLeft(event)"
      @keydown.left.prevent="(event: KeyboardEvent) => rootContext.dir.value === 'ltr' ? handleKeydownLeft(event) : handleKeydownRight(event)"
      @click.stop="(event: KeyboardEvent | PointerEvent) => {
        handleSelectCustomEvent(event)
        handleToggleCustomEvent(event)
      }"
    >
      <slot
        :is-expanded="isExpanded"
        :is-selected="isSelected"
        :is-indeterminate="isIndeterminate"
        :handle-select="() => rootContext.onSelect(value)"
        :handle-toggle="() => rootContext.onToggle(value)"
      />
    </APrimitive>
  </ARovingFocusItem>
</template>
