<script setup lang="ts">
import { ref } from 'vue';
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from '..';

const selectedValue = ref('item-2');
</script>

<template>
  <Story
    title="Accordion/Single"
    :layout="{ type: 'grid', width: '33%' }"
    auto-props-disabled
  >
    <Variant title="Uncontrolled">
      <AAccordionRoot
        type="single"
        class="rounded-md bg-[--line-color] w-[300px] shadow-lg"
      >
        <AAccordionItem
          class="accordion-item"
          value="item-1"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it accessible?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-2"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it unstyled?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-3"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Can it be animated?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes! You can use the transition prop to configure the animation.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Controlled">
      <template #controls>
        modelValue: <input
          v-model="selectedValue"
          type="text"
        >
      </template>

      <AAccordionRoot
        v-model="selectedValue"
        class="rounded-md bg-[--line-color] w-[300px] shadow-lg"
      >
        <AAccordionItem
          class="accordion-item"
          value="item-1"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it accessible?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-2"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it unstyled?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-3"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Can it be animated?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes! You can use the transition prop to configure the animation.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Collapsible">
      <AAccordionRoot
        class="rounded-md bg-[--line-color] w-[300px] shadow-lg"
        type="single"
        :collapsible="true"
        default-value="item-2"
      >
        <AAccordionItem
          class="accordion-item"
          value="item-1"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it accessible?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-2"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Is it unstyled?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-3"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Can it be animated?
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Yes! You can use the transition prop to configure the animation.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>
  </Story>
</template>
