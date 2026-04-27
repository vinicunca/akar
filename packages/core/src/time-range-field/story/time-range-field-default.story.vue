<script setup lang="ts">
import { ATimeRangeFieldInput, ATimeRangeFieldRoot } from '..';
</script>

<template>
  <Story title="Time Range Field/Default">
    <Variant title="default">
      <ATimeRangeFieldRoot
        id="time-field"
        v-slot="{ segments }"
        class="text-green10 placeholder:text-mauve5 border-gray9 p-1 text-center border rounded-lg bg-white flex select-none items-center data-[invalid]:border-red-500"
      >
        <template
          v-for="(item, index) in segments.start"
          :key="`${item.part}-${index}`"
        >
          <ATimeRangeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
            type="start"
          >
            {{ item.value }}
          </ATimeRangeFieldInput>
          <ATimeRangeFieldInput
            v-else
            :part="item.part"
            class="hover:bg-grass4 data-[placeholder]:text-green9 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            type="start"
          >
            {{ item.value }}
          </ATimeRangeFieldInput>
        </template>
        -
        <template
          v-for="(item, index) in segments.end"
          :key="`${item.part}-${index}`"
        >
          <ATimeRangeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
            type="end"
          >
            {{ item.value }}
          </ATimeRangeFieldInput>
          <ATimeRangeFieldInput
            v-else
            :part="item.part"
            class="hover:bg-grass4 data-[placeholder]:text-green9 px-1 py-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            type="end"
          >
            {{ item.value }}
          </ATimeRangeFieldInput>
        </template>
      </ATimeRangeFieldRoot>
    </Variant>
  </Story>
</template>
