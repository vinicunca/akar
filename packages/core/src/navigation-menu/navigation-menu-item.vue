<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '../primitive';
import { useCollection } from '../collection';
import { createContext, getActiveElement, useArrowNavigation, useForwardExpose, useId } from '../shared';

export interface ANavigationMenuItemProps extends APrimitiveProps {
  /**
   * A unique value that associates the item with an active value when the navigation menu is controlled.
   *
   *  This prop is managed automatically when uncontrolled.
   */
  value?: string;
}

export type NavigationMenuItemContext = {
  value: string;
  contentId: string;
  triggerRef: Ref<HTMLElement | undefined>;
  focusProxyRef: Ref<HTMLElement | undefined>;
  wasEscapeCloseRef: Ref<boolean>;
  onEntryKeyDown: () => void;
  onFocusProxyEnter: (side: 'start' | 'end') => void;
  onContentFocusOutside: () => void;
  onRootContentClose: () => void;
};

export const [
  injectANavigationMenuItemContext,
  provideNavigationMenuItemContext,
] = createContext<NavigationMenuItemContext>('NavigationMenuItem');
</script>

<script setup lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';
import { ref } from 'vue';
import { APrimitive } from '../primitive';
import { injectANavigationMenuContext } from './navigation-menu-root.vue';
import {
  focusFirst,
  getTabbableCandidates,
  makeContentId,
  removeFromTabOrder,
} from './utils';

const props = withDefaults(
  defineProps<ANavigationMenuItemProps>(),
  {
    as: 'li',
  },
);

useForwardExpose();

const { getItems } = useCollection({ key: 'NavigationMenu' });

const context = injectANavigationMenuContext();

const value = useId(props.value);
const triggerRef = ref<HTMLElement>();
const focusProxyRef = ref<HTMLElement>();

const contentId = makeContentId(context.baseId, value);

let restoreContentTabOrderRef: () => void = () => ({});

const wasEscapeCloseRef = ref(false);
async function handleContentEntry(side = 'start') {
  const el = document.getElementById(contentId);
  if (el) {
    restoreContentTabOrderRef();
    const candidates = getTabbableCandidates(el);
    if (candidates.length) {
      focusFirst(side === 'start' ? candidates : candidates.reverse());
    }
  }
}

function handleContentExit() {
  const el = document.getElementById(contentId);
  if (el) {
    const candidates = getTabbableCandidates(el);
    if (candidates.length) {
      restoreContentTabOrderRef = removeFromTabOrder(candidates);
    }
  }
}

provideNavigationMenuItemContext({
  value,
  contentId,
  triggerRef,
  focusProxyRef,
  wasEscapeCloseRef,
  onEntryKeyDown: handleContentEntry,
  onFocusProxyEnter: handleContentEntry,
  onContentFocusOutside: handleContentExit,
  onRootContentClose: handleContentExit,
});

function handleClose() {
  context.onItemDismiss();
  triggerRef.value?.focus();
}

function handleKeydown(event: KeyboardEvent) {
  const currentFocus = getActiveElement() as HTMLElement;
  if (event.keyCode === 32 || event.key === KEY_CODES.ENTER) {
    if (context.modelValue.value === value) {
      handleClose();
      event.preventDefault();
      return;
    } else {
      (event.target as HTMLElement).click();
      event.preventDefault();
      return;
    }
  }

  const itemsArray = getItems().filter((i) =>
    i.ref.parentElement?.hasAttribute('data-menu-item'),
  ).map((i) => i.ref);

  // prevent triggering when the focus is on link
  if (!itemsArray.includes(currentFocus)) {
    return;
  }

  const newSelectedElement = useArrowNavigation({
    event,
    currentElement: currentFocus,
    options: {
      itemsArray,
      loop: false,
    },
  });

  if (newSelectedElement) {
    newSelectedElement?.focus();
  }

  event.preventDefault();
  event.stopPropagation();
}
</script>

<template>
  <APrimitive
    :as-child="asChild"
    :as="as"
    data-menu-item
    @keydown.up.down.left.right.home.end.space="handleKeydown"
  >
    <slot />
  </APrimitive>
</template>
