<script setup lang="ts">
import type { PSelectMenuItem } from 'pohon-ui';

const items: Array<PSelectMenuItem> = Array(1000).fill(0).map((_, i) => ({
  label: `item-${i}`,
  value: i,
}));
</script>

<template>
  <PSelectMenu
    virtualize
    :items="items"
    class="w-48"
  />
</template>
