<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APaginationNextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAPaginationRootContext } from './a-pagination-root.vue';

const props = withDefaults(
  defineProps<APaginationNextProps>(),
  { as: 'button' },
);

useForwardExpose();

const rootContext = injectAPaginationRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Next Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value"
    @click="rootContext.onPageChange(rootContext.page.value + 1)"
  >
    <slot>Next page</slot>
  </APrimitive>
</template>
