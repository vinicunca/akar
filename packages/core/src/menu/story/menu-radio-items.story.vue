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
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('minize')"
        >
          Minimize window
        </AMenuItem>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('zoom')"
        >
          Zoom
        </AMenuItem>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('Smaller')"
        >
          Smaller
        </AMenuItem>

        <AMenuSeparator class="mx-[10px] my-[5px] bg-gray-200 h-[1px]" />

        <AMenuRadioGroup v-model="selectedFiles">
          <AMenuRadioItem
            v-for="(file, index) in files"
            :key="index"
            :value="file"
            class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
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
