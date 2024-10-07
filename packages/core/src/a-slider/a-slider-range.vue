<script lang="ts">
import { computed } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface ASliderRangeProps extends APrimitiveProps {}
</script>

<script lang="ts" setup>
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectASliderRootContext } from './a-slider-root.vue';
import { convertValueToPercentage, injectASliderOrientationContext } from './utils';

withDefaults(
  defineProps<ASliderRangeProps>(),
  { as: 'span' },
);

const rootContext = injectASliderRootContext();
const orientationContext = injectASliderOrientationContext();

useForwardExpose();

const percentages = computed(() =>
  rootContext.modelValue?.value?.map(
    (value) => convertValueToPercentage({
      value,
      min: rootContext.min.value,
      max: rootContext.max.value,
    }),
  ),
);

const offsetStart = computed(() =>
  rootContext.modelValue!.value!.length > 1
    ? Math.min(...percentages.value!)
    : 0,
);
const offsetEnd = computed(() => 100 - Math.max(...percentages.value!));
</script>

<template>
  <APrimitive
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
    :as-child="asChild"
    :as="as"
    :style="{
      [orientationContext.startEdge]: `${offsetStart}%`,
      [orientationContext.endEdge]: `${offsetEnd}%`,
    }"
  >
    <slot />
  </APrimitive>
</template>
