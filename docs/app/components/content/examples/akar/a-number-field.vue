<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from 'akar';
</script>

<template>
  <ANumberFieldRoot
    id="age"
    :min="0"
    :default-value="18"
  >
    <label
      for="age"
      class="text-stone-700 dark:text-white"
    >
      Age
    </label>
    <div class="mt-1 border rounded-lg bg-white flex h-9 shadow-sm items-center hover:bg-stone-50 focus-within:shadow-[0_0_0_2px] focus-within:shadow-stone-800">
      <ANumberFieldDecrement class="p-2 disabled:opacity-20">
        <Icon icon="radix-icons:minus" />
      </ANumberFieldDecrement>
      <ANumberFieldInput class="p-1 text-center bg-transparent w-20 tabular-nums focus:outline-0" />
      <ANumberFieldIncrement class="p-2 disabled:opacity-20">
        <Icon icon="radix-icons:plus" />
      </ANumberFieldIncrement>
    </div>
  </ANumberFieldRoot>
</template>
