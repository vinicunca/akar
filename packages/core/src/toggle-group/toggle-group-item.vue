<script lang="ts">
import type { AcceptableValue } from '../shared/types';
import type { AToggleProps } from '../toggle';
import { isValueEqualOrExist, useForwardExpose } from '../shared';

export interface AToggleGroupItemProps extends Omit<AToggleProps, 'name' | 'required' | 'modelValue' | 'defaultValue'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: AcceptableValue;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { ARovingFocusItem } from '../roving-focus';
import { AToggle } from '../toggle';
import { injectAToggleGroupRootContext } from './toggle-group-root.vue';

const props = withDefaults(defineProps<AToggleGroupItemProps>(), {
  as: 'button',
});

const rootContext = injectAToggleGroupRootContext();
const disabled = computed(() => rootContext.disabled?.value || props.disabled);
const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));

const { forwardRef } = useForwardExpose();
</script>

<template>
  <component
    :is="rootContext.rovingFocus.value ? ARovingFocusItem : APrimitive"
    as-child
    v-bind="rootContext.rovingFocus.value ? { focusable: !disabled, active: pressed } : {}"
  >
    <AToggle
      v-bind="props"
      :ref="forwardRef"
      v-slot="slotProps"
      :disabled="disabled"
      :model-value="pressed"
      @update:model-value="rootContext.changeModelValue(value)"
    >
      <slot v-bind="slotProps" />
    </AToggle>
  </component>
</template>
