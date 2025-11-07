<script setup lang="ts">
import type { PAccordionItem } from 'pohon-ui';

const items: Array<PAccordionItem> = [
  {
    label: 'Icons',
    icon: 'i-lucide:smile',
  },
  {
    label: 'Colors',
    icon: 'i-lucide:swatch-book',
  },
  {
    label: 'Components',
    icon: 'i-lucide:box',
  },
];
</script>

<template>
  <PAccordion :items="items">
    <template #content="{ item }">
      <p class="text-sm color-secondary pb-3.5">
        This is the {{ item.label }} panel.
      </p>
    </template>
  </PAccordion>
</template>
