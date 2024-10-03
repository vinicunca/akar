<script lang="ts">
import type { APopperArrowProps } from '~~/a-popper';

export interface AMenuArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/a-popper';

const props = defineProps<AMenuArrowProps>();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
