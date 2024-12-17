<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { isBrowser } from '@vinicunca/perkakas';
import { ref, toRefs, watch, watchEffect } from 'vue';
import { useWindowSplitterResizeHandlerBehavior } from './utils/composables/use-window-splitter-behavior';

export interface ASplitterResizeHandleProps extends APrimitiveProps {
  /** Resize handle id (unique within group); falls back to `useId` when not provided */
  id?: string;
  /** Allow this much margin when determining resizable handle hit detection */
  hitAreaMargins?: PointerHitAreaMargins;
  /** Tabindex for the handle */
  tabindex?: number;
  /** Disable drag handle */
  disabled?: boolean;
}

export type PanelResizeHandleOnDragging = (isDragging: boolean) => void;
export type ResizeHandlerState = 'drag' | 'hover' | 'inactive';

export type ASplitterResizeHandleEmits = {
  /** Event handler called when dragging the handler. */
  dragging: [isDragging: boolean];
};
</script>

<script setup lang="ts">
import type { PointerHitAreaMargins, ResizeHandlerAction } from './utils/registry';
import type { ResizeEvent, ResizeHandler } from './utils/types';
import { APrimitive } from '~~/primitive';
import { useForwardExpose, useId } from '~~/shared';
import { injectPanelGroupContext } from './splitter-group.vue';
import { assert } from './utils/assert';
import { registerResizeHandle } from './utils/registry';

const props = withDefaults(defineProps<ASplitterResizeHandleProps>(), {
  tabindex: 0,
});
const emits = defineEmits<ASplitterResizeHandleEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const { disabled } = toRefs(props);

const panelGroupContext = injectPanelGroupContext();
if (panelGroupContext === null) {
  throw new Error(
    'PanelResizeHandle components must be rendered within a PanelGroup container',
  );
}

const {
  direction,
  groupId,
  registerResizeHandle: registerResizeHandleWithParentGroup,
  startDragging,
  stopDragging,
  panelGroupElement,
} = panelGroupContext;

const resizeHandleId = useId(props.id, 'akar-splitter-resize-handle');
const state = ref<ResizeHandlerState>('inactive');
const isFocused = ref(false);
const resizeHandler = ref<null | ResizeHandler>(null);

watch(disabled, () => {
  if (!isBrowser) {
    return;
  }
  if (disabled.value) {
    resizeHandler.value = null;
  } else {
    resizeHandler.value = registerResizeHandleWithParentGroup(resizeHandleId);
  }
}, { immediate: true });

watchEffect((onCleanup) => {
  if (disabled.value || resizeHandler.value === null) {
    return;
  }

  const element = currentElement.value;
  if (!element) {
    return;
  }

  assert(element);

  const setResizeHandlerState = (
    action: ResizeHandlerAction,
    isActive: boolean,
    event: ResizeEvent,
  ) => {
    if (isActive) {
      switch (action) {
        case 'down': {
          state.value = 'drag';

          startDragging(resizeHandleId, event);
          emits('dragging', true);
          break;
        }
        case 'move': {
          if (state.value !== 'drag') {
            state.value = 'hover';
          }

          resizeHandler.value?.(event);
          break;
        }
        case 'up': {
          state.value = 'hover';

          stopDragging();
          emits('dragging', false);
          break;
        }
      }
    } else {
      state.value = 'inactive';
    }
  };

  onCleanup(registerResizeHandle(
    resizeHandleId,
    element,
    direction,
    {
      // Coarse inputs (e.g. finger/touch)
      coarse: props.hitAreaMargins?.coarse ?? 15,
      // Fine inputs (e.g. mouse)
      fine: props.hitAreaMargins?.fine ?? 5,
    },
    setResizeHandlerState,
  ));
});

useWindowSplitterResizeHandlerBehavior({
  disabled,
  resizeHandler,
  handleId: resizeHandleId,
  panelGroupElement,
});
</script>

<template>
  <APrimitive
    :id="resizeHandleId"
    :ref="forwardRef"
    :style="{
      touchAction: 'none',
      userSelect: 'none',
    }"
    :as="as"
    :as-child="asChild"
    role="separator"
    data-resize-handle=""
    :tabindex="tabindex"
    :data-state="state"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="direction"
    :data-panel-group-id="groupId"
    :data-resize-handle-active="state === 'drag' ? 'pointer' : isFocused ? 'keyboard' : undefined"
    :data-resize-handle-state="state"
    :data-panel-resize-handle-enabled="!disabled"
    :data-panel-resize-handle-id=" resizeHandleId"
    @blur="isFocused = false"
    @focus="isFocused = false"
  >
    <slot />
  </APrimitive>
</template>
