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
          class="text-sm text-gray9"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="second"
          class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded bg-white p-2 text-center data-[invalid]:border-red-500"
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
              class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
          class="text-sm text-gray9"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="minute"
          class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded bg-white p-2 text-center data-[invalid]:border-red-500"
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
              class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
          class="text-sm text-gray9"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="hour"
          class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded bg-white p-2 text-center data-[invalid]:border-red-500"
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
              class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
          class="text-sm text-gray9"
          for="date-field"
        >
          Birthday
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments }"
          :is-date-unavailable="date => date.day === 19"
          granularity="day"
          class="text-green10 placeholder:text-mauve5 flex select-none items-center border border-gray9 rounded bg-white p-2 text-center data-[invalid]:border-red-500"
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
              class="rounded-5px px-1 data-[placeholder]:text-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>
        </ADateFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
