<script setup lang="ts">
import { ATimeFieldInput, ATimeFieldRoot } from '..'
import { ALabel } from '~~/label'
</script>

<template>
  <Story title="Time Field/Default">
    <Variant title="default">
      <div class="flex flex-col gap-2 text-black">
        <ALabel
          class="text-sm text-gray9"
          for="time-field"
        >
          Appointment
        </ALabel>
        <ATimeFieldRoot
          id="time-field"
          v-slot="{ segments, isInvalid }"
          granularity="second"
          class="flex select-none bg-white items-center rounded text-center text-green10 placeholder:text-mauve5 border border-gray9 p-2 data-[invalid]:border-red-500 data-[invalid]:outline data-[invalid]:outline-red-500"
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
              class="rounded-5px px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
            >
              {{ item.value }}
            </ATimeFieldInput>
          </template>

          <span
            v-if="isInvalid"
            class="text-red-500"
          >
            Invalid
          </span>
        </ATimeFieldRoot>
      </div>
    </Variant>
  </Story>
</template>
