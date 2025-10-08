<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ACheckboxGroupRoot, ACheckboxIndicator, ACheckboxRoot } from '..';

const items = [{ name: 'jack' }, { name: 'john' }, { name: 'mike' }];
const checkboxes = ref([items[1]]);
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
            class="shadow-blackA7 hover:bg-violet3 appearance-none outline-none rounded-[4px] bg-white flex h-[25px] w-[25px] shadow-[0_2px_10px] items-center justify-center focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="rounded bg-white flex h-full w-full items-center justify-center"
            >
              <Icon
                icon="radix-icons:check"
                class="text-black h-4 w-4"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <label
            :for="item.name"
            class="text-white select-none"
          >
            {{ item.name }}
          </label>
        </div>
      </ACheckboxGroupRoot>
    </Variant>
  </Story>
</template>
