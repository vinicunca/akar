<script lang="ts">
import type { AListboxGroupProps } from '~~/a-listbox';

import { computed, onMounted, onUnmounted } from 'vue';

import { createContext, useId } from '~~/shared';

import { injectAComboboxRootContext } from './a-combobox-root.vue';

export interface AComboboxGroupProps extends AListboxGroupProps {}

type AComboboxGroupContext = {
  id: string;
  labelId: string;
};

export const
  [
    injectAComboboxGroupContext,
    provideAComboboxGroupContext,
  ] = createContext<AComboboxGroupContext>('AComboboxGroup');
</script>

<script setup lang="ts">
import { AListboxGroup } from '~~/a-listbox';

const props = defineProps<AComboboxGroupProps>();
const id = useId(undefined, 'akar-combobox-group');
const rootContext = injectAComboboxRootContext();

const isRender = computed(() => {
  if (rootContext.ignoreFilter.value) {
    return true;
  } else {
    if (!rootContext.filterState.search) {
      return true;
    } else {
      return rootContext.filterState.filtered.groups.has(id);
    }
  }
});

const context = provideAComboboxGroupContext({
  id,
  labelId: '',
});

onMounted(() => {
  if (!rootContext.allGroups.value.has(id)) {
    rootContext.allGroups.value.set(id, new Set());
  }
});

onUnmounted(() => {
  rootContext.allGroups.value.delete(id);
});
</script>

<template>
  <AListboxGroup
    :id="id"
    :aria-labelledby="context.labelId"
    v-bind="props"
    :hidden="isRender ? undefined : true"
  >
    <slot />
  </AListboxGroup>
</template>
