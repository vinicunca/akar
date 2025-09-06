<script setup lang="ts">
import { ALabel } from '~~/label';
import { ADateFieldInput, ADateFieldRoot } from '..';
</script>

<template>
  <Story
    title="Date Field/Invalid"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-sm text-gray9"
          for="date-field"
        >
          Appointment (unavailable on 19th)
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments, isInvalid }"
          :is-date-unavailable="date => date.day === 19"
          granularity="day"
          class="flex select-none items-center border border-gray9 rounded bg-white p-2 text-center color-green10 data-[invalid]:border-red-500 placeholder:text-mauve5 data-[invalid]:outline-red-500 data-[invalid]:outline"
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
              class="rounded-5px px-1 data-[placeholder]:color-green9 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            >
              {{ item.value }}
            </ADateFieldInput>
          </template>

          <span
            v-if="isInvalid"
            class="text-red-500"
          >Invalidddd</span>
        </ADateFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
