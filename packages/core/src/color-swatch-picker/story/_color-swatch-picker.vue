<script setup lang="ts">
import type { AColorSwatchPickerRootEmits, AColorSwatchPickerRootProps } from '..';
import { AColorSwatchPickerItem, AColorSwatchPickerItemIndicator, AColorSwatchPickerItemSwatch, AColorSwatchPickerRoot } from '..';
import { useForwardPropsEmits } from '../../shared';

const props = defineProps<AColorSwatchPickerRootProps>();

const emits = defineEmits<AColorSwatchPickerRootEmits>();

const colors = [
  '#E5484D',
  '#D6409F',
  '#8E4EC6',
  '#0090FF',
  '#30A46C',
  '#F76B15',
  '#FFE629',
];

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AColorSwatchPickerRoot
    v-bind="forwarded"
    aria-label="Color swatches"
  >
    <AColorSwatchPickerItem
      v-for="color in colors"
      :key="color"
      :value="color"
      class="relative"
    >
      <AColorSwatchPickerItemSwatch
        class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 cursor-pointer ring-1 ring-black/15 ring-inset dark:ring-white/15"
      />
      <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
    </AColorSwatchPickerItem>
  </AColorSwatchPickerRoot>
</template>
