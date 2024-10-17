<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AStepperTitleProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAStepperItemContext } from './a-stepper-item.vue';

const props = withDefaults(
  defineProps<AStepperTitleProps>(),
  { as: 'h4' },
);
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
