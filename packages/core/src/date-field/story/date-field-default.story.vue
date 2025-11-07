<script setup lang="ts">
import { ALabel } from '../label';
import { ADateFieldInput, ADateFieldRoot } from '..';
</script>

<template>
  <Story title="Date Field/Default">
    <Variant title="default">
      <div class="text-black flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="date-field"
        >
          Appointment (unavailable on 19th)
        </ALabel>
        <ADateFieldRoot
          id="date-field"
          v-slot="{ segments, isInvalid }"
          :is-date-unavailable="date => date.day === 19"
          granularity="second"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:outline-red-500 data-[invalid]:outline data-[invalid]:border-red-500"
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

          <span
            v-if="isInvalid"
            class="text-red-500"
          >
            Invalid
          </span>
        </ADateFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
