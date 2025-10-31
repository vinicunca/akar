<script setup lang="ts">
import type { PInputMenuItem } from 'pohon-ui';

const items: Array<PInputMenuItem> = Array(1000).fill(0).map((_, i) => ({
  label: `item-${i}`,
  value: i,
}));
</script>

<template>
  <PInputMenu
    virtualize
    :items="items"
    class="w-48"
  />
</template>
