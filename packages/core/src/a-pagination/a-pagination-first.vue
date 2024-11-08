<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APaginationFirstProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAPaginationRootContext } from './a-pagination-root.vue';

const props = withDefaults(
  defineProps<APaginationFirstProps>(),
  { as: 'button' },
);

const rootContext = injectAPaginationRootContext();

useForwardExpose();

const disabled = computed(() => rootContext.page.value === 1 || rootContext.disabled.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="First Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(1)"
  >
    <slot>First page</slot>
  </APrimitive>
</template>
