<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectLabelProps extends APrimitiveProps {
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectASelectGroupContext } from './a-select-group.vue';

const props = withDefaults(
  defineProps<ASelectLabelProps>(),
  {
    as: 'div',
  },
);

const groupContext = injectASelectGroupContext({ id: '' });
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.id"
  >
    <slot />
  </APrimitive>
</template>
