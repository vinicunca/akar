<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from 'akar';

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
];
</script>

<template>
  <AAccordionRoot
    class="border border-akar-border rounded-lg bg-white w-300px shadow-[0_2px_10px] shadow-black/5"
    default-value="item-1"
    type="single"
    :collapsible="true"
  >
    <template
      v-for="item in accordionItems"
      :key="item.value"
    >
      <AAccordionItem
        class="border-b border-akar-border last:border-b-0"
        :value="item.value"
      >
        <AAccordionHeader class="flex">
          <AAccordionTrigger class="group text-sm font-medium px-5 py-3.5 outline-none border-b border-akar-border flex flex-1 gap-1.5 min-w-0 items-center focus-visible:(ring-3 ring-akar-ring)">
            <span>{{ item.title }}</span>
            <Icon
              icon="radix-icons:chevron-down"
              class="color-primary ms-auto size-5 transition-transform-280 group-data-[state=open]:rotate-180"
              aria-label="Expand/Collapse"
            />
          </AAccordionTrigger>
        </AAccordionHeader>

        <AAccordionContent class="overflow-hidden focus:outline-none data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div class="text-sm px-5 py-4">
            {{ item.content }}
          </div>
        </AAccordionContent>
      </AAccordionItem>
    </template>
  </AAccordionRoot>
</template>
