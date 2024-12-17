<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ASliderThumbProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useCollection } from '~~/collection';
import SliderThumbImpl from './slider-thumb-impl.vue';

const props = defineProps<ASliderThumbProps>();
const { getItems } = useCollection();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const index = computed(() => thumbElement.value ? getItems().findIndex((i) => i.ref === thumbElement.value) : -1);
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
