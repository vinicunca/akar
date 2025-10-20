<script setup lang="ts">
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
    class="px-4 rounded-md bg-background w-[300px]"
    default-value="item-1"
    type="single"
    :collapsible="true"
  >
    <template
      v-for="item in items"
      :key="item.value"
    >
      <AAccordionItem
        class="border-b border-border last:border-b-none"
        :value="item.value"
      >
        <AAccordionHeader class="flex">
          <AAccordionTrigger class="group text-sm font-medium py-3.5 flex flex-1 gap-1.5 min-w-0 items-center focus-visible:outline-primary">
            <span>{{ item.title }}</span>
            <i
              class="i-radix-icons:chevron-down ms-auto shrink-0 size-5 transition-transform-280 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
              aria-label="Expand/Collapse"
            />
          </AAccordionTrigger>
        </AAccordionHeader>

        <AAccordionContent class="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div class="text-sm color-text-muted pb-4 pt-1">
            {{ item.content }}
          </div>
        </AAccordionContent>
      </AAccordionItem>
    </template>
  </AAccordionRoot>
</template>
