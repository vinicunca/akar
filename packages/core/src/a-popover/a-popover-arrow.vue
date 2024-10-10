<script lang="ts">
import type { APopperArrowProps } from '~~/a-popper';

export interface APopoverArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/a-popper';
import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<APopoverArrowProps>(),
  {
    width: 10,
    height: 5,
    as: 'svg',
  },
);

useForwardExpose();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
