<script setup lang="ts">
import { ref } from 'vue';
import { AMenuCheckboxItem, AMenuItemIndicator, AMenuSeparator } from '..';
import MenuWithAnchor from './_MenuWithAnchor.vue';
import TickIcon from './_TickIcon.vue';

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws'];

const selection = ref<Array<string>>([]);

function handleSelectAll() {
  if (selection.value.length === options.length) {
    selection.value = [];
  } else {
    selection.value = options;
  }
}
</script>

<template>
  <Story
    group="utilities"
    title="Menu/CheckboxItems"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <MenuWithAnchor>
        <AMenuCheckboxItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          :model-value="
            selection.length === options.length
              ? true
              : selection.length
                ? 'indeterminate'
                : false
          "
          @update:model-value="handleSelectAll"
        >
          Select All
          <AMenuItemIndicator>
            <TickIcon v-if="selection.length === options.length" />
          </AMenuItemIndicator>
        </AMenuCheckboxItem>

        <AMenuSeparator class="mx-[10px] my-[5px] bg-gray-200 h-[1px]" />

        <AMenuCheckboxItem
          v-for="(option, index) in options"
          :key="index"
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          :model-value="selection.includes(option)"
          @update:model-value="
            () => {
              if (selection.includes(option)) {
                selection = selection.filter((el) => el !== option);
              }
              else {
                selection = selection.concat(option);
              }
            }
          "
        >
          {{ option }}

          <AMenuItemIndicator>
            <TickIcon />
          </AMenuItemIndicator>
        </AMenuCheckboxItem>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
