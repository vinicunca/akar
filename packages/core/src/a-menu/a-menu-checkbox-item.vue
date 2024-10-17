<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from './a-menu-item.vue';
import type { CheckedState } from './utils';

export type AMenuACheckboxItemEmits = {
  /** Event handler called when the checked state changes. */
  'update:modelValue': [payload: boolean];
} & AMenuItemEmits;

export interface AMenuACheckboxItemProps extends AMenuItemProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
}
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

import AMenuItem from './a-menu-item.vue';
import { provideAMenuItemIndicatorContext } from './a-menu-item-indicator.vue';
import { getCheckedState, isIndeterminate } from './utils';

const props = withDefaults(
  defineProps<AMenuACheckboxItemProps>(),
  {
    modelValue: false,
  },
);

const emits = defineEmits<AMenuACheckboxItemEmits>();

defineSlots<{
  default: (props: {
    /** Current modelValue state */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
);

provideAMenuItemIndicatorContext({ modelValue });

function onSelect(event: Event) {
  emits('select', event);

  if (isIndeterminate(modelValue.value)) {
    modelValue.value = true;
  } else {
    modelValue.value = !modelValue;
  }
}
</script>

<template>
  <AMenuItem
    role="menuitemcheckbox"
    v-bind="props"
    :aria-checked="isIndeterminate(modelValue) ? 'mixed' : modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="onSelect"
  >
    <slot :model-value="modelValue" />
  </AMenuItem>
</template>
