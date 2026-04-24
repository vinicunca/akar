<script lang="ts">
import type { Ref } from 'vue';
import type { AListboxItemEmits, AListboxItemProps } from '../listbox';
import { createContext } from '../shared';

export interface AColorSwatchPickerItemProps extends AListboxItemProps {
/**
 * The color to display in the swatch as a hex string.
 * Example: `#16a372` or `#ff5733`.
 */
  value: string;
}

export type AColorSwatchPickerItemEmits = AListboxItemEmits;

export interface AColorSwatchPickerItemContext {
  color: Ref<string>;
}

export const [injectAColorSwatchPickerItemContext, provideAColorSwatchPickerItemContext]
  = createContext<AColorSwatchPickerItemContext>('ColorSwatchPickerItem', 'AColorSwatchPickerItemContext');
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { AListboxItem } from '../listbox';
import { useForwardPropsEmits } from '../shared';
import { getColorName } from '../shared/color';

defineOptions({ name: 'AColorSwatchPickerItem' });

const props = defineProps<AColorSwatchPickerItemProps>();

const emits = defineEmits<AColorSwatchPickerItemEmits>();

const { value } = toRefs(props);

const forwarded = useForwardPropsEmits(props, emits);

const colorLabel = computed(() => {
  try {
    return getColorName(value.value);
  } catch {
    return value.value;
  }
});

provideAColorSwatchPickerItemContext({
  color: value,
});
</script>

<template>
  <AListboxItem
    v-bind="forwarded"
    :aria-label="colorLabel"
    :data-color="value"
    :style="{ '--akar-color-swatch-picker-item-color': value }"
  >
    <slot />
  </AListboxItem>
</template>
