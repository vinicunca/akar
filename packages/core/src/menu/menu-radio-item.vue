<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from './menu-item.vue';

export type AMenuRadioItemEmits = AMenuItemEmits;

export interface AMenuRadioItemProps extends AMenuItemProps {
  /** The unique value of the item. */
  value: string;
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { provideMenuItemIndicatorContext } from './menu-item-indicator.vue';
import AMenuItem from './menu-item.vue';
import { injectMenuRadioGroupContext } from './menu-radio-group.vue';
import { getCheckedState } from './utils';

const props = defineProps<AMenuRadioItemProps>();
const emits = defineEmits<AMenuRadioItemEmits>();

const { value } = toRefs(props);
const radioGroupContext = injectMenuRadioGroupContext();
const modelValue = computed(
  () => radioGroupContext.modelValue.value === value?.value,
);

provideMenuItemIndicatorContext({ modelValue });
</script>

<template>
  <AMenuItem
    role="menuitemradio"
    v-bind="props"
    :aria-checked="modelValue"
    :data-state="getCheckedState(modelValue)"
    @select="
      async (event) => {
        emits('select', event);
        radioGroupContext.onValueChange(value);
      }
    "
  >
    <slot />
  </AMenuItem>
</template>
