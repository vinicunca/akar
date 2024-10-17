<script lang="ts">
import { ASeparator, type ASeparatorProps } from '~~/a-separator';

export interface AStepperSeparatorProps extends ASeparatorProps {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '~~/shared';

import { injectAStepperItemContext } from './a-stepper-item.vue';
import { injectAStepperRootContext } from './a-stepper-root.vue';

const props = withDefaults(
  defineProps<AStepperSeparatorProps>(),
  {},
);

const rootContext = injectAStepperRootContext();
const itemContext = injectAStepperItemContext();

useForwardExpose();
</script>

<template>
  <ASeparator
    v-bind="props"
    decorative
    :orientation="rootContext.orientation.value"
    :data-state="itemContext.state.value"
  >
    <slot />
  </ASeparator>
</template>
