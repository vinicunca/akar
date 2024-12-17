<script setup lang="ts">
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from '..';

const items = ['One', 'Two', 'Three', 'Four'];
</script>

<template>
  <Story
    title="Accordion/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
    auto-props-disabled
  >
    <Variant title="Uncontrolled (Single closed)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Uncontrolled (Single open)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        default-value="Two"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiple closed)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="multiple"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiple open)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="multiple"
        :default-value="['One', 'Two']"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Controlled (Single open)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        model-value="Three"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Controlled (Multiple open)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="multiple"
        :model-value="['Two', 'Three']"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Disabled (whole)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        disabled
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Disabled (item)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
          :disabled="item === 'Two'"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="Disabled (with `disabled=false` on top-level)">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        :disabled="false"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
          :disabled="item === 'Two'"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <!-- <Variant title="Force mounted contents">
      <AAccordionRoot
        class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
        type="single"
        :disabled="false"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="accordion-item"
          :value="item"
          :disabled="item === 'Two'"
        >
          <AAccordionHeader class="flex">
            <AAccordionTrigger class="accordion-trigger">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="accordion-content" forceMount>
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant> -->

    <Variant title="State attributes (Accordion disabled)">
      <AAccordionRoot
        class="root-attr w-[300px]"
        type="single"
        disabled
        default-value="Two"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="item-attr"
          :value="item"
        >
          <AAccordionHeader class="header-attr">
            <AAccordionTrigger class="trigger-attr">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="content-attr">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="State attributes (Accordion enabled with item override)">
      <AAccordionRoot
        class="root-attr w-[300px]"
        type="single"
        :disabled="false"
        default-value="Two"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="item-attr"
          :value="item"
          :disabled="['Two', 'Four'].includes(item)"
        >
          <AAccordionHeader class="header-attr">
            <AAccordionTrigger class="trigger-attr">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="content-attr">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>

    <Variant title="State attributes (Accordion disabled with item override)">
      <AAccordionRoot
        class="root-attr w-[300px]"
        type="single"
        disabled
        default-value="Two"
      >
        <AAccordionItem
          v-for="item in items"
          :key="item"
          class="item-attr"
          :value="item"
          :disabled="['Two', 'Four'].includes(item) ? false : undefined"
        >
          <AAccordionHeader class="header-attr">
            <AAccordionTrigger class="trigger-attr">
              {{ item }}
            </AAccordionTrigger>
          </AAccordionHeader>
          <AAccordionContent class="content-attr">
            {{ item }}: Per erat orci nostra luctus sociosqu mus risus
            penatibus, duis elit vulputate viverra integer ullamcorper congue
            curabitur sociis, nisi malesuada scelerisque quam suscipit habitant
            sed.
          </AAccordionContent>
        </AAccordionItem>
      </AAccordionRoot>
    </Variant>
  </Story>
</template>

<style scoped>
.root-attr,
.item-attr,
.header-attr,
.trigger-attr,
.content-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
  &[data-disabled] {
    border-style: dashed;
  }
  &:disabled {
    opacity: 0.5;
  }
}

.content-attr {
  display: block;
}
</style>
