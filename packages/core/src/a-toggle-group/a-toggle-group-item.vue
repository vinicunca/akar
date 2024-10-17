<script lang="ts">
import type { AToggleProps } from '~~/a-toggle';
import type { AcceptableValue } from '~~/shared';

export interface AToggleGroupItemProps extends Omit<AToggleProps, 'name' | 'required'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: AcceptableValue;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { ARovingFocusItem } from '~~/a-roving-focus';
import { AToggle } from '~~/a-toggle';
import { isValueEqualOrExist, useForwardExpose } from '~~/shared';

import { injectAToggleGroupRootContext } from './a-toggle-group-root.vue';

const props = withDefaults(
  defineProps<AToggleGroupItemProps>(),
  {
    as: 'button',
  },
);

const rootContext = injectAToggleGroupRootContext();
const disabled = computed(() => rootContext.disabled?.value || props.disabled);
const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));

const { forwardRef } = useForwardExpose();
</script>

<template>
  <component
    :is="rootContext.rovingFocus.value ? ARovingFocusItem : APrimitive"
    as-child
    :focusable="!disabled"
    :active="pressed"
  >
    <AToggle
      v-bind="props"
      :ref="forwardRef"
      :disabled="disabled"
      :model-value="pressed"
      @update:model-value="rootContext.changeModelValue(value)"
    >
      <slot />
    </AToggle>
  </component>
</template>
