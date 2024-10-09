<script lang="ts">
import { KEY_CODES } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';

import { useForwardExpose } from '~~/shared';

export interface ADropdownMenuTriggerProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, useId } from 'vue';

import { AMenuAnchor } from '~~/a-menu';
import {
  APrimitive,
} from '~~/a-primitive';

import { injectADropdownMenuRootContext } from './a-dropdown-menu-root.vue';

const props = withDefaults(
  defineProps<ADropdownMenuTriggerProps>(),
  {
    as: 'button',
  },
);

const rootContext = injectADropdownMenuRootContext();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

onMounted(() => {
  rootContext.triggerElement = triggerElement;
});

rootContext.triggerId ||= useId();

async function handleClick(event: MouseEvent) {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    rootContext?.onOpenToggle();

    await nextTick();

    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (rootContext.open.value) {
      event.preventDefault();
    }
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return;
  }

  if ([' ', KEY_CODES.ENTER].includes(event.key)) {
    rootContext.onOpenToggle();
  }

  if (event.key === KEY_CODES.ARROW_DOWN) {
    rootContext.onOpenChange(true);
  }

  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if ([' ', KEY_CODES.ARROW_DOWN, KEY_CODES.ENTER].includes(event.key)) {
    event.preventDefault();
  }
}
</script>

<template>
  <AMenuAnchor as-child>
    <APrimitive
      :id="rootContext.triggerId"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      :as-child="props.asChild"
      :as="as"
      aria-haspopup="menu"
      :aria-expanded="rootContext.open.value"
      :aria-controls="rootContext.open.value ? rootContext.contentId : undefined"
      :data-disabled="disabled ? '' : undefined"
      :disabled="disabled"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      @click="handleClick"
      @keydown.enter.space.arrow-down="handleKeydown"
    >
      <slot />
    </APrimitive>
  </AMenuAnchor>
</template>
