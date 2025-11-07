<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APaginationListProps extends APrimitiveProps { }
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAPaginationRootContext } from './pagination-root.vue';
import { getRange, transform } from './utils';

const props = defineProps<APaginationListProps>();

defineSlots<{
  default?: (props: {
    /** Pages item */
    items: typeof transformedRange.value;
  }) => any;
}>();

useForwardExpose();
const rootContext = injectAPaginationRootContext();

const transformedRange = computed(() => {
  return transform(
    getRange(
      rootContext.page.value,
      rootContext.pageCount.value,
      rootContext.siblingCount.value,
      rootContext.showEdges.value,
    ),
  );
});
</script>

<template>
  <APrimitive v-bind="props">
    <slot :items="transformedRange" />
  </APrimitive>
</template>
