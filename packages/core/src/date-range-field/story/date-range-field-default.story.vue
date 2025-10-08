<script setup lang="ts">
import { ADateRangeFieldInput, ADateRangeFieldRoot } from '..';
</script>

<template>
  <Story title="Date Range Field/Default">
    <Variant title="default">
      <ADateRangeFieldRoot
        id="date-field"
        v-slot="{ segments }"
        class="border-gray9 color-green10 placeholder:text-mauve5 p-1 text-center border rounded-lg bg-white flex select-none items-center data-[invalid]:border-red-500"
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
            class="hover:bg-grass4 data-[placeholder]:color-green9 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
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
            class="hover:bg-grass4 data-[placeholder]:color-green9 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            type="end"
          >
            {{ item.value }}
          </ADateRangeFieldInput>
        </template>
      </ADateRangeFieldRoot>
    </Variant>
  </Story>
</template>
