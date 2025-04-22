<script setup lang="ts">
import { ADateRangeFieldInput, ADateRangeFieldRoot } from '..';
</script>

<template>
  <Story title="Date Range Field/Default">
    <Variant title="default">
      <ADateRangeFieldRoot
        id="date-field"
        v-slot="{ segments }"
        class="flex select-none items-center border border-gray9 rounded-lg bg-white p-1 text-center text-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
      >
        <template
          v-for="item in segments.start"
          :key="item.part"
        >
          <ADateRangeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
            type="start"
          >
            {{ item.value }}
          </ADateRangeFieldInput>
          <ADateRangeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 py-1 hover:bg-grass4 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            type="start"
          >
            {{ item.value }}
          </ADateRangeFieldInput>
        </template>
        -
        <template
          v-for="item in segments.end"
          :key="item.part"
        >
          <ADateRangeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
            type="end"
          >
            {{ item.value }}
          </ADateRangeFieldInput>
          <ADateRangeFieldInput
            v-else
            :part="item.part"
            class="rounded-5px px-1 py-1 hover:bg-grass4 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            type="end"
          >
            {{ item.value }}
          </ADateRangeFieldInput>
        </template>
      </ADateRangeFieldRoot>
    </Variant>
  </Story>
</template>
