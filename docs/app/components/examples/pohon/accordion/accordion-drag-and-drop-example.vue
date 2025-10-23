<script setup lang="ts">
import type { PAccordionItem } from 'pohon-ui';
import { useSortable } from '@vueuse/integrations/useSortable';
import { shallowRef, useTemplateRef } from 'vue';

const items = shallowRef<Array<PAccordionItem>>([
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
]);

const accordion = useTemplateRef<HTMLElement>('accordion');

useSortable(accordion, items, {
  animation: 150,
});
</script>

<template>
  <PAccordion
    ref="accordion"
    :items="items"
  />
</template>
