<script setup lang="ts">
import { AMenuItem, AMenuSeparator } from '..';
import MenuWithAnchor from './_MenuWithAnchor.vue';

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text });
  // eslint-disable-next-line no-alert
  alert(text);
}
</script>

<template>
  <Story
    group="utilities"
    title="Menu/Styled"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <MenuWithAnchor>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('undo')"
        >
          Undo
        </AMenuItem>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('redo')"
        >
          Redo
        </AMenuItem>
        <AMenuSeparator class="separatorClass" />
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          disabled
          @select="handleSelect('cut')"
        >
          Cut
        </AMenuItem>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('copy')"
        >
          Copy
        </AMenuItem>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('paste')"
        >
          Paste
        </AMenuItem>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
