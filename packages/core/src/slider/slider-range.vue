<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ASliderRangeProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectASliderRootContext } from './slider-root.vue';
import { convertValueToPercentage, injectSliderOrientationContext } from './utils';

withDefaults(defineProps<ASliderRangeProps>(), { as: 'span' });
const rootContext = injectASliderRootContext();
const orientation = injectSliderOrientationContext();

useForwardExpose();

const percentages = computed(() => rootContext.currentModelValue.value.map((value) =>
  convertValueToPercentage(value, rootContext.min.value, rootContext.max.value),
));

const offsetStart = computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value!) : 0);
const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));
</script>

<template>
  <APrimitive
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :as-child="asChild"
    :as="as"
    :style="{
      [orientation!.startEdge.value]: `${offsetStart}%`,
      [orientation!.endEdge.value]: `${offsetEnd}%`,
    }"
  >
    <slot />
  </APrimitive>
</template>
