<script setup lang="ts">
import { ref } from 'vue';

import { AMenuACheckboxItem, AMenuItemIndicator, AMenuSeparator } from '..';
import AMenuWithAnchor from './_a-menu-with-anchor.vue';
import TickIcon from './_a-tick-icon.vue';

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
    title="AMenu/ACheckboxItems"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <AMenuWithAnchor>
        <AMenuACheckboxItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
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
        </AMenuACheckboxItem>

        <AMenuSeparator class="mx-[10px] my-[5px] h-[1px] bg-gray-200" />

        <AMenuACheckboxItem
          v-for="(option, index) in options"
          :key="index"
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
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
        </AMenuACheckboxItem>
      </AMenuWithAnchor>
    </Variant>
  </Story>
</template>
