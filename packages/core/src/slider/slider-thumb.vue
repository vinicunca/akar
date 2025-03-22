<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ASliderThumbProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useCollection } from '~~/collection';
import SliderThumbImpl from './slider-thumb-impl.vue';

const props = withDefaults(
  defineProps<ASliderThumbProps>(),
  {
    as: 'span',
  },
);
const { getItems } = useCollection();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const index = computed(() =>
  thumbElement.value
    ? getItems(true).findIndex((i) => i.ref === thumbElement.value)
    : -1,
);
</script>

<template>
  <SliderThumbImpl
    :ref="forwardRef"
    v-bind="props"
    :index="index"
  >
    <slot />
  </SliderThumbImpl>
</template>
