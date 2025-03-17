<script setup lang="ts">
import type { ADrawerDirection } from '@vinicunca/akar';
import { ADrawerContent } from '@vinicunca/akar';

withDefaults(defineProps<{
  direction?: ADrawerDirection;
}>(), {
  direction: 'bottom',
});
</script>

<template>
  <ADrawerContent
    data-testid="content"
    class="fixed flex bg-zinc-100 p-6"
    :class="{
      'rounded-t-[10px] flex-col h-[50%] bottom-0 left-0 right-0': direction === 'bottom',
      'rounded-b-[10px] flex-col h-[50%] top-0 left-0 right-0': direction === 'top',
      'rounded-r-[10px] flex-row w-[50%] left-0 top-0 bottom-0': direction === 'left',
      'rounded-l-[10px] flex-row w-[50%] right-0 top-0 bottom-0': direction === 'right',
    }"
  >
    <div
      class="h-full w-full flex gap-8 rounded-full"
      :class="{
        'flex-col': direction === 'bottom',
        'flex-col-reverse': direction === 'top',
        'flex-row-reverse': direction === 'left',
        'flex-row ': direction === 'right',
      }"
    >
      <div
        class="rounded-full bg-zinc-300"
        :class="{
          'mx-auto w-12 h-1.5': direction === 'top' || direction === 'bottom',
          'my-auto h-12 w-1.5': direction === 'left' || direction === 'right',
        }"
      />

      <div class="grid h-full w-full place-content-center">
        <slot />
      </div>
    </div>
  </ADrawerContent>
</template>
