<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ACheckboxGroupRoot, ACheckboxIndicator, ACheckboxRoot } from '..'

const items = [{ name: 'jack' }, { name: 'john' }, { name: 'mike' }]
const checkboxes = ref([items[1]])
</script>

<template>
  <Story
    title="Checkbox/Group"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ACheckboxGroupRoot
        v-model="checkboxes"
        name="test"
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
    </Variant>
  </Story>
</template>
