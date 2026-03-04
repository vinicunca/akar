<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface MenuItemImplProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br>
   *  Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useCollection } from '../collection';
import { APrimitive } from '../primitive';
import { getActiveElement, useForwardExpose } from '../shared';
import { injectMenuContentContext } from './menu-content-impl.vue';
import { isMouseEvent } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<MenuItemImplProps>();

const contentContext = injectMenuContentContext();
const { forwardRef, currentElement } = useForwardExpose();
const { ACollectionItem } = useCollection();

const isFocused = ref(false);
const isHighlighted = computed(() =>
  isFocused.value || (contentContext.highlightedElement.value === currentElement.value),
);

async function handlePointerMove(event: PointerEvent) {
  if (event.defaultPrevented) {
    return;
  }
  if (!isMouseEvent(event)) {
    return;
  }

  if (props.disabled) {
    contentContext.onItemLeave(event);
  } else {
    const defaultPrevented = contentContext.onItemEnter(event);
    if (!defaultPrevented) {
      const item = event.currentTarget as HTMLElement;
      contentContext.highlightedElement.value = item;
      const isInputFocused = ['INPUT', 'TEXTAREA'].includes(getActiveElement()?.tagName || '');

      if (!isInputFocused) {
        item.focus({ preventScroll: true });
      }
    }
  }
}

async function handlePointerLeave(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) {
    return;
  }
  if (!isMouseEvent(event)) {
    return;
  }

  contentContext.onItemLeave(event);
}

async function handleFocus(event: FocusEvent) {
  await nextTick();
  if (event.defaultPrevented || props.disabled) {
    return;
  }
  isFocused.value = true;
  contentContext.highlightedElement.value = event.currentTarget as HTMLElement;
}

async function handleBlur(event: FocusEvent) {
  await nextTick();
  if (event.defaultPrevented) {
    return;
  }
  isFocused.value = false;
}
</script>

<template>
  <ACollectionItem :value="{ textValue }">
    <APrimitive
      :ref="forwardRef"
      role="menuitem"
      tabindex="-1"
      v-bind="$attrs"
      :as="as"
      :as-child="asChild"
      data-akar-collection-item
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isHighlighted ? '' : undefined"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
