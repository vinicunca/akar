<script lang="ts">
import type {
  ComponentPublicInstance,
  Ref,
} from 'vue';

import type { PointerDownOutsideEvent } from '~~/a-dismissable-layer';
import type { APopperContentProps } from '~~/a-popper';
import type { AcceptableValue } from '~~/shared/types';

import { createContext } from '~~/shared';

export interface ASelectContentContext {
  content?: Ref<HTMLElement | undefined>;
  focusSelectedItem?: () => void;
  isPositioned?: Ref<boolean>;
  itemRefCallback: (params: {
    disabled: boolean;
    node?: HTMLElement;
    value: AcceptableValue;
  }) => void;
  itemTextRefCallback: (params: {
    disabled: boolean;
    node?: HTMLElement;
    value: AcceptableValue;
  }) => void;
  onItemLeave?: () => void;
  onViewportChange: (node?: HTMLElement) => void;
  position?: 'item-aligned' | 'popper';
  searchRef?: Ref<string>;
  selectedItem?: Ref<HTMLElement | undefined>;
  selectedItemText?: Ref<HTMLElement | undefined>;
  viewport?: Ref<HTMLElement | undefined>;
}

export const ASelectContentDefaultContextValue: ASelectContentContext = {
  onViewportChange: () => {},
  itemTextRefCallback: () => {},
  itemRefCallback: () => {},
};

export type ASelectContentImplEmits = {
  closeAutoFocus: [event: Event];
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeyDown: [event: KeyboardEvent];
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `ADismissableLayer`.
   * Can be prevented.
   */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

export interface ASelectContentImplProps extends APopperContentProps {
  /**
   * The document.body will be lock, and scrolling will be disabled.
   *
   * @defaultValue true
   */
  bodyLock?: boolean;
  /**
   *  The positioning mode to use
   *
   *  `item-aligned (default)` - behaves similarly to a native MacOS menu by positioning content relative to the active item. <br>
   *  `popper` - positions content in the same way as our other primitives, for example `Popover` or `DropdownMenu`.
   */
  position?: 'item-aligned' | 'popper';
}

export const [
  injectASelectContentContext,
  provideASelectContentContext,
] = createContext<ASelectContentContext>('ASelectContent');
</script>

<script setup lang="ts">
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';
import { unrefElement } from '@vueuse/core';
import {
  computed,
  ref,
  watch,
  watchEffect,
} from 'vue';

import { ADismissableLayer } from '~~/a-dismissable-layer';
import { AFocusScope } from '~~/a-focus-scope';
import { focusFirst } from '~~/a-menu/utils';
import { useCollection } from '~~/collection';
import {
  useFocusGuards,
  useForwardProps,
  useHideOthers,
  useTypeahead,
} from '~~/shared';
import { useBodyScrollLock } from '~~/shared/use-body-scroll-lock';

import ASelectItemAlignedPosition from './a-select-item-aligned-position.vue';
import ASelectPopperPosition from './a-select-popper-position.vue';
import { injectASelectRootContext } from './a-select-root.vue';
import { valueComparator } from './utils';

const props = withDefaults(
  defineProps<ASelectContentImplProps>(),
  {
    align: 'start',
    position: 'item-aligned',
    bodyLock: true,
  },
);

const emits = defineEmits<ASelectContentImplEmits>();

const rootContext = injectASelectRootContext();

useFocusGuards();
useBodyScrollLock(props.bodyLock);

const { ACollectionSlot, getItems } = useCollection();

const content = ref<HTMLElement>();

useHideOthers(content);

const { search, handleTypeaheadSearch } = useTypeahead();

const viewport = ref<HTMLElement>();
const selectedItem = ref<HTMLElement>();
const selectedItemText = ref<HTMLElement>();
const isPositioned = ref(false);
const firstValidItemFoundRef = ref(false);

function focusSelectedItem() {
  if (selectedItem.value && content.value) {
    focusFirst([selectedItem.value, content.value]);
  }
}

watch(isPositioned, () => {
  focusSelectedItem();
});

// prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
// and close on `pointerup` outside.
const { onOpenChange, triggerPointerDownPosRef } = rootContext;

watchEffect((cleanupFn) => {
  if (!content.value) {
    return;
  }

  let pointerMoveDelta = { x: 0, y: 0 };

  function handlePointerMove(event: PointerEvent) {
    pointerMoveDelta = {
      x: Math.abs(
        Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0),
      ),
      y: Math.abs(
        Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0),
      ),
    };
  };

  function handlePointerUp(event: PointerEvent) {
    // Prevent options from being untappable on touch devices
    if (event.pointerType === 'touch') {
      return;
    }

    // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
    if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
      event.preventDefault();
    } else {
      // otherwise, if the event was outside the content, close.
      if (!content.value?.contains(event.target as HTMLElement)) {
        onOpenChange(false);
      }
    }

    document.removeEventListener('pointermove', handlePointerMove);
    triggerPointerDownPosRef.value = null;
  };

  if (triggerPointerDownPosRef.value !== null) {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp, {
      capture: true,
      once: true,
    });
  }

  cleanupFn(() => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp, {
      capture: true,
    });
  });
});

function handleKeyDown(event: KeyboardEvent) {
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

  // select should not be navigated using tab key so we prevent it
  if (event.key === KEY_CODES.TAB) {
    event.preventDefault();
  }

  const collectionItems = getItems().map((i) => i.ref);
  if (!isModifierKey && event.key.length === 1) {
    handleTypeaheadSearch({ key: event.key, fallback: collectionItems });
  }

  if (
    isIncludedIn(event.key, [
      KEY_CODES.ARROW_DOWN,
      KEY_CODES.ARROW_UP,
      KEY_CODES.END,
      KEY_CODES.HOME,
    ])
  ) {
    let candidateNodes = [...collectionItems];

    if (
      isIncludedIn(event.key, [KEY_CODES.ARROW_UP, KEY_CODES.END])
    ) {
      candidateNodes = candidateNodes.slice().reverse();
    }

    if (
      isIncludedIn(event.key, [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN])
    ) {
      const currentElement = event.target as HTMLElement;
      const currentIndex = candidateNodes.indexOf(currentElement);
      candidateNodes = candidateNodes.slice(currentIndex + 1);
    }

    setTimeout(() => focusFirst(candidateNodes));
    event.preventDefault();
  }
}

const pickedProps = computed(() => {
  if (props.position === 'popper') {
    return props;
  } else {
    return {};
  }
});

const forwardedProps = useForwardProps(pickedProps.value);

provideASelectContentContext({
  content,
  viewport,
  onViewportChange: (node) => {
    viewport.value = node;
  },
  itemRefCallback: ({ node, value, disabled }) => {
    const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
    const isSelectedItem = valueComparator({
      value: rootContext.modelValue.value,
      currentValue: value,
      comparator: rootContext.by,
    });

    if (
      isFirstValidItem
      && (rootContext.isEmptyModelValue.value || isSelectedItem)
    ) {
      firstValidItemFoundRef.value = true;
      selectedItem.value = node;
    }
  },
  selectedItem,
  selectedItemText,
  onItemLeave: () => {
    content.value?.focus();
  },
  itemTextRefCallback: ({ node, value, disabled }) => {
    const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
    const isSelectedItem = valueComparator({
      value: rootContext.modelValue.value,
      currentValue: value,
      comparator: rootContext.by,
    });

    if (isSelectedItem || isFirstValidItem) {
      selectedItemText.value = node;
    }
  },
  focusSelectedItem,
  position: props.position,
  isPositioned,
  searchRef: search,
});
</script>

<template>
  <ACollectionSlot>
    <AFocusScope
      as-child
      @mount-auto-focus.prevent
      @unmount-auto-focus="
        (event) => {
          emits('closeAutoFocus', event);
          if (event.defaultPrevented) return;
          rootContext.triggerElement.value?.focus({ preventScroll: true });
          event.preventDefault();
        }
      "
    >
      <ADismissableLayer
        as-child
        disable-outside-pointer-events
        @focus-outside.prevent
        @dismiss="rootContext.onOpenChange(false)"
        @escape-key-down="emits('escapeKeyDown', $event)"
        @pointer-down-outside="emits('pointerDownOutside', $event)"
      >
        <component
          :is="
            position === 'popper'
              ? ASelectPopperPosition
              : ASelectItemAlignedPosition
          "
          v-bind="{ ...$attrs, ...forwardedProps }"
          :id="rootContext.contentId"
          :ref="
            (vnode: ComponentPublicInstance) => {
              content = unrefElement(vnode) as HTMLElement
              return undefined
            }
          "
          role="listbox"
          :data-state="rootContext.open.value ? 'open' : 'closed'"
          :dir="rootContext.dir.value"
          :style="{
            // flex layout so we can place the scroll buttons properly
            display: 'flex',
            flexDirection: 'column',
            // reset the outline by default as the content MAY get focused
            outline: 'none',
          }"
          @contextmenu.prevent
          @placed="isPositioned = true"
          @keydown="(handleKeyDown as any)"
        >
          <slot />
        </component>
      </ADismissableLayer>
    </AFocusScope>
  </ACollectionSlot>
</template>
