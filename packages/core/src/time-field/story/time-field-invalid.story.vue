<script setup lang="ts">
import { ALabel } from '~~/label';
import { ATimeFieldInput, ATimeFieldRoot } from '..';
</script>

<template>
  <Story
    title="Time Field/Invalid"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Default">
      <div class="flex flex-col gap-2">
        <ALabel
          class="text-gray9 text-sm"
          for="time-field"
        >
          Appointment
        </ALabel>
        <ATimeFieldRoot
          id="time-field"
          v-slot="{ segments, isInvalid }"
          granularity="second"
          class="border-gray9 color-green10 placeholder:text-mauve5 p-2 text-center border rounded bg-white flex select-none items-center data-[invalid]:outline-red-500 data-[invalid]:outline data-[invalid]:border-red-500"
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
              class="data-[placeholder]:color-green9 px-1 rounded-5px focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              {{ item.value }}
            </ATimeFieldInput>
          </template>

          <span
            v-if="isInvalid"
            class="text-red-500"
          >Invalid</span>
        </ATimeFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
