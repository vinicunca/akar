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
    class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
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
      class="p-1 bg-transparent w-32 tabular-nums focus:outline-0"
    />
    <ANumberFieldIncrement
      class="p-2"
      data-testid="increment"
    >
      <Icon icon="radix-icons:plus" />
    </ANumberFieldIncrement>
  </ANumberFieldRoot>
</template>
