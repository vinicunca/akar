<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { injectAStepperItemContext } from './a-stepper-item.vue';

export interface AStepperIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = defineProps<AStepperIndicatorProps>();
const itemContext = injectAStepperItemContext();

useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
  >
    <slot>
      Step {{ itemContext.step.value }}
    </slot>
  </APrimitive>
</template>
