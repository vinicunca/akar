<script lang="ts">
import type { AColorSwatchProps } from '../color-swatch/color-swatch.vue';

export interface AColorSwatchPickerItemSwatchProps extends Omit<AColorSwatchProps, 'color'> { }
</script>

<script setup lang="ts">
import { AColorSwatch } from '../color-swatch';
import { injectAColorSwatchPickerItemContext } from './color-swatch-picker-item.vue';

defineOptions({ name: 'AColorSwatchPickerItemSwatch' });

const props = defineProps<AColorSwatchPickerItemSwatchProps>();

const colorSwatchPickerItemContext = injectAColorSwatchPickerItemContext();
</script>

<template>
  <AColorSwatch
    v-bind="props"
    :color="colorSwatchPickerItemContext.color.value"
  />
</template>
