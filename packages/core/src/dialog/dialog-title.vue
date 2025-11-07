<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ADialogTitleProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectDialogRootContext } from './dialog-root.vue';

const props = withDefaults(defineProps<ADialogTitleProps>(), { as: 'h2' });
const rootContext = injectDialogRootContext();
useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.titleId"
  >
    <slot />
  </APrimitive>
</template>
