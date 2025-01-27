<script lang="ts">
import type { ASeparatorProps } from '~~/separator';
import { ASeparator } from '~~/separator';
import { useForwardExpose } from '~~/shared';
import { injectAStepperItemContext } from './stepper-item.vue';
import { injectAStepperRootContext } from './stepper-root.vue';
</script>

<script setup lang="ts">
export interface AStepperSeparatorProps extends ASeparatorProps { }

const props = withDefaults(defineProps<AStepperSeparatorProps>(), {});

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
