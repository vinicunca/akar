<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

export interface AListboxGroupProps extends APrimitiveProps {}

interface AListboxGroupContext {
  id: string;
}

export const [injectAListboxGroupContext, provideAListboxGroupContext]
  = createContext<AListboxGroupContext>('AListboxGroup');
</script>

<script setup lang="ts">
import { useId } from 'vue';

import { APrimitive } from '~~/a-primitive';

const props = defineProps<AListboxGroupProps>();

const id = useId();

provideAListboxGroupContext({ id });
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
