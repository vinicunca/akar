<script setup lang="ts">
import type { ANumberFieldRootProps } from '..'
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..'
import { Icon } from '@iconify/vue'

const props = defineProps<ANumberFieldRootProps>()
</script>

<template>
  <ANumberFieldRoot
    v-bind="props"
    id="number-field"
    data-testid="root"
    class="text-sm flex items-center border bg-blackA7 border-blackA9 rounded-md text-white"
  >
    <label
      for="number-field"
      data-testid="label"
    >Number Field</label>
    <ANumberFieldDecrement
      class="p-2"
      data-testid="decrement"
    >
      <Icon icon="radix-icons:minus" />
    </ANumberFieldDecrement>
    <ANumberFieldInput
      data-testid="input"
      class="bg-transparent w-32 tabular-nums focus:outline-0 p-1"
    />
    <ANumberFieldIncrement
      class="p-2"
      data-testid="increment"
    >
      <Icon icon="radix-icons:plus" />
    </ANumberFieldIncrement>
  </ANumberFieldRoot>
</template>
