<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APaginationLastProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAPaginationRootContext } from './pagination-root.vue';

const props = withDefaults(defineProps<APaginationLastProps>(), { as: 'button' });

const rootContext = injectAPaginationRootContext();
useForwardExpose();

const disabled = computed((): boolean => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Last Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.pageCount.value)"
  >
    <slot>Last page</slot>
  </APrimitive>
</template>
