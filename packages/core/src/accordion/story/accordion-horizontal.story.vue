<script setup lang="ts">
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from '..';
</script>

<template>
  <Story
    title="Accordion/Horizontal"
    :layout="{ type: 'grid', width: '33%' }"
    auto-props-disabled
  >
    <Variant title="Horizontal Orientation">
      <AAccordionRoot
        class="rounded-md bg-[--line-color] w-[300px] shadow-lg"
        type="single"
        orientation="horizontal"
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
            Odio placerat <a href="#">quisque</a> sapien sagittis non sociis
            ligula penatibus dignissim vitae, enim vulputate nullam semper
            potenti etiam volutpat libero.
            <button>Cool</button>
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="item-3"
          disabled
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
