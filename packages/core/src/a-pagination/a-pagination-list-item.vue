<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APaginationListItemProps extends APrimitiveProps {
  /** Value for the page */
  value: number;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAPaginationRootContext } from './a-pagination-root.vue';

const props = withDefaults(
  defineProps<APaginationListItemProps>(),
  { as: 'button' },
);
useForwardExpose();

const rootContext = injectAPaginationRootContext();
const isSelected = computed(() => rootContext.page.value === props.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    data-type="page"
    :aria-label="`Page ${value}`"
    :aria-current="isSelected ? 'page' : undefined"
    :data-selected="isSelected ? 'true' : undefined"
    :disabled="rootContext.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onPageChange(value)"
  >
    <slot>{{ value }}</slot>
  </APrimitive>
</template>
