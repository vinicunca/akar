<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext, useDirection } from '~~/shared';

import type {
  Direction,
  Orientation,
} from './utils';

export interface ARovingFocusGroupProps extends APrimitiveProps {
  currentTabStopId?: null | string;
  defaultCurrentTabStopId?: string;
  /**
   * The direction of navigation between items.
   */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean;
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation;
  preventScrollOnEntryFocus?: boolean;
}

export type ARovingFocusGroupEmits = {
  'entryFocus': [event: Event];
  'update:currentTabStopId': [value: null | string | undefined];
};

interface ARovingContext {
  currentTabStopId: Ref<null | string | undefined>;
  dir: Ref<Direction>;
  loop: Ref<boolean>;
  onFocusableItemAdd: () => void;
  onFocusableItemRemove: () => void;
  onItemFocus: (tabStopId: string) => void;
  onItemShiftTab: () => void;
  orientation: Ref<Orientation | undefined>;
}

export const [
  injectARovingFocusGroupContext,
  provideARovingFocusGroupContext,
] = createContext<ARovingContext>('RovingFocusGroup');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { ref, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';

import { ENTRY_FOCUS, EVENT_OPTIONS, focusFirst } from './utils';

const props = withDefaults(
  defineProps<ARovingFocusGroupProps>(),
  {
    loop: false,
    orientation: undefined,
    preventScrollOnEntryFocus: false,
  },
);

const emits = defineEmits<ARovingFocusGroupEmits>();

const { loop, orientation, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const currentTabStopId = useVModel(
  props,
  'currentTabStopId',
  emits,
  {
    defaultValue: props.defaultCurrentTabStopId,
    passive: (props.currentTabStopId === undefined) as false,
  },
);
const isTabbingBackOut = ref(false);
const isClickFocus = ref(false);
const focusableItemsCount = ref(0);

const { getItems, ACollectionSlot } = useCollection({ isProvider: true });

function handleFocus(event: FocusEvent) {
  /**
   * We normally wouldn't need this check, because we already check
   * that the focus is on the current target and not bubbling to it.
   * We do this because Safari doesn't focus buttons when clicked, and
   * instead, the wrapper will get focused and not through a bubbling event.
   */
  const isKeyboardFocus = !isClickFocus.value;

  if (
    event.currentTarget
    && event.target === event.currentTarget
    && isKeyboardFocus
    && !isTabbingBackOut.value
  ) {
    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
    event.currentTarget.dispatchEvent(entryFocusEvent);
    emits('entryFocus', entryFocusEvent);

    if (!entryFocusEvent.defaultPrevented) {
      const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== '');
      const activeItem = items.find((item) => item.getAttribute('data-active') === 'true');
      const currentItem = items.find(
        (item) => item.id === currentTabStopId.value,
      );
      const candidateItems = [activeItem, currentItem, ...items].filter(
        Boolean,
      ) as typeof items;

      focusFirst({
        candidates: candidateItems,
        preventScroll: props.preventScrollOnEntryFocus,
      });
    }
  }

  isClickFocus.value = false;
}

function handleMouseUp() {
  // reset `isClickFocus` after 1 tick because handleFocus might not triggered due to focused element
  setTimeout(() => {
    isClickFocus.value = false;
  }, 1);
}

defineExpose({
  getItems,
});

provideARovingFocusGroupContext({
  loop,
  dir,
  orientation,
  currentTabStopId,
  onItemFocus: (tabStopId) => {
    currentTabStopId.value = tabStopId;
  },
  onItemShiftTab: () => {
    isTabbingBackOut.value = true;
  },
  onFocusableItemAdd: () => {
    focusableItemsCount.value++;
  },
  onFocusableItemRemove: () => {
    focusableItemsCount.value--;
  },
});
</script>

<template>
  <ACollectionSlot>
    <APrimitive
      :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
      :data-orientation="orientation"
      :as="as"
      :as-child="asChild"
      :dir="dir"
      style="outline: none"
      @mousedown="isClickFocus = true"
      @mouseup="handleMouseUp"
      @focus="handleFocus"
      @blur="isTabbingBackOut = false"
    >
      <slot />
    </APrimitive>
  </ACollectionSlot>
</template>
