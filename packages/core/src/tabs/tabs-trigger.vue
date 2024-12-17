<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import type { StringOrNumber } from '~~/shared/types';
import { useForwardExpose } from '~~/shared';

export interface ATabsTriggerProps extends APrimitiveProps {
  /** A unique value that associates the trigger with a content. */
  value: StringOrNumber;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { ARovingFocusItem } from '~~/roving-focus';
import { injectATabsRootContext } from './tabs-root.vue';
import { makeContentId, makeTriggerId } from './utils';

const props = withDefaults(defineProps<ATabsTriggerProps>(), {
  disabled: false,
  as: 'button',
});

const { forwardRef } = useForwardExpose();
const rootContext = injectATabsRootContext();

const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
const contentId = computed(() => makeContentId(rootContext.baseId, props.value));

const isSelected = computed(() => props.value === rootContext.modelValue.value);
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
      @mousedown.left="(event) => {
        // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
        // but not when the control key is pressed (avoiding MacOS right click)
        if (!disabled && event.ctrlKey === false) {
          rootContext.changeModelValue(value);
        }
        else {
          // prevent focus to avoid accidental activation
          event.preventDefault();
        }
      }"
      @keydown.enter.space="rootContext.changeModelValue(value)"
      @focus="() => {
        // handle 'automatic' activation if necessary
        // ie. activate tab following focus
        const isAutomaticActivation = rootContext.activationMode !== 'manual';
        if (!isSelected && !disabled && isAutomaticActivation) {
          rootContext.changeModelValue(value);
        }
      }"
    >
      <slot />
    </APrimitive>
  </ARovingFocusItem>
</template>
