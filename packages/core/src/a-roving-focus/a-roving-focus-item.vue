<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ARovingFocusItemProps extends APrimitiveProps {
  active?: boolean;
  allowShiftKey?: boolean;
  focusable?: boolean;
  tabStopId?: string;
}
</script>

<script setup lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';
import { computed, nextTick, onMounted, onUnmounted } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { useCollection } from '~~/collection';
import { useId } from '~~/shared';
import { wrapArray } from '~~/shared';

import { injectARovingFocusGroupContext } from './a-roving-focus-group.vue';
import { focusFirst, getFocusIntent } from './utils';

const props = withDefaults(
  defineProps<ARovingFocusItemProps>(),
  {
    focusable: true,
    active: true,
    as: 'span',
  },
);

const context = injectARovingFocusGroupContext();
const id = computed(() => props.tabStopId || useId());
const isCurrentTabStop = computed(
  () => context.currentTabStopId.value === id.value,
);

const { getItems, ACollectionItem } = useCollection();

const { primitiveElement, currentElement } = usePrimitiveElement();
const rootNode = computed(() => currentElement.value?.getRootNode() as Document | ShadowRoot);

onMounted(() => {
  if (props.focusable) {
    context.onFocusableItemAdd();
  }
});

onUnmounted(() => {
  if (props.focusable) {
    context.onFocusableItemRemove();
  }
});

function handleKeydown(event: KeyboardEvent) {
  if (event.key === KEY_CODES.TAB && event.shiftKey) {
    context.onItemShiftTab();
    return;
  }

  if (event.target !== event.currentTarget) {
    return;
  }

  const focusIntent = getFocusIntent({
    event,
    dir: context.dir.value,
    orientation: context.orientation.value,
  });

  if (focusIntent !== undefined) {
    if (
      event.metaKey
      || event.ctrlKey
      || event.altKey
      || (props.allowShiftKey ? false : event.shiftKey)
    ) {
      return;
    }

    event.preventDefault();
    let candidateNodes = [
      ...getItems()
        .map((i) => i.ref)
        .filter((i) => i.dataset.disabled !== ''),
    ];

    if (focusIntent === 'last') {
      candidateNodes.reverse();
    } else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev') {
        candidateNodes.reverse();
      }

      const currentIndex = candidateNodes.indexOf(
        event.currentTarget as HTMLElement,
      );

      candidateNodes = context.loop.value
        ? wrapArray({
          array: candidateNodes,
          startIndex: currentIndex + 1,
        })
        : candidateNodes.slice(currentIndex + 1);
    }

    nextTick(() => focusFirst({
      candidates: candidateNodes,
      preventScroll: false,
      rootNode: rootNode.value,
    }));
  }
}

function handleMouseDown(event: MouseEvent) {
  /**
   * We prevent focusing non-focusable items on `mousedown`.
   * Even though the item has tabIndex={-1}, that only means take it out of the tab order.
   */
  if (!props.focusable) {
    event.preventDefault();
  } else {
    // Safari doesn't focus a button when clicked so we run our logic on mousedown also
    context.onItemFocus(id.value);
  }
}
</script>

<template>
  <ACollectionItem>
    <APrimitive
      ref="primitiveElement"
      :tabindex="isCurrentTabStop ? 0 : -1"
      :data-orientation="context.orientation.value"
      :data-active="active"
      :data-disabled="!focusable ? '' : undefined"
      :as="as"
      :as-child="asChild"
      @mousedown="handleMouseDown"
      @focus="context.onItemFocus(id)"
      @keydown="handleKeydown"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
