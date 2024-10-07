<script lang="ts">
import { computed } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface ASliderThumbProps extends APrimitiveProps {}
</script>

<script lang="ts" setup>
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

import ASliderThumbImpl from './a-slider-thumb-impl.vue';

const props = defineProps<ASliderThumbProps>();

const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const { getItems } = useCollection();

const index = computed(
  () => thumbElement.value
    ? getItems().findIndex((idx) => idx.ref === thumbElement.value)
    : -1,
);
</script>

<template>
  <ASliderThumbImpl
    :ref="forwardRef"
    v-bind="props"
    :index="index"
  >
    <slot />
  </ASliderThumbImpl>
</template>
