<script lang="ts">
import { computed } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface AComboboxEmptyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectAComboboxRootContext } from './a-combobox-root.vue';

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
