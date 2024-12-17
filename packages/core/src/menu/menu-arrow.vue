<script lang="ts">
import type { APopperArrowProps } from '~~/popper';

export interface AMenuArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/popper';

const props = defineProps<AMenuArrowProps>();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
