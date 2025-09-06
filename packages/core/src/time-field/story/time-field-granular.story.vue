<script setup lang="ts">
import { ALabel } from '~~/label';
import { ATimeFieldInput, ATimeFieldRoot } from '..';
</script>

<template>
  <Story
    title="Time Field/Granular"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Granular (second)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="time-field"
        >
          Time
        </ALabel>
        <ATimeFieldRoot
          id="time-field"
          v-slot="{ segments }"
          granularity="second"
          class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center color-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ATimeFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ATimeFieldInput>
            <ATimeFieldInput
              v-else
              :part="item.part"
              class="rounded-5px px-1 data-[placeholder]:color-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              {{ item.value }}
            </ATimeFieldInput>
          </template>
        </ATimeFieldRoot>
      </div>
    </Variant>

    <Variant title="Granular (minute)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="time-field"
        >
          Time
        </ALabel>
        <ATimeFieldRoot
          id="time-field"
          v-slot="{ segments }"
          granularity="minute"
          class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center color-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ATimeFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ATimeFieldInput>
            <ATimeFieldInput
              v-else
              :part="item.part"
              class="rounded-5px px-1 data-[placeholder]:color-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              {{ item.value }}
            </ATimeFieldInput>
          </template>
        </ATimeFieldRoot>
      </div>
    </Variant>

    <Variant title="Granular (hour)">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="time-field"
        >
          Time
        </ALabel>
        <ATimeFieldRoot
          id="time-field"
          v-slot="{ segments }"
          granularity="hour"
          class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center color-green10 data-[invalid]:border-red-500 placeholder:text-mauve5"
        >
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <ATimeFieldInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </ATimeFieldInput>
            <ATimeFieldInput
              v-else
              :part="item.part"
              class="rounded-5px px-1 data-[placeholder]:color-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              {{ item.value }}
            </ATimeFieldInput>
          </template>
        </ATimeFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
