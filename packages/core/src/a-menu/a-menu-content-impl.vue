<script lang="ts">
import type { Ref } from 'vue';

import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';

import type {
  ADismissableLayerEmits,
  ADismissableLayerProps,
} from '~~/a-dismissable-layer';
import type { AFocusScopeProps } from '~~/a-focus-scope';
import type { APopperContentProps } from '~~/a-popper';
import type { ARovingFocusGroupEmits } from '~~/a-roving-focus';

import { createContext } from '~~/shared';

import type {
  GraceIntent,
  Side,
} from './utils';

export interface AMenuContentContext {
  onItemEnter: (event: PointerEvent) => boolean;
  onItemLeave: (event: PointerEvent) => void;
  onPointerGraceIntentChange: (intent: GraceIntent | null) => void;
  onTriggerLeave: (event: PointerEvent) => boolean;
  pointerGraceTimerRef: Ref<number>;
  searchRef: Ref<string>;
}

export const [
  injectAMenuContentContext,
  provideAMenuContentContext,
] = createContext<AMenuContentContext>('MenuContent');

export interface AMenuContentImplPrivateProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `ADismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `ADismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: ADismissableLayerProps['disableOutsidePointerEvents'];
  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   * @defaultValue false
   */
  disableOutsideScroll?: boolean;

  /**
   * Whether focus should be trapped within the `MenuContent`
   * @defaultValue also
   */
  trapFocus?: AFocusScopeProps['trapped'];
}

export type AMenuContentImplEmits = {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event];
  openAutoFocus: [event: Event];
} & ADismissableLayerEmits & Omit<ARovingFocusGroupEmits, 'update:currentTabStopId'>;

type AMenuContentImplPrivateEmits = {
  /**
   * Handler called when the `ADismissableLayer` should be dismissed
   */
  dismiss: [];
} & AMenuContentImplEmits;

export interface AMenuContentImplProps
  extends AMenuContentImplPrivateProps,
  Omit<APopperContentProps, 'dir'> {
  /**
   * When `true`, keyboard navigation will loop from last item to first, and vice versa.
   * @defaultValue false
   */
  loop?: boolean;
}

export interface AMenuRootContentTypeProps
  extends Omit<AMenuContentImplProps, 'disableOutsidePointerEvents' | 'disableOutsideScroll' | 'trapFocus'> {}
</script>

<script setup lang="ts">
import {
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue';

import { ADismissableLayer } from '~~/a-dismissable-layer';
import { AFocusScope } from '~~/a-focus-scope';
import {
  APopperContent,
  APopperContentPropsDefaultValue,
} from '~~/a-popper';
import { ARovingFocusGroup } from '~~/a-roving-focus';
import {
  useArrowNavigation,
  useFocusGuards,
  useForwardExpose,
  useTypeahead,
} from '~~/shared';
import { useBodyScrollLock } from '~~/shared/use-body-scroll-lock';

import { injectAMenuContext, injectAMenuRootContext } from './a-menu-root.vue';
import {
  FIRST_LAST_KEYS,
  focusFirst,
  getOpenState,
  isMouseEvent,
  isPointerInGraceArea,
  LAST_KEYS,
} from './utils';

const props = withDefaults(
  defineProps<AMenuContentImplProps>(),
  {
    ...APopperContentPropsDefaultValue,
  },
);
const emits = defineEmits<AMenuContentImplPrivateEmits>();
const menuContext = injectAMenuContext();
const rootContext = injectAMenuRootContext();

const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);

useFocusGuards();
useBodyScrollLock(disableOutsidePointerEvents.value);

const searchRef = ref('');
const timerRef = ref(0);
const pointerGraceTimerRef = ref(0);
const pointerGraceIntentRef = ref<GraceIntent | null>(null);
const pointerDirRef = ref<Side>('right');
const lastPointerXRef = ref(0);
const currentItemId = ref<null | string>(null);

const aRovingFocusGroupRef = ref<InstanceType<typeof ARovingFocusGroup>>();
const { forwardRef, currentElement: contentElement } = useForwardExpose();
const { handleTypeaheadSearch } = useTypeahead();

watch(contentElement, (el) => {
  menuContext!.onContentChange(el);
});

onUnmounted(() => {
  window.clearTimeout(timerRef.value);
});

function isPointerMovingToSubmenu(event: PointerEvent) {
  const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;

  return (
    isMovingTowards
    && isPointerInGraceArea({
      event,
      area: pointerGraceIntentRef.value?.area,
    })
  );
}

async function handleMountAutoFocus(event: Event) {
  emits('openAutoFocus', event);
  if (event.defaultPrevented) {
    return;
  }

  // when opening, explicitly focus the content area only and leave
  // `onEntryFocus` in  control of focusing first item
  event.preventDefault();

  contentElement.value?.focus({
    preventScroll: true,
  });
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented) {
    return;
  }
  // submenu key events bubble through portals. We only care about keys in this menu.
  const target = event.target as HTMLElement;
  const isKeyDownInside = target.closest('[data-akar-menu-content]') === event.currentTarget;
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
  const isCharacterKey = event.key.length === 1;

  const el = useArrowNavigation({
    event,
    currentElement: document.activeElement as HTMLElement,
    parentElement: contentElement.value,
    options: {
      loop: loop.value,
      arrowKeyOptions: 'vertical',
      dir: rootContext?.dir.value,
      focus: true,
      attributeName: '[data-akar-collection-item]:not([data-disabled])',
    },
  });

  if (el) {
    return el?.focus();
  }

  // prevent "Space" taken account into handleTypeahead
  if (event.key === KEY_CODES.SPACE) {
    return;
  }

  const collectionItems = aRovingFocusGroupRef.value?.getItems().map((i) => i.ref) ?? [];

  if (isKeyDownInside) {
    // menus should not be navigated using tab key so we prevent it
    if (event.key === KEY_CODES.TAB) {
      event.preventDefault();
    }

    if (!isModifierKey && isCharacterKey) {
      handleTypeaheadSearch({ key: event.key, fallback: collectionItems });
    }
  }

  // focus first/last item based on key pressed
  if (event.target !== contentElement.value) {
    return;
  }

  if (!isIncludedIn(event.key, FIRST_LAST_KEYS)) {
    return;
  }

  event.preventDefault();
  const candidateNodes = [...collectionItems];
  if (isIncludedIn(event.key, LAST_KEYS)) {
    candidateNodes.reverse();
  }

  focusFirst(candidateNodes);
}

function handleBlur(event: FocusEvent) {
  // clear search buffer when leaving the menu
  // @ts-expect-error the provided currentTarget and target should be HTMLElement
  if (!event?.currentTarget?.contains?.(event.target)) {
    window.clearTimeout(timerRef.value);
    searchRef.value = '';
  }
}

function handlePointerMove(event: PointerEvent) {
  if (!isMouseEvent(event)) {
    return;
  }

  const target = event.target as HTMLElement;
  const pointerXHasChanged = lastPointerXRef.value !== event.clientX;

  // We don't use `event.movementX` for this check because Safari will
  // always return `0` on a pointer event.
  if (
    (event?.currentTarget as HTMLElement)?.contains(target)
    && pointerXHasChanged
  ) {
    const newDir = event.clientX > lastPointerXRef.value ? 'right' : 'left';
    pointerDirRef.value = newDir;
    lastPointerXRef.value = event.clientX;
  }
}

provideAMenuContentContext({
  onItemEnter: (event) => {
    // event.preventDefault() we can't prevent pointerMove event
    return isPointerMovingToSubmenu(event);
  },
  onItemLeave: (event) => {
    if (isPointerMovingToSubmenu(event)) {
      return;
    }
    contentElement.value?.focus();
    currentItemId.value = null;
  },
  onTriggerLeave: (event) => {
    // event.preventDefault() we can't prevent pointerLeave event
    return isPointerMovingToSubmenu(event);
  },
  searchRef,
  pointerGraceTimerRef,
  onPointerGraceIntentChange: (intent) => {
    pointerGraceIntentRef.value = intent;
  },
});
</script>

<template>
  <AFocusScope
    as-child
    :trapped="trapFocus"
    @mount-auto-focus="handleMountAutoFocus"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <ADismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @dismiss="emits('dismiss')"
    >
      <ARovingFocusGroup
        ref="aRovingFocusGroupRef"
        v-model:current-tab-stop-id="currentItemId"
        as-child
        orientation="vertical"
        :dir="rootContext.dir.value"
        :loop="loop"
        @entry-focus="(event) => {
          emits('entryFocus', event)
          // only focus first item when using keyboard
          if (!rootContext.isUsingKeyboardRef.value) event.preventDefault();
        }"
      >
        <APopperContent
          :ref="forwardRef"
          role="menu"
          :as="as"
          :as-child="asChild"
          aria-orientation="vertical"
          data-akar-menu-content
          :data-state="getOpenState(menuContext.open.value)"
          :dir="rootContext.dir.value"
          :side="side"
          :side-offset="sideOffset"
          :align="align"
          :align-offset="alignOffset"
          :avoid-collisions="avoidCollisions"
          :collision-boundary="collisionBoundary"
          :collision-padding="collisionPadding"
          :arrow-padding="arrowPadding"
          :prioritize-position="prioritizePosition"
          :sticky="sticky"
          :hide-when-detached="hideWhenDetached"
          @keydown="handleKeyDown"
          @blur="handleBlur"
          @pointermove="handlePointerMove"
        >
          <slot />
        </APopperContent>
      </ARovingFocusGroup>
    </ADismissableLayer>
  </AFocusScope>
</template>
