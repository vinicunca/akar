<script setup lang="ts">
import type { PAccordionItem } from 'pohon-ui';

const items = [
  {
    label: 'Is it accessible?',
    icon: 'i-lucide:smile',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    label: 'Is it unstyled?',
    icon: 'i-lucide:swatch-book',
    slot: 'colors' as const,
    content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
  },
  {
    label: 'Can it be animated?',
    icon: 'i-lucide:box',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
] satisfies Array<PAccordionItem>;
</script>

<template>
  <PAccordion :items="items">
    <template #colors="{ item }">
      <p class="text-sm text-primary pb-3.5">
        {{ item.content }}
      </p>
    </template>
  </PAccordion>
</template>
