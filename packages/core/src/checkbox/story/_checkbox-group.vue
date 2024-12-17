<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ACheckboxGroupRootProps } from '..'
import { ACheckboxGroupRoot, ACheckboxIndicator, ACheckboxRoot } from '..'
import { ref } from 'vue'

const props = defineProps<ACheckboxGroupRootProps<any>>()
const modelValue = ref([])

const items = [{ name: 'jack' }, { name: 'john' }, { name: 'mike' }]
</script>

<template>
  <ACheckboxGroupRoot
    v-bind="props"
    v-model="modelValue"
    class="flex flex-col gap-2.5"
  >
    <div
      v-for="item in items"
      :key="item.name"
      class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
    >
      <ACheckboxRoot
        :id="item.name"
        :value="item"
        :aria-label="item.name"
        class="shadow-blackA7 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus-within:shadow-[0_0_0_2px_black]"
      >
        <ACheckboxIndicator
          class="bg-white h-full w-full rounded flex items-center justify-center"
        >
          <Icon
            icon="radix-icons:check"
            class="h-4 w-4 text-black"
          />
        </ACheckboxIndicator>
      </ACheckboxRoot>
      <label
        :for="item.name"
        class="select-none text-white"
      >
        {{ item.name }}
      </label>
    </div>
  </ACheckboxGroupRoot>
</template>
