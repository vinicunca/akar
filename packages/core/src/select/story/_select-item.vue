<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ASelectItem, ASelectItemIndicator, ASelectItemText } from '..';

defineProps<{
  options: Array<string>;
}>();
</script>

<template>
  <ASelectItem
    v-for="(option, index) in options"
    :key="index"
    class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
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
