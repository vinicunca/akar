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
    class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
    :value="option"
  >
    <ASelectItemIndicator
      class="inline-flex w-[25px] items-center left-0 justify-center absolute"
    >
      <Icon icon="radix-icons:check" />
    </ASelectItemIndicator>
    <ASelectItemText>
      {{ option }}
    </ASelectItemText>
  </ASelectItem>
</template>
