<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectItemIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectASelectItemContext } from './a-select-item.vue';

const props = withDefaults(
  defineProps<ASelectItemIndicatorProps>(),
  {
    as: 'span',
  },
);

const itemContext = injectASelectItemContext();
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
