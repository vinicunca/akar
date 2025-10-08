<script setup lang="ts">
import { ref } from 'vue';
import { AMenuItem, AMenuSeparator } from '..';
import MenuWithAnchor from './_MenuWithAnchor.vue';
import Submenu from './_Submenu.vue';

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text });
}

const open1 = ref(false);
const open2 = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="Menu/SubMenu"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="text-black">
        <span>{{ open1 }}</span>
        <span>{{ open2 }}</span>
      </div>
      <MenuWithAnchor>
        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('undo')"
        >
          Undo
        </AMenuItem>

        <Submenu
          v-model:open="open1"
          :disabled="true"
        >
          <AMenuItem
            class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
            disabled
          >
            Disabled
          </AMenuItem>
          <AMenuItem
            class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
            @select="handleSelect('one')"
          >
            One
          </AMenuItem>
          <AMenuItem
            class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
            @select="handleSelect('Two')"
          >
            Two
          </AMenuItem>

          <Submenu v-model:open="open2">
            <AMenuItem
              class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
              @select="handleSelect('one')"
            >
              One
            </AMenuItem>
            <AMenuItem
              class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
              @select="handleSelect('Two')"
            >
              Two
            </AMenuItem>
            <AMenuItem
              class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
              @select="handleSelect('Three')"
            >
              Three
            </AMenuItem>
            <AMenuItem
              class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
              @select="handleSelect('Four')"
            >
              Four
            </AMenuItem>
          </Submenu>
        </Submenu>

        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          @select="handleSelect('cut')"
        >
          Cut
        </AMenuItem>

        <AMenuSeparator class="mx-[10px] my-[5px] bg-gray-200 h-[1px]" />

        <AMenuItem
          class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
          :disabled="true"
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
