<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAStepperItemContext } from './stepper-item.vue';
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

export interface AStepperIndicatorProps extends APrimitiveProps { }

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
