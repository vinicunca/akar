<script setup lang="ts">
import type { AColorSwatchProps } from '..';
import { AColorSwatch } from '..';

const props = withDefaults(defineProps<AColorSwatchProps>(), {
  color: '#E5484D',
});
</script>

<template>
  <AColorSwatch
    v-bind="props"
    class="rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 ring-1 ring-black/15 ring-inset dark:ring-white/15"
  />
</template>
