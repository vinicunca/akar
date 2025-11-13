<script setup lang="ts">
import { ALabel, ATimeFieldInput, ATimeFieldRoot } from 'akar';
</script>

<template>
  <div class="flex flex-col gap-2">
    <ALabel
      class="text-sm"
      for="birthday"
    >
      Birthday
    </ALabel>
    <ATimeFieldRoot
      id="birthday"
      v-slot="{ segments }"
      class="group text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex gap-0.5 select-none ring ring-ring-accented ring-inset transition-colors items-center relative focus-visible:(ring-2 ring-primary ring-inset)"
    >
      <template
        v-for="item in segments"
        :key="item.part"
      >
        <ATimeFieldInput
          :part="item.part"
          class="text-center outline-hidden rounded transition-colors-280 data-[placeholder]:color-text-dimmed data-[segment=literal]:color-text-muted focus:bg-background-elevated"
          :class="{
            'w-7': item.part !== 'literal',
          }"
        >
          {{ item.value }}
        </ATimeFieldInput>
      </template>
    </ATimeFieldRoot>
  </div>
</template>
