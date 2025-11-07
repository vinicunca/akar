<script lang="ts">
import type { MenuItemImplProps } from './menu-item-impl.vue';
import { useForwardExpose } from '../shared';

export type AMenuItemEmits = {
  /**
   * Event handler called when the user selects an item (via mouse or keyboard). <br>
   *  Calling `event.preventDefault` in this handler will prevent the menu from closing when selecting that item.
   */
  select: [event: Event];
};

export interface AMenuItemProps extends MenuItemImplProps {}
</script>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { injectMenuContentContext } from './menu-content-impl.vue';
import MenuItemImpl from './menu-item-impl.vue';
import { injectAMenuRootContext } from './menu-root.vue';
import { ITEM_SELECT, SELECTION_KEYS } from './utils';

const props = defineProps<AMenuItemProps>();
const emits = defineEmits<AMenuItemEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectAMenuRootContext();
const contentContext = injectMenuContentContext();

const isPointerDownRef = ref(false);

async function handleSelect() {
  const menuItem = currentElement.value;
  if (!props.disabled && menuItem) {
    const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
      bubbles: true,
      cancelable: true,
    });
    emits('select', itemSelectEvent);
    // let select event finish
    await nextTick();
    if (itemSelectEvent.defaultPrevented) {
      isPointerDownRef.value = false;
    } else {
      rootContext.onClose();
    }
  }
}

async function handlePointerUp(event: MouseEvent) {
  await nextTick();

  if (event.defaultPrevented) {
    return;
  }

  // Pointer down can move to a different menu item which should activate it on pointer up.
  // We dispatch a click for selection to allow composition with click based triggers and to
  // prevent Firefox from getting stuck in text selection mode when the menu closes.
  if (!isPointerDownRef.value) {
    (event.currentTarget as HTMLElement)?.click();
  }
}

async function handleKeyDown(event: KeyboardEvent) {
  const isTypingAhead = contentContext.searchRef.value !== '';

  if (props.disabled || (isTypingAhead && event.key === ' ')) {
    return;
  }

  if (SELECTION_KEYS.includes(event.key)) {
    (event.currentTarget as HTMLElement).click();
    /**
     * We prevent default browser behavior for selection keys as they should trigger
     * a selection only:
     * - prevents space from scrolling the page.
     * - if keydown causes focus to move, prevents keydown from firing on the new target.
     */
    event.preventDefault();
  }
}
</script>

<template>
  <MenuItemImpl
    v-bind="props"
    :ref="forwardRef"
    @click="handleSelect"
    @pointerdown="
      () => {
        isPointerDownRef = true;
      }
    "
    @pointerup="handlePointerUp"
    @keydown="handleKeyDown"
  >
    <slot />
  </MenuItemImpl>
</template>
