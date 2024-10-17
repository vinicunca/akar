<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AToastTitleProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

const props = defineProps<AToastTitleProps>();

useForwardExpose();
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
