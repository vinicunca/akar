<script setup lang="ts">
import { AMenuItem, AMenuSeparator } from '..'
import MenuWithAnchor from './_MenuWithAnchor.vue'

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text })
  // eslint-disable-next-line no-alert
  alert(text)
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
          class="flex items-center justify-between leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[highlighted]:text-white data-[highlighted]:bg-black data-[disabled]:text-gray-100"
          @select="handleSelect('undo')"
        >
          Undo
        </AMenuItem>
        <AMenuItem
          class="flex items-center justify-between leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[highlighted]:text-white data-[highlighted]:bg-black data-[disabled]:text-gray-100"
          @select="handleSelect('redo')"
        >
          Redo
        </AMenuItem>
        <AMenuSeparator class="separatorClass" />
        <AMenuItem
          class="flex items-center justify-between leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[highlighted]:text-white data-[highlighted]:bg-black data-[disabled]:text-gray-100"
          disabled
          @select="handleSelect('cut')"
        >
          Cut
        </AMenuItem>
        <AMenuItem
          class="flex items-center justify-between leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[highlighted]:text-white data-[highlighted]:bg-black data-[disabled]:text-gray-100"
          @select="handleSelect('copy')"
        >
          Copy
        </AMenuItem>
        <AMenuItem
          class="flex items-center justify-between leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[highlighted]:text-white data-[highlighted]:bg-black data-[disabled]:text-gray-100"
          @select="handleSelect('paste')"
        >
          Paste
        </AMenuItem>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
