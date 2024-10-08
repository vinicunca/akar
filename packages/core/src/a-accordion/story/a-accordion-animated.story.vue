<script setup lang="ts">
import { ref, watch } from 'vue';

import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from '..';

const values = ['One', 'Two', 'Three', 'Four'];
const count = ref(1);
const hasDynamicContent = ref(false);
const timer = ref(0);

watch(hasDynamicContent, () => {
  if (hasDynamicContent.value) {
    timer.value = window.setInterval(() => {
      const nextCount = count.value < 5 ? count.value + 1 : count.value;
      if (nextCount === 5) {
        hasDynamicContent.value = false;
      }
      count.value = nextCount;
    }, 3000);
  } else {
    clearInterval(timer.value);
  }
});

const selectedValue = ref(['One', 'Two', 'Three', 'Four']);
</script>

<template>
  <Story
    title="AAccordion/Animated"
    :layout="{ type: 'grid', width: '50%' }"
    auto-props-disabled
  >
    <Variant title="Closed by default">
      <template #controls>
        modelValue: <input
          v-model="hasDynamicContent"
          type="checkbox"
        >
      </template>

      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
      >
        <AAccordionItem
          v-for="value in values"
          :key="value"
          class="accordion-item"
          :value="value"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ value }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            v-for="i in count"
            :key="i"
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Per erat orci nostra luctus sociosqu mus risus penatibus, duis
              elit vulputate viverra integer ullamcorper congue curabitur
              sociis, nisi malesuada scelerisque quam suscipit habitant sed.
            </div>
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Open by default">
      <template #controls>
        modelValue: <input
          v-model="hasDynamicContent"
          type="checkbox"
        >
      </template>

      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        default-value="One"
      >
        <AAccordionItem
          v-for="value in values"
          :key="value"
          class="accordion-item"
          :value="value"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ value }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            v-for="i in count"
            :key="i"
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Per erat orci nostra luctus sociosqu mus risus penatibus, duis
              elit vulputate viverra integer ullamcorper congue curabitur
              sociis, nisi malesuada scelerisque quam suscipit habitant sed.
            </div>
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Animated 2D">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
      >
        <AAccordionItem
          v-for="value in values"
          :key="value"
          class="accordion-item"
          :value="value"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ value }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            class="accordion-animated-content data-[state=open]:animate-open2D data-[state=closed]:animate-close2D overflow-hidden"
          >
            <div class="overflow-hidden px-5 py-4">
              <div :style="{ width: 'calc(20em - 20px)', height: 100 }">
                Per erat orci nostra luctus sociosqu mus risus penatibus, duis
                elit vulputate viverra integer ullamcorper congue curabitur
                sociis, nisi malesuada scelerisque quam suscipit habitant sed.
              </div>
            </div>
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Animated Controlled">
      <AAccordionRoot
        v-model="selectedValue"
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="multiple"
      >
        <AAccordionItem
          class="accordion-item"
          value="One"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              one
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="Two"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Two
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Yes. It's unstyled by default, giving you freedom over the look
              and feel.
            </div>
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="Three"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Three
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Yes! You can use the transition prop to configure the animation.
            </div>
          </AAccordionContent>
        </AAccordionItem>

        <AAccordionItem
          class="accordion-item"
          value="Four"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              Four
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent
            class="accordion-animated-content data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="px-5 py-4">
              Yes! You can use the transition prop to configure the animation.
            </div>
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>
  </Story>
</template>
