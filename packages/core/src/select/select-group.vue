<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { createContext, useId } from '../shared';

export interface ASelectGroupProps extends APrimitiveProps {}

interface SelectGroupContext {
  id: string;
}

export const [injectASelectGroupContext, provideSelectGroupContext]
  = createContext<SelectGroupContext>('ASelectGroup');
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<ASelectGroupProps>();

const id = useId(undefined, 'akar-select-group');
provideSelectGroupContext({ id });
</script>

<template>
  <APrimitive
    role="group"
    v-bind="props"
    :aria-labelledby="id"
  >
    <slot />
  </APrimitive>
</template>
