<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { KEY_CODES } from '@vinicunca/perkakas';
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

export interface ANavigationMenuTriggerProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { refAutoReset, unrefElement } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import { APrimitive } from '~~/primitive';
import { AVisuallyHidden } from '~~/visually-hidden';
import { injectANavigationMenuItemContext } from './navigation-menu-item.vue';
import { injectANavigationMenuContext } from './navigation-menu-root.vue';
import { getOpenState, makeContentId, makeTriggerId } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ANavigationMenuTriggerProps>(),
  {
    as: 'button',
  },
);

const menuContext = injectANavigationMenuContext();
const itemContext = injectANavigationMenuItemContext();

const { ACollectionItem } = useCollection({ key: 'NavigationMenu' });
const { forwardRef, currentElement: triggerElement } = useForwardExpose();
const triggerId = ref('');
const contentId = ref('');

const hasPointerMoveOpenedRef = refAutoReset(false, 300);
const wasClickCloseRef = ref(false);

const open = computed(() => itemContext.value === menuContext.modelValue.value);

onMounted(() => {
  itemContext.triggerRef = triggerElement;
  triggerId.value = makeTriggerId(menuContext.baseId, itemContext.value);
  contentId.value = makeContentId(menuContext.baseId, itemContext.value);
});

function handlePointerEnter() {
  if (menuContext.disableHoverTrigger.value) {
    return;
  }

  wasClickCloseRef.value = false;
  itemContext.wasEscapeCloseRef.value = false;
}

function handlePointerMove(event: PointerEvent) {
  if (menuContext.disableHoverTrigger.value) {
    return;
  }

  if (event.pointerType === 'mouse') {
    if (
      props.disabled
      || wasClickCloseRef.value
      || itemContext.wasEscapeCloseRef.value
      || hasPointerMoveOpenedRef.value
    ) {
      return;
    }

    menuContext.onTriggerEnter(itemContext.value);
    hasPointerMoveOpenedRef.value = true;
  }
}

function handlePointerLeave(event: PointerEvent) {
  if (menuContext.disableHoverTrigger.value) {
    return;
  }

  if (event.pointerType === 'mouse') {
    if (props.disabled) {
      return;
    }
    menuContext.onTriggerLeave();
    hasPointerMoveOpenedRef.value = false;
  }
}

function handleClick(event: PointerEvent) {
  if (event.pointerType === 'mouse' && menuContext.disableClickTrigger.value) {
    return;
  }

  // if open via pointermove, we prevent click event
  if (hasPointerMoveOpenedRef.value) {
    return;
  }

  if (open.value) {
    menuContext.onItemSelect('');
  } else {
    menuContext.onItemSelect(itemContext.value);
  }

  wasClickCloseRef.value = open.value;
}

function handleKeydown(event: KeyboardEvent) {
  const verticalEntryKey = menuContext.dir.value === 'rtl' ? KEY_CODES.ARROW_LEFT : KEY_CODES.ARROW_RIGHT;
  const entryKey = { horizontal: KEY_CODES.ARROW_DOWN, vertical: verticalEntryKey }[
    menuContext.orientation
  ];
  if (open.value && event.key === entryKey) {
    itemContext.onEntryKeyDown();
    // Prevent FocusGroupItem from handling the event
    event.preventDefault();
    event.stopPropagation();
  }
}

function setFocusProxyRef(node: unknown) {
  // @ts-expect-error unrefElement expect MaybeRef, but also support Vnode
  itemContext.focusProxyRef.value = unrefElement(node);
  return undefined;
}

function handleVisuallyHiddenFocus(event: FocusEvent) {
  const content = document.getElementById(itemContext.contentId);
  const prevFocusedElement = event.relatedTarget as HTMLElement | null;

  const wasTriggerFocused = prevFocusedElement === triggerElement.value;
  const wasFocusFromContent = content?.contains(prevFocusedElement);

  if (wasTriggerFocused || !wasFocusFromContent) {
    itemContext.onFocusProxyEnter(wasTriggerFocused ? 'start' : 'end');
  }
}
</script>

<template>
  <ACollectionItem>
    <APrimitive
      :id="triggerId"
      :ref="forwardRef"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-state="getOpenState(open)"
      data-navigation-menu-trigger
      :aria-expanded="open"
      :aria-controls="contentId"
      :as-child="props.asChild"
      :as="as"
      v-bind="$attrs"
      @pointerenter="handlePointerEnter"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>

  <template v-if="open">
    <AVisuallyHidden
      :ref="setFocusProxyRef"
      aria-hidden="true"
      :tabindex="0"
      @focus="handleVisuallyHiddenFocus"
    />
    <span
      v-if="menuContext.viewport"
      :aria-owns="contentId"
    />
  </template>
</template>
