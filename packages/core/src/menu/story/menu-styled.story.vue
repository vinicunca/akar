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
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('undo')"
        >
          Undo
        </AMenuItem>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('redo')"
        >
          Redo
        </AMenuItem>
        <AMenuSeparator class="separatorClass" />
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          disabled
          @select="handleSelect('cut')"
        >
          Cut
        </AMenuItem>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('copy')"
        >
          Copy
        </AMenuItem>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('paste')"
        >
          Paste
        </AMenuItem>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
