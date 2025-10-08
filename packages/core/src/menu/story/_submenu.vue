<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { AMenuPortal, AMenuSub, AMenuSubContent, AMenuSubTrigger } from '..';

const props = defineProps<{
  open: boolean;
  disabled?: boolean;
  heading?: string;
}>();

const open = useVModel(props, 'open');
</script>

<template>
  <AMenuSub v-model:open="open">
    <AMenuSubTrigger
      class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] w-full cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[state=open]:text-black data-[highlighted]:bg-black data-[state=open]:bg-black/10 data-[highlighted]:data-[state=open]:text-white data-[highlighted]:data-[state=open]:bg-black"
      :disabled="disabled"
    >
      {{ heading ?? "Submenu" }} →
    </AMenuSubTrigger>
    <AMenuPortal>
      <AMenuSubContent
        class="text-sm font-sans p-[5px] border border-gray-100 rounded-[6px] bg-white min-w-[130px] inline-block shadow-md box-border focus-within:border-black"
      >
        <slot />
      </AMenuSubContent>
    </AMenuPortal>
  </AMenuSub>
</template>
