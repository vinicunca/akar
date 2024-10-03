<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from './a-menu-item.vue';

export type AMenuRadioItemEmits = AMenuItemEmits;

export interface AMenuRadioItemProps extends AMenuItemProps {
  /** The unique value of the item. */
  value: string;
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import MenuItem from './a-menu-item.vue';
import { provideAMenuItemIndicatorContext } from './a-menu-item-indicator.vue';
import { injectAMenuRadioGroupContext } from './a-menu-radio-group.vue';
import { getCheckedState } from './utils';

const props = defineProps<AMenuRadioItemProps>();
const emits = defineEmits<AMenuRadioItemEmits>();

const { value } = toRefs(props);
const radioGroupContext = injectAMenuRadioGroupContext();
const modelValue = computed(
  () => radioGroupContext.modelValue.value === value?.value,
);

provideAMenuItemIndicatorContext({ modelValue });

function handleSelect(event: Event) {
  emits('select', event);

  radioGroupContext.onValueChange(value.value);
}
</script>

<template>
  <MenuItem
    role="menuitemradio"
    v-bind="props"
    :aria-checked="modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="handleSelect"
  >
    <slot />
  </MenuItem>
</template>
