<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { AMenuPortal, AMenuSub, AMenuSubContent, AMenuSubTrigger } from '..'

const props = defineProps<{
  open: boolean
  disabled?: boolean
  heading?: string
}>()

const open = useVModel(props, 'open')
</script>

<template>
  <AMenuSub v-model:open="open">
    <AMenuSubTrigger
      class="flex items-center justify-between w-full leading-[1] cursor-default select-none whitespace-nowrap h-[25px] px-[10px] text-black rounded-[3px] outline-none data-[state=open]:bg-black/10 data-[state=open]:text-black data-[highlighted]:bg-black data-[highlighted]:text-white data-[disabled]:text-gray-100 data-[highlighted]:data-[state=open]:bg-black data-[highlighted]:data-[state=open]:text-white"
      :disabled="disabled"
    >
      {{ heading ?? "Submenu" }} →
    </AMenuSubTrigger>
    <AMenuPortal>
      <AMenuSubContent
        class="inline-block box-border min-w-[130px] bg-white border border-gray-100 rounded-[6px] p-[5px] shadow-md font-sans text-sm focus-within:border-black"
      >
        <slot />
      </AMenuSubContent>
    </AMenuPortal>
  </AMenuSub>
</template>
