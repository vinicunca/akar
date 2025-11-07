<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ADialogDescriptionProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectDialogRootContext } from './dialog-root.vue';

const props = withDefaults(defineProps<ADialogDescriptionProps>(), { as: 'p' });

useForwardExpose();
const rootContext = injectDialogRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.descriptionId"
  >
    <slot />
  </APrimitive>
</template>
