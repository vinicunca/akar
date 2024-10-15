<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APaginationListProps extends APrimitiveProps { }
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAPaginationRootContext } from './a-pagination-root.vue';
import { getRange, transform } from './utils';

const props = defineProps<APaginationListProps>();

defineSlots<{
  default: (props: {
    /** Pages item */
    items: typeof transformedRange.value;
  }) => any;
}>();

useForwardExpose();

const rootContext = injectAPaginationRootContext();

const transformedRange = computed(() => {
  return transform(
    getRange({
      currentPage: rootContext.page.value,
      pageCount: rootContext.pageCount.value,
      siblingCount: rootContext.siblingCount.value,
      showEdges: rootContext.showEdges.value,
    }),
  );
});
</script>

<template>
  <APrimitive v-bind="props">
    <slot :items="transformedRange" />
  </APrimitive>
</template>
