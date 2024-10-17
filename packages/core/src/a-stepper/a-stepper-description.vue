<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AStepperDescriptionProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAStepperItemContext } from './a-stepper-item.vue';

const props = withDefaults(
  defineProps<AStepperDescriptionProps>(),
  { as: 'p' },
);

useForwardExpose();
const itemContext = injectAStepperItemContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="itemContext.descriptionId"
  >
    <slot />
  </APrimitive>
</template>
