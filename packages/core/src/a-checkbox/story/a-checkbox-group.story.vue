<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import { ACheckboxGroupRoot, ACheckboxIndicator, ACheckboxRoot } from '..';

const items = [{ name: 'jack' }, { name: 'john' }, { name: 'mike' }];
const checkboxes = ref([items[1]]);
</script>

<template>
  <Story
    title="ACheckbox/Group"
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
          class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            :id="item.name"
            :value="item"
            class="h-[25px] w-[25px] flex appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="h-full w-full flex items-center justify-center rounded bg-white"
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
