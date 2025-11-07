<script lang="ts">
import type { AListboxGroupProps } from '../listbox';
import { computed, onMounted, onUnmounted } from 'vue';
import { createContext, useId } from '../shared';
import { injectAComboboxRootContext } from './combobox-root.vue';

export interface AComboboxGroupProps extends AListboxGroupProps {}

type ComboboxGroupContext = {
  id: string;
  labelId: string;
};

export const [
  injectAComboboxGroupContext,
  provideComboboxGroupContext,
] = createContext<ComboboxGroupContext>('AComboboxGroup');
</script>

<script setup lang="ts">
import { AListboxGroup } from '../listbox';

const props = defineProps<AComboboxGroupProps>();
const id = useId(undefined, 'akar-combobox-group');
const rootContext = injectAComboboxRootContext();

const isRender = computed(() => {
  if (rootContext.ignoreFilter.value) {
    return true;
  } else {
    if (!rootContext.filterSearch.value) {
      return true;
    } else {
      return rootContext.filterState.value.groups.has(id);
    }
  }
});

const context = provideComboboxGroupContext({
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
