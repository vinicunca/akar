<script setup lang="ts">
import { ASelectItem, ASelectItemIndicator, ASelectItemText } from '..'
import { Icon } from '@iconify/vue'

defineProps<{
  options: string[]
}>()
</script>

<template>
  <ASelectItem
    v-for="(option, index) in options"
    :key="index"
    class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
    :value="option"
  >
    <ASelectItemIndicator
      class="absolute left-0 w-[25px] inline-flex items-center justify-center"
    >
      <Icon icon="radix-icons:check" />
    </ASelectItemIndicator>
    <ASelectItemText>
      {{ option }}
    </ASelectItemText>
  </ASelectItem>
</template>
