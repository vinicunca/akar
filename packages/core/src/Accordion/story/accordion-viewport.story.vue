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
    title="Accordion/AViewport"
    :layout="{ type: 'grid', width: '50%' }"
    auto-props-disabled
  >
    <Variant title="OutsideViewport">
      <p>Scroll down to see tabs</p>
      <div :style="{ height: '150vh' }" />
      <p>
        When accordion buttons are focused and the user is navigating via
        keyboard, the page should not scroll unless the next tab is entering the
        viewport.
      </p>
      <AAccordionRoot
        type="single"
        class=""
      >
        <AAccordionItem
          class="accordion-item"
          value="one"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              One
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Per erat orci nostra luctus sociosqu mus risus penatibus, duis elit
            vulputate viverra integer ullamcorper congue curabitur sociis, nisi
            malesuada scelerisque quam suscipit habitant sed.
          </AAccordionContent>
        </AAccordionItem>
        <AAccordionItem
          class="accordion-item"
          value="two"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Two
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Cursus sed mattis commodo fermentum conubia ipsum pulvinar sagittis,
            diam eget bibendum porta nascetur ac dictum, leo tellus dis integer
            platea ultrices mi.
          </AAccordionContent>
        </AAccordionItem>
        <AAccordionItem
          class="accordion-item"
          value="three"
          disabled
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Three (disabled)
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Sociis hac sapien turpis conubia sagittis justo dui, inceptos
            penatibus feugiat himenaeos euismod magna, nec tempor pulvinar eu
            etiam mattis.
          </AAccordionContent>
        </AAccordionItem>
        <AAccordionItem
          class="accordion-item"
          value="four"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Four
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            Odio placerat <a href="#">quisque</a> sapien sagittis non sociis
            ligula penatibus dignissim vitae, enim vulputate nullam semper
            potenti etiam volutpat libero.
            <button>Cool</button>
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
      <div :style="{ height: '150vh' }" />
    </Variant>
  </Story>
</template>
