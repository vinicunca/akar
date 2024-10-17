<script lang="ts">
import type { ABaseSeparatorProps } from '~~/shared/component';

export interface ASeparatorProps extends ABaseSeparatorProps {}
</script>

<script setup lang="ts">
import { ABaseSeparator } from '~~/shared/component';

const props = withDefaults(
  defineProps<ASeparatorProps>(),
  {
    orientation: 'horizontal',
  },
);
</script>

<template>
  <ABaseSeparator v-bind="props">
    <slot />
  </ABaseSeparator>
</template>
