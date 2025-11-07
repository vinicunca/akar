<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APaginationNextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAPaginationRootContext } from './pagination-root.vue';

const props = withDefaults(defineProps<APaginationNextProps>(), { as: 'button' });

useForwardExpose();
const rootContext = injectAPaginationRootContext();

const disabled = computed((): boolean => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Next Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.page.value + 1)"
  >
    <slot>Next page</slot>
  </APrimitive>
</template>
