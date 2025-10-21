<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { KEY_CODES } from '@vinicunca/perkakas';
import { refAutoReset } from '@vueuse/shared';
import { APrimitive } from '~~/primitive';
import { injectAListboxRootContext } from './listbox-root.vue';

export interface AListboxContentProps extends APrimitiveProps { }
</script>

<script setup lang="ts">
import { useCollection } from '~~/collection';

defineProps<AListboxContentProps>();

const { ACollectionSlot } = useCollection();
const rootContext = injectAListboxRootContext();

const isClickFocus = refAutoReset(false, 10);

function handleFocus(event: FocusEvent) {
  if (isClickFocus.value) {
    return;
  }

  rootContext.onEnter(event);
}

function handleKeydown(event: KeyboardEvent) {
  if (
    // when orientation is vertical, ignore left/right
    (
      rootContext.orientation.value === 'vertical'
      && (event.key === KEY_CODES.ARROW_LEFT || event.key === KEY_CODES.ARROW_RIGHT)
    )
    // when orientation is horizontal, ignore up/down
    || (
      rootContext.orientation.value === 'horizontal'
      && (event.key === KEY_CODES.ARROW_UP || event.key === KEY_CODES.ARROW_DOWN)
    )
  ) {
    return;
  }

  event.preventDefault();

  if (rootContext.focusable.value) {
    rootContext.onKeydownNavigation(event);
  }
}
</script>

<template>
  <ACollectionSlot>
    <APrimitive
      role="listbox"
      :as="as"
      :as-child="asChild"
      :tabindex="rootContext.focusable.value
        ? rootContext.highlightedElement.value
          ? '-1'
          : '0'
        : '-1'"
      :aria-orientation="rootContext.orientation.value"
      :aria-multiselectable="!!rootContext.multiple.value"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="isClickFocus = true"
      @focus="handleFocus"
      @keydown.down.up.left.right.home.end="handleKeydown"
      @keydown.enter="rootContext.onKeydownEnter"
      @keydown="rootContext.onKeydownTypeAhead"
    >
      <slot />
    </APrimitive>
  </ACollectionSlot>
</template>
