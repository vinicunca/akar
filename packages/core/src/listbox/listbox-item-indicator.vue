<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface AListboxItemIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectAListboxItemContext } from './listbox-item.vue';

const props = withDefaults(defineProps<AListboxItemIndicatorProps>(), {
  as: 'span',
});

useForwardExpose();
const itemContext = injectAListboxItemContext();
</script>

<template>
  <APrimitive
    v-if="itemContext.isSelected.value"
    aria-hidden="true"
    v-bind="props"
  >
    <slot />
  </APrimitive>
</template>
