<script lang="ts">
import type { APopperArrowProps } from '~~/a-popper';

export interface ASelectArrowProps extends APopperArrowProps {}
</script>

<script setup lang="ts">
import { APopperArrow } from '~~/a-popper';

import { injectASelectContentContext } from './a-select-content-impl.vue';
import { injectASelectRootContext } from './a-select-root.vue';

const props = withDefaults(
  defineProps<ASelectArrowProps>(),
  {
    width: 10,
    height: 5,
    as: 'svg',
  },
);

const rootContext = injectASelectRootContext();
const contentContext = injectASelectContentContext();
</script>

<template>
  <APopperArrow
    v-if="rootContext.open.value && contentContext.position === 'popper'"
    v-bind="props"
  >
    <slot />
  </APopperArrow>
</template>
