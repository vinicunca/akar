<script lang="ts">
import type { Point } from '~~/menu/utils';
import type { APrimitiveProps } from '~~/primitive';

export interface AContextMenuTriggerProps extends APrimitiveProps {
  /**
   * When `true`, the context menu would not open when right-clicking.
   *
   * Note that this will also restore the native context menu.
   */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRefs } from 'vue';
import { AMenuAnchor } from '~~/menu';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAContextMenuRootContext } from './context-menu-root.vue';
import { isTouchOrPen } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AContextMenuTriggerProps>(),
  {
    as: 'span',
    disabled: false,
  },
);
const { disabled } = toRefs(props);

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectAContextMenuRootContext();
const point = ref<Point>({ x: 0, y: 0 });
const virtualEl = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: point.value.x,
      right: point.value.x,
      top: point.value.y,
      bottom: point.value.y,
      ...point.value,
    } as DOMRect),
}));

const longPressTimer = ref(0);
function clearLongPress() {
  window.clearTimeout(longPressTimer.value);
}

function handleOpen(event: MouseEvent | PointerEvent) {
  point.value = { x: event.clientX, y: event.clientY };
  rootContext.onOpenChange(true);
}

async function handleContextMenu(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();
    if (!event.defaultPrevented) {
      clearLongPress();
      handleOpen(event);
      event.preventDefault();
    }
  }
}

async function handlePointerDown(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();

    if (isTouchOrPen(event) && !event.defaultPrevented) {
      // clear the long press here in case there's multiple touch points
      clearLongPress();
      longPressTimer.value = window.setTimeout(() => handleOpen(event), 700);
    }
  }
}

async function handlePointerEvent(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();
    if (isTouchOrPen(event) && !event.defaultPrevented) {
      clearLongPress();
    }
  }
}

onMounted(() => {
  if (currentElement.value) {
    rootContext.triggerElement.value = currentElement.value;
  }
});
</script>

<template>
  <AMenuAnchor
    as="template"
    :reference="virtualEl"
  />

  <APrimitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :style="{
      WebkitTouchCallout: 'none',
      pointerEvents: 'auto',
    }"
    v-bind="$attrs"
    @contextmenu="handleContextMenu"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerEvent"
    @pointercancel="handlePointerEvent"
    @pointerup="handlePointerEvent"
  >
    <slot />
  </APrimitive>
</template>
