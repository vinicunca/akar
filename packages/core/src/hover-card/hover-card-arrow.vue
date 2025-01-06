<script lang="ts">
import type { APopperArrowProps } from '~~/popper';
import { useForwardExpose } from '~~/shared';

export interface AHoverCardArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/popper';

const props = withDefaults(
  defineProps<AHoverCardArrowProps>(),
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
