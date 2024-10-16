<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

export interface ASelectGroupProps extends APrimitiveProps {}

interface ASelectGroupContext {
  id: string;
}

export const [
  injectASelectGroupContext,
  provideASelectGroupContext,
] = createContext<ASelectGroupContext>('ASelectGroup');
</script>

<script setup lang="ts">
import { useId } from 'vue';

import { APrimitive } from '~~/a-primitive';

const props = defineProps<ASelectGroupProps>();

const id = useId();

provideASelectGroupContext({ id });
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
