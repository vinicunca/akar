<script setup lang="ts">
import type { ANumberFieldRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..';

const props = defineProps<ANumberFieldRootProps>();
</script>

<template>
  <ANumberFieldRoot
    v-bind="props"
    id="number-field"
    data-testid="root"
    class="bg-blackA7 border-blackA9 flex items-center border rounded-md text-sm text-white"
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
      class="w-32 bg-transparent p-1 tabular-nums focus:outline-0"
    />
    <ANumberFieldIncrement
      class="p-2"
      data-testid="increment"
    >
      <Icon icon="radix-icons:plus" />
    </ANumberFieldIncrement>
  </ANumberFieldRoot>
</template>
