<script setup lang="ts">
import { ALabel } from '~~/label';
import { ADateFieldInput, ADateFieldRoot } from '..';
</script>

<template>
  <Story
    title="Date Field/Granular"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Granular (second)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="second"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ADateFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ADateFieldInput>
            <ADateFieldInput
              v-else
              :part="item.part"
              class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>
        </ADateFieldRoot>
      </div>
    </Variant>

    <Variant title="Granular (minute)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="minute"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ADateFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ADateFieldInput>
            <ADateFieldInput
              v-else
              :part="item.part"
              class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>
        </ADateFieldRoot>
      </div>
    </Variant>

    <Variant title="Granular (hour)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="hour"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ADateFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ADateFieldInput>
            <ADateFieldInput
              v-else
              :part="item.part"
              class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>
        </ADateFieldRoot>
      </div>
    </Variant>

    <Variant title="Granular (day)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="day"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:border-red-500"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ADateFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ADateFieldInput>
            <ADateFieldInput
              v-else
              :part="item.part"
              class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>
        </ADateFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
