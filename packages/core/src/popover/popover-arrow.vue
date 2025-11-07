<script lang="ts">
import type { APopperArrowProps } from '../popper';
import { useForwardExpose } from '../shared';

export interface APopoverArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '../popper';

const props = withDefaults(defineProps<APopoverArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
useForwardExpose();
</script>

<template>
  <APopperArrow v-bind="props">
    <slot />
  </APopperArrow>
</template>
