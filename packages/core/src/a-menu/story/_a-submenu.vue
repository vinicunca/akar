<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import { AMenuPortal, AMenuSub, AMenuSubContent, AMenuSubTrigger } from '..';

const props = defineProps<{
  disabled?: boolean;
  heading?: string;
  open: boolean;
}>();

const open = useVModel(props, 'open');
</script>

<template>
  <AMenuSub v-model:open="open">
    <AMenuSubTrigger
      class="data-[highlighted]:data-[state=open]:bg-black data-[highlighted]:data-[state=open]:text-white h-[25px] w-full flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[state=open]:bg-black/10 data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[state=open]:text-black"
      :disabled="disabled"
    >
      {{ heading ?? "Submenu" }} →
    </AMenuSubTrigger>
    <AMenuPortal>
      <AMenuSubContent
        class="box-border inline-block min-w-[130px] border border-gray-100 rounded-[6px] bg-white p-[5px] text-sm font-sans shadow-md focus-within:border-black"
      >
        <slot />
      </AMenuSubContent>
    </AMenuPortal>
  </AMenuSub>
</template>
