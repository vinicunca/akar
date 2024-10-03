<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AMenuItemImplProps extends APrimitiveProps {
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
import { nextTick, ref } from 'vue';

import {
  APrimitive,
} from '~~/a-primitive';
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

import { injectAMenuContentContext } from './a-menu-content-impl.vue';
import { isMouseEvent } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<AMenuItemImplProps>();

const contentContext = injectAMenuContentContext();
const { forwardRef } = useForwardExpose();
const { ACollectionItem } = useCollection();

const isFocused = ref(false);

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
      const item = event.currentTarget;
      (item as HTMLElement)?.focus({ preventScroll: true });
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

async function handleFocus(event: Event) {
  await nextTick();

  if (event.defaultPrevented || props.disabled) {
    return;
  }

  isFocused.value = true;
}

async function handleBlur(event: Event) {
  await nextTick();

  if (event.defaultPrevented) {
    return;
  }

  isFocused.value = false;
}
</script>

<template>
  <ACollectionItem>
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
      :data-highlighted="isFocused ? '' : undefined"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
