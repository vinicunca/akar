<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from 'akar';

const items = [
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
    class="bg-mauve6 border rounded-lg w-[300px] shadow-[0_2px_10px] shadow-black/5"
    default-value="item-1"
    type="single"
    :collapsible="true"
  >
    <template
      v-for="item in items"
      :key="item.value"
    >
      <AAccordionItem
        class="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t-[7px] last:rounded-b-[7px] focus-within:shadow-[0_0_0_2px] focus-within:relative focus-within:z-10"
        :value="item.value"
      >
        <AAccordionHeader class="flex">
          <AAccordionTrigger class="text-grass11 shadow-mauve6 hover:bg-mauve2 group text-sm leading-none px-5 outline-none bg-white flex flex-1 h-[45px] cursor-default shadow-[0_1px_0] items-center justify-between">
            <span>{{ item.title }}</span>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-green10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
              aria-label="Expand/Collapse"
            />
          </AAccordionTrigger>
        </AAccordionHeader>
        <AAccordionContent class="text-mauve11 bg-mauve2 text-sm overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div class="px-5 py-4">
            {{ item.content }}
          </div>
        </AAccordionContent>
      </AAccordionItem>
    </template>
  </AAccordionRoot>
</template>
