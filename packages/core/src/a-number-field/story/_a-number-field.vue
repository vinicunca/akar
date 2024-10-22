<script setup lang="ts">
import type { ANumberFieldRootProps } from '..';

import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..';

const props = defineProps<ANumberFieldRootProps>();
</script>

<template>
  <ANumberFieldRoot
    v-bind="props"
    id="number-field"
    data-testid="root"
    class="flex items-center border border-blackA9 rounded-md bg-blackA7 text-sm text-white"
  >
    <label
      for="number-field"
      data-testid="label"
    >Number Field</label>
    <ANumberFieldDecrement
      class="p-2"
      data-testid="decrement"
    >
      <i class="i-radix-icons:minus" />
    </ANumberFieldDecrement>

    <ANumberFieldInput
      data-testid="input"
      class="w-32 bg-transparent p-1 tabular-nums focus:outline-0"
    />

    <ANumberFieldIncrement
      class="p-2"
      data-testid="increment"
    >
      <i class="i-radix-icons:plus" />
    </ANumberFieldIncrement>
  </ANumberFieldRoot>
</template>
