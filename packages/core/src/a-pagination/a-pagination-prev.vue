<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APaginationPrevProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAPaginationRootContext } from './a-pagination-root.vue';

const props = withDefaults(
  defineProps<APaginationPrevProps>(),
  { as: 'button' },
);

useForwardExpose();

const rootContext = injectAPaginationRootContext();

const disabled = computed(() => rootContext.page.value === 1 || rootContext.disabled.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Previous Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.page.value - 1)"
  >
    <slot>Prev page</slot>
  </APrimitive>
</template>
