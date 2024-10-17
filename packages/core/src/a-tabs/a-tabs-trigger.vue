<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';
import type { StringOrNumber } from '~~/shared';

export interface ATabsTriggerProps extends APrimitiveProps {
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
  /** A unique value that associates the trigger with a content. */
  value: StringOrNumber;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { ARovingFocusItem } from '~~/a-roving-focus';
import { useForwardExpose } from '~~/shared';

import { injectATabsRootContext } from './a-tabs-root.vue';
import { makeContentId, makeTriggerId } from './utils';

const props = withDefaults(defineProps<ATabsTriggerProps>(), {
  disabled: false,
  as: 'button',
});

const { forwardRef } = useForwardExpose();
const rootContext = injectATabsRootContext();

const triggerId = computed(() => makeTriggerId({ baseId: rootContext.baseId, value: props.value }));
const contentId = computed(() => makeContentId({ baseId: rootContext.baseId, value: props.value }));

const isSelected = computed(() => props.value === rootContext.modelValue.value);

function handleMouseDown(event: MouseEvent) {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.ctrlKey === false) {
    rootContext.changeModelValue(props.value);
  } else {
    // prevent focus to avoid accidental activation
    event.preventDefault();
  }
}

function handleFocus() {
  // handle 'automatic' activation if necessary
  // ie. activate tab following focus
  const isAutomaticActivation = rootContext.activationMode !== 'manual';
  if (!isSelected.value && !props.disabled && isAutomaticActivation) {
    rootContext.changeModelValue(props.value);
  }
}
</script>

<template>
  <ARovingFocusItem
    as-child
    :focusable="!disabled"
    :active="isSelected"
  >
    <APrimitive
      :id="triggerId"
      :ref="forwardRef"
      role="tab"
      :type="as === 'button' ? 'button' : undefined"
      :as="as"
      :as-child="asChild"
      :aria-selected="isSelected ? 'true' : 'false'"
      :aria-controls="contentId"
      :data-state="isSelected ? 'active' : 'inactive'"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="handleMouseDown"
      @keydown.enter.space="rootContext.changeModelValue(value)"
      @focus="handleFocus"
    >
      <slot />
    </APrimitive>
  </ARovingFocusItem>
</template>
