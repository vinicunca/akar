<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { createContext, useId } from '../shared';

export interface AListboxGroupProps extends APrimitiveProps {}

interface ListboxGroupContext {
  id: string;
}

export const [injectAListboxGroupContext, provideListboxGroupContext]
  = createContext<ListboxGroupContext>('AListboxGroup');
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<AListboxGroupProps>();

const id = useId(undefined, 'akar-listbox-group');
provideListboxGroupContext({ id });
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
