<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';
import { injectAStepperItemContext } from './stepper-item.vue';
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

export interface AStepperTitleProps extends APrimitiveProps { }

const props = withDefaults(defineProps<AStepperTitleProps>(), { as: 'h4' });
const itemContext = injectAStepperItemContext();
useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="itemContext.titleId"
  >
    <slot />
  </APrimitive>
</template>
