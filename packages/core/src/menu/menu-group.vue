<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { createContext } from '../shared';

interface AMenuGroupContext {
  id: string;
}

export const [
  injectAMenuGroupContext,
  provideAMenuGroupContext,
] = createContext<AMenuGroupContext>('AMenuGroup');

export interface AMenuGroupProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { useId } from '../shared';

const props = defineProps<AMenuGroupProps>();

const id = useId(undefined, 'akar-menu-group');
provideAMenuGroupContext({ id });
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
