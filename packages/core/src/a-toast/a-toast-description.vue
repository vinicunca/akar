<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AToastDescriptionProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = defineProps<AToastDescriptionProps>();

useForwardExpose();
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
