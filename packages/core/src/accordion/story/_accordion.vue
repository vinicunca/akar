<script setup lang="ts">
import type {
  AAccordionRootProps,
  AccordionRootEmits,
} from '..';
import { ref } from 'vue';
import { useEmitAsProps } from '~~/shared';
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
} from '..';

withDefaults(
  defineProps<{ type?: AAccordionRootProps['type'] }>(),
  { type: 'single' },
);
const emits = defineEmits<AccordionRootEmits>();
const values = ['One', 'Two', 'Three', 'Four'];
const count = ref(1);
</script>

<template>
  <AAccordionRoot
    class="w-[300px] rounded-md bg-[--line-color] shadow-lg"
    v-bind="useEmitAsProps(emits)"
    :type="type"
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
          Content {{ value }}
        </div>
      </AAccordionContent>
    </AAccordionItem>
  </AAccordionRoot>
</template>
