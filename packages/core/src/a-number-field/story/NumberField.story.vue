<script setup lang="ts">
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Story
    title="ANumberField/Basic"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <ANumberFieldRoot
        class="text-sm  text-white"
        :min="0"
        :default-value="18"
      >
        <div class="mt-1 flex items-center border bg-blackA7 border-blackA9 rounded-md">
          <ANumberFieldDecrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:minus" />
          </ANumberFieldDecrement>
          <ANumberFieldInput class="bg-transparent w-20 tabular-nums focus:outline-0 p-1" />
          <ANumberFieldIncrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:plus" />
          </ANumberFieldIncrement>
        </div>
      </ANumberFieldRoot>
    </Variant>
  </Story>
</template>
