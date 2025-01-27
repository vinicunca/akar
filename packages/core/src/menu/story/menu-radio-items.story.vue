<script setup lang="ts">
import { ref } from 'vue';
import {
  AMenuItem,
  AMenuItemIndicator,
  AMenuRadioGroup,
  AMenuRadioItem,
  AMenuSeparator,
} from '..';
import MenuWithAnchor from './_MenuWithAnchor.vue';
import TickIcon from './_TickIcon.vue';

const files = ['README.md', 'index.js', 'page.css'];

const selectedFiles = ref(files[1]);

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text });
}
</script>

<template>
  <Story
    title="Menu/RadioItems"
    group="utilities"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <MenuWithAnchor>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('minize')"
        >
          Minimize window
        </AMenuItem>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('zoom')"
        >
          Zoom
        </AMenuItem>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('Smaller')"
        >
          Smaller
        </AMenuItem>

        <AMenuSeparator class="mx-[10px] my-[5px] h-[1px] bg-gray-200" />

        <AMenuRadioGroup v-model="selectedFiles">
          <AMenuRadioItem
            v-for="(file, index) in files"
            :key="index"
            :value="file"
            class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          >
            {{ file }}
            <AMenuItemIndicator>
              <TickIcon />
            </AMenuItemIndicator>
          </AMenuRadioItem>
        </AMenuRadioGroup>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
