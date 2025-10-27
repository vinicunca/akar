<script setup lang="ts">
import type { PAccordionItem } from 'pohon-ui';
import { onMounted, ref } from 'vue';

const items: Array<PAccordionItem> = [
  {
    label: 'Is it accessible?',
    icon: 'i-lucide:smile',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    label: 'Is it unstyled?',
    icon: 'i-lucide:swatch-book',
    content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
  },
  {
    label: 'Can it be animated?',
    icon: 'i-lucide:box',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
];

const active = ref('0');

// !Warning: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.length);
  }, 2000);
});
</script>

<template>
  <PAccordion
    v-model="active"
    :items="items"
  />
</template>
