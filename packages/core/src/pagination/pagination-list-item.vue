<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APaginationListItemProps extends APrimitiveProps {
  /** Value for the page */
  value: number;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAPaginationRootContext } from './pagination-root.vue';

const props = withDefaults(defineProps<APaginationListItemProps>(), { as: 'button' });
useForwardExpose();

const rootContext = injectAPaginationRootContext();
const isSelected = computed(() => rootContext.page.value === props.value);

const disabled = computed((): boolean => rootContext.disabled.value);
</script>

<template>
  <APrimitive
    v-bind="props"
    data-type="page"
    :aria-label="`Page ${value}`"
    :aria-current="isSelected ? 'page' : undefined"
    :data-selected="isSelected ? 'true' : undefined"
    :disabled
    :type="as === 'button' ? 'button' : undefined"
    @click="!disabled && rootContext.onPageChange(value)"
  >
    <slot>{{ value }}</slot>
  </APrimitive>
</template>
