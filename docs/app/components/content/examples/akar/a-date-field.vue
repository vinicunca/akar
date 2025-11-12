<script setup lang="ts">
import { ADateFieldInput, ADateFieldRoot, ALabel } from 'akar';
</script>

<template>
  <div class="flex flex-col gap-2">
    <ALabel
      class="text-sm"
      for="birthday"
    >
      Birthday
    </ALabel>
    <ADateFieldRoot
      id="birthday"
      v-slot="{ segments }"
      :is-date-unavailable="date => date.day === 19"
      class="group text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex gap-0.5 select-none ring ring-ring-accented ring-inset transition-colors items-center relative focus-visible:(ring-2 ring-primary ring-inset)"
    >
      <template
        v-for="item in segments"
        :key="item.part"
      >
        <ADateFieldInput
          :part="item.part"
          class="text-center outline-hidden rounded transition-colors-280 data-[placeholder]:color-text-dimmed data-[segment=literal]:color-text-muted focus:bg-background-elevated"
          :class="{
            'w-11': item.part === 'year',
            'w-7': item.part === 'month' || item.part === 'day',
          }"
        >
          {{ item.value }}
        </ADateFieldInput>
      </template>
    </ADateFieldRoot>
  </div>
</template>
