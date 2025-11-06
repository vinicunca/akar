<script setup lang="ts">
import { ARadioGroupIndicator, ARadioGroupItem, ARadioGroupRoot } from 'akar';
import { ref } from 'vue';

const radioStateSingle = ref('1');

const items = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];
</script>

<template>
  <ARadioGroupRoot
    v-model="radioStateSingle"
    class="flex flex-col gap-x-2 gap-y-1"
    aria-label="View density"
  >
    <div
      v-for="item in items"
      :key="item.value"
      class="text-sm flex flex-row items-start"
    >
      <div class="flex h-5 items-center">
        <ARadioGroupItem
          :id="item.value"
          class="rounded-full size-4 ring ring-ring-accented ring-inset overflow-hidden focus-visible:(outline-2 outline-primary outline-offset-2)"
          :value="item.value"
        >
          <ARadioGroupIndicator
            class="bg-primary flex size-full items-center justify-center after:(rounded-full bg-background size-1.5 content-empty)"
          />
        </ARadioGroupItem>
      </div>

      <div class="ms-2 w-full">
        <label
          :for="item.value"
          class="color-text font-medium block"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </ARadioGroupRoot>
</template>
