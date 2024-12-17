<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { computed } from 'vue';

export interface AComboboxEmptyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = defineProps<AComboboxEmptyProps>();
const rootContext = injectAComboboxRootContext();

const isRender = computed(() => rootContext.ignoreFilter.value
  ? rootContext.allItems.value.size === 0
  : !!rootContext.filterState.search && rootContext.filterState.filtered.count === 0,
);
</script>

<template>
  <APrimitive
    v-if="isRender"
    v-bind="props"
  >
    <slot>No options</slot>
  </APrimitive>
</template>
