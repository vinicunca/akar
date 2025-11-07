<script lang="ts">
export interface AComboboxVirtualizerProps<T extends AcceptableValue = AcceptableValue> extends AListboxVirtualizerProps<T> {}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import type { AListboxVirtualizerProps } from '../listbox/listbox-virtualizer.vue';
import type { AcceptableValue } from '../shared/types';
import AListboxVirtualizer from '../listbox/listbox-virtualizer.vue';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = defineProps<AComboboxVirtualizerProps<T>>();

defineSlots<{
  default?: (props: {
    option: T;
    virtualizer: Virtualizer<HTMLElement, Element>;
    virtualItem: VirtualItem;
  }) => any;
}>();

const rootContext = injectAComboboxRootContext();
// set virtual true when this component mounted
rootContext.isVirtual.value = true;
</script>

<template>
  <AListboxVirtualizer
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </AListboxVirtualizer>
</template>
