<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from './menu-item.vue';
import type { CheckedState } from './utils';

export type AMenuCheckboxItemEmits = AMenuItemEmits & {
  /** Event handler called when the checked state changes. */
  'update:modelValue': [payload: boolean];
};

export interface AMenuCheckboxItemProps extends AMenuItemProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
}
</script>

<script setup lang="ts">
import { reactiveOmit, useVModel } from '@vueuse/core';
import { useForwardProps } from '../shared';
import { provideMenuItemIndicatorContext } from './menu-item-indicator.vue';
import AMenuItem from './menu-item.vue';
import { getCheckedState, isIndeterminate } from './utils';

const props = withDefaults(defineProps<AMenuCheckboxItemProps>(), {
  modelValue: false,
});
const emits = defineEmits<AMenuCheckboxItemEmits>();

defineSlots<{
  default?: (props: {
    /** Current modelValue state */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const delegatedProps = reactiveOmit(props, ['modelValue']);
const forwarded = useForwardProps(delegatedProps);

const modelValue = useVModel(props, 'modelValue', emits);

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <AMenuItem
    role="menuitemcheckbox"
    v-bind="forwarded"
    :aria-checked="isIndeterminate(modelValue) ? 'mixed' : modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="
      async (event) => {
        emits('select', event);
        if (isIndeterminate(modelValue)) {
          modelValue = true;
        }
        else {
          modelValue = !modelValue;
        }
      }
    "
  >
    <slot :model-value="modelValue" />
  </AMenuItem>
</template>
