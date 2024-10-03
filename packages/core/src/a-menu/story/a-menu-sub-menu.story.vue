<script setup lang="ts">
import { ref } from 'vue';

import { AMenuItem, AMenuSeparator } from '..';
import AMenuWithAnchor from './_a-menu-with-anchor.vue';
import Submenu from './_a-submenu.vue';

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
    title="AMenu/SubAMenu"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="text-black">
        <span>{{ open1 }}</span>
        <span>{{ open2 }}</span>
      </div>
      <AMenuWithAnchor>
        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('undo')"
        >
          Undo
        </AMenuItem>

        <Submenu
          v-model:open="open1"
          :disabled="true"
        >
          <AMenuItem
            class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
            disabled
          >
            Disabled
          </AMenuItem>
          <AMenuItem
            class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
            @select="handleSelect('one')"
          >
            One
          </AMenuItem>
          <AMenuItem
            class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
            @select="handleSelect('Two')"
          >
            Two
          </AMenuItem>

          <Submenu v-model:open="open2">
            <AMenuItem
              class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
              @select="handleSelect('one')"
            >
              One
            </AMenuItem>
            <AMenuItem
              class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
              @select="handleSelect('Two')"
            >
              Two
            </AMenuItem>
            <AMenuItem
              class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
              @select="handleSelect('Three')"
            >
              Three
            </AMenuItem>
            <AMenuItem
              class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
              @select="handleSelect('Four')"
            >
              Four
            </AMenuItem>
          </Submenu>
        </Submenu>

        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          @select="handleSelect('cut')"
        >
          Cut
        </AMenuItem>

        <AMenuSeparator class="mx-[10px] my-[5px] h-[1px] bg-gray-200" />

        <AMenuItem
          class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
          :disabled="true"
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
      </AMenuWithAnchor>
    </Variant>
  </Story>
</template>
