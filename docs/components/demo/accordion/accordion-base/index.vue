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
    class="border rounded-lg bg-light-500 w-[300px] shadow-black/5 shadow-focus"
    default-value="item-1"
    type="single"
    :collapsible="true"
  >
    <template
      v-for="item in accordionItems"
      :key="item.value"
    >
      <AAccordionItem
        class="mt-px overflow-hidden first:mt-0 first:rounded-t-[7px] last:rounded-b-[7px]"
        :value="item.value"
      >
        <AAccordionHeader class="flex">
          <AAccordionTrigger class="group text-sm color-green-800 leading-none px-5 bg-white flex flex-1 h-[45px] shadow-[0_1px_0] shadow-slate-300 transition-colors-280 items-center justify-between focus-visible:outline-primary hover:bg-light-600">
            <span>{{ item.title }}</span>
            <Icon
              icon="radix-icons:chevron-down"
              class="color-green-600 transition-transform-280 group-data-[state=open]:rotate-180"
              aria-label="Expand/Collapse"
            />
          </AAccordionTrigger>
        </AAccordionHeader>
        <AAccordionContent class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-sm color-slate-700 bg-light-500 overflow-hidden focus:outline-none">
          <div class="px-5 py-4">
            {{ item.content }}
          </div>
        </AAccordionContent>
      </AAccordionItem>
    </template>
  </AAccordionRoot>
</template>
