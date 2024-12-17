<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectAStepperItemContext } from './stepper-item.vue';
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

export interface AStepperDescriptionProps extends APrimitiveProps { }

const props = withDefaults(defineProps<AStepperDescriptionProps>(), { as: 'p' });

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
