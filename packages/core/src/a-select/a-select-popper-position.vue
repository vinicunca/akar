<script lang="ts">
import type { APopperContentProps } from '~~/a-popper';

export interface ASelectAPopperPositionProps extends APopperContentProps {}
</script>

<script setup lang="ts">
import { APopperContent } from '~~/a-popper';
import { useForwardProps } from '~~/shared';

import { CONTENT_MARGIN } from './utils';

const props = withDefaults(
  defineProps<ASelectAPopperPositionProps>(),
  {
    align: 'start',
    collisionPadding: CONTENT_MARGIN,
  },
);

const forwarded = useForwardProps(props);
</script>

<template>
  <APopperContent
    v-bind="forwarded"
    :style="{
      // Ensure border-box for floating-ui calculations
      'boxSizing': 'border-box',
      '--akar-select-content-transform-origin':
        'var(--akar-popper-transform-origin)',
      '--akar-select-content-available-width':
        'var(--akar-popper-available-width)',
      '--akar-select-content-available-height':
        'var(--akar-popper-available-height)',
      '--akar-select-trigger-width': 'var(--akar-popper-anchor-width)',
      '--akar-select-trigger-height': 'var(--akar-popper-anchor-height)',
    }"
  >
    <slot />
  </APopperContent>
</template>
