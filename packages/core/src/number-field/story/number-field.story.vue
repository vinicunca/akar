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
        <div class="mt-1 flex items-center border border-blackA9 rounded-md bg-blackA7">
          <ANumberFieldDecrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:minus" />
          </ANumberFieldDecrement>
          <ANumberFieldInput class="w-20 bg-transparent p-1 tabular-nums focus:outline-0" />
          <ANumberFieldIncrement class="p-2 disabled:opacity-20">
            <Icon icon="radix-icons:plus" />
          </ANumberFieldIncrement>
        </div>
      </ANumberFieldRoot>
    </Variant>
  </Story>
</template>
