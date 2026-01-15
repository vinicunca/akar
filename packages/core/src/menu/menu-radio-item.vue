<script lang="ts">
import type { AcceptableValue } from '../shared/types';
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from './menu-item.vue';

export type AMenuRadioItemEmits = AMenuItemEmits;

export interface AMenuRadioItemProps extends AMenuItemProps {
  /** The unique value of the item. */
  value: AcceptableValue;
}
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/shared';
import { computed, toRefs } from 'vue';
import { useForwardProps } from '../shared';
import { provideMenuItemIndicatorContext } from './menu-item-indicator.vue';
import AMenuItem from './menu-item.vue';
import { injectMenuRadioGroupContext } from './menu-radio-group.vue';
import { getCheckedState } from './utils';

const props = defineProps<AMenuRadioItemProps>();
const emits = defineEmits<AMenuRadioItemEmits>();

const delegatedProps = reactiveOmit(props, ['value']);
const forwarded = useForwardProps(delegatedProps);

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
    v-bind="forwarded"
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
