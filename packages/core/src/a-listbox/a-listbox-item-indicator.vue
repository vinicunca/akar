<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AListboxItemIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAListboxItemContext } from './a-listbox-item.vue';

const props = withDefaults(
  defineProps<AListboxItemIndicatorProps>(),
  {
    as: 'span',
  },
);

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
