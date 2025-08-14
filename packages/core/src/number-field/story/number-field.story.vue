<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..';
</script>

<template>
  <Story
    title="NumberField/Basic"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <ANumberFieldRoot
        class="text-sm text-white"
        :min="0"
        :default-value="18"
      >
        <div class="border-blackA9 bg-blackA7 mt-1 border rounded-md flex items-center">
          <ANumberFieldDecrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:minus" />
          </ANumberFieldDecrement>
          <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
          <ANumberFieldIncrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:plus" />
          </ANumberFieldIncrement>
        </div>
      </ANumberFieldRoot>
    </Variant>
  </Story>
</template>
