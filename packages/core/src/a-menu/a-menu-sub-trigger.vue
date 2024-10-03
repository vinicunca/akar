<script lang="ts">
import type { AMenuItemImplProps } from './a-menu-item-impl.vue';
import type { Side } from './utils';

export interface AMenuSubTriggerProps extends AMenuItemImplProps {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, nextTick, onUnmounted, ref, useId } from 'vue';

import AMenuAnchor from './a-menu-anchor.vue';
import { injectAMenuContentContext } from './a-menu-content-impl.vue';
import MenuItemImpl from './a-menu-item-impl.vue';
import { injectAMenuContext, injectAMenuRootContext } from './a-menu-root.vue';
import { injectAMenuSubContext } from './a-menu-sub.vue';
import { getOpenState, isMouseEvent, SUB_OPEN_KEYS } from './utils';

const props = defineProps<AMenuSubTriggerProps>();

const menuContext = injectAMenuContext();
const rootContext = injectAMenuRootContext();
const subContext = injectAMenuSubContext();
const contentContext = injectAMenuContentContext();

const openTimerRef = ref<null | number>(null);

subContext.triggerId ||= useId();

function clearOpenTimer() {
  if (openTimerRef.value) {
    window.clearTimeout(openTimerRef.value);
  }

  openTimerRef.value = null;
}

onUnmounted(() => {
  clearOpenTimer();
});

function handlePointerMove(event: PointerEvent) {
  if (!isMouseEvent(event)) {
    return;
  }

  const defaultPrevented = contentContext.onItemEnter(event);
  if (defaultPrevented) {
    return;
  }

  if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
    contentContext.onPointerGraceIntentChange(null);
    openTimerRef.value = window.setTimeout(() => {
      menuContext.onOpenChange(true);
      clearOpenTimer();
    }, 100);
  }
}

async function handlePointerLeave(event: PointerEvent) {
  if (!isMouseEvent(event)) {
    return;
  }

  clearOpenTimer();

  const contentRect = menuContext.content.value?.getBoundingClientRect();
  if (contentRect?.width) {
    // TODO (Radix UI): make sure to update this when we change positioning logic
    // https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L1088
    const side = menuContext.content.value?.dataset.side as Side;

    const rightSide = side === 'right';
    const bleed = rightSide ? -5 : +5;
    const contentNearEdge = contentRect[rightSide ? 'left' : 'right'];
    const contentFarEdge = contentRect[rightSide ? 'right' : 'left'];

    contentContext.onPointerGraceIntentChange({
      area: [
        // Apply a bleed on clientX to ensure that our exit point is
        // consistently within polygon bounds
        { x: event.clientX + bleed, y: event.clientY },
        { x: contentNearEdge, y: contentRect.top },
        { x: contentFarEdge, y: contentRect.top },
        { x: contentFarEdge, y: contentRect.bottom },
        { x: contentNearEdge, y: contentRect.bottom },
      ],
      side,
    });

    window.clearTimeout(contentContext.pointerGraceTimerRef.value);
    contentContext.pointerGraceTimerRef.value = window.setTimeout(
      () => contentContext.onPointerGraceIntentChange(null),
      300,
    );
  } else {
    const defaultPrevented = contentContext.onTriggerLeave(event);
    if (defaultPrevented) {
      return;
    }

    // There's 100ms where the user may leave an item before the submenu was opened.
    contentContext.onPointerGraceIntentChange(null);
  }
}

async function handleKeyDown(event: KeyboardEvent) {
  const isTypingAhead = contentContext.searchRef.value !== '';
  if (props.disabled || (isTypingAhead && event.key === ' ')) {
    return;
  }
  if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
    menuContext.onOpenChange(true);

    await nextTick();
    // The trigger may hold focus if opened via pointer interaction
    // so we ensure content is given focus again when switching to keyboard.
    menuContext.content.value?.focus();
    // prevent window from scrolling
    event.preventDefault();
  }
}

function refMenuItem(vnode: ComponentPublicInstance) {
  subContext?.onTriggerChange(vnode?.$el);

  return undefined;
}

function handleClick(event: Event) {
  if (props.disabled || event.defaultPrevented) {
    return;
  }
  /**
   * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
   * and we rely heavily on `onFocusOutside` for submenus to close when switching
   * between separate submenus.
   */
  (event.currentTarget as HTMLButtonElement)?.focus();

  if (!menuContext.open.value) {
    menuContext.onOpenChange(true);
  }
}
</script>

<template>
  <AMenuAnchor as-child>
    <MenuItemImpl
      v-bind="props"
      :id="subContext.triggerId"
      :ref="refMenuItem"
      aria-haspopup="menu"
      :aria-expanded="menuContext.open.value"
      :aria-controls="subContext.contentId"
      :data-state="getOpenState(menuContext.open.value)"
      @click="handleClick"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @keydown="handleKeyDown"
    >
      <slot />
    </MenuItemImpl>
  </AMenuAnchor>
</template>
