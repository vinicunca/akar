<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ASelectIconProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

withDefaults(defineProps<ASelectIconProps>(), {
  as: 'span',
});
</script>

<template>
  <APrimitive
    aria-hidden="true"
    :as="as"
    :as-child="asChild"
  >
    <slot>▼</slot>
  </APrimitive>
</template>
