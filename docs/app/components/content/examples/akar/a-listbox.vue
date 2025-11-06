<script setup lang="ts">
import { AListboxContent, AListboxGroup, AListboxGroupLabel, AListboxItem, AListboxItemIndicator, AListboxRoot } from 'akar';

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];
</script>

<template>
  <AListboxRoot class="inline-flex items-center relative">
    <AListboxContent class="rounded-md bg-background flex flex-col w-48 pointer-events-auto ring ring-ring shadow-lg">
      <AListboxGroup class="p-1 isolate">
        <AListboxGroupLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
          Fruits
        </AListboxGroupLabel>
        <AListboxItem
          v-for="i in fruits"
          :key="i"
          :value="i"
          class="text-sm color-text p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-start relative before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) hover:not-[[data-disabled]]:color-text-highlighted hover:not-[[data-disabled]]:before:bg-background-elevated/50"
        >
          <span class="flex flex-1 flex-col min-w-0">
            {{ i }}
          </span>

          <span class="ms-auto inline-flex gap-1.5 items-center">
            <AListboxItemIndicator
              as-child
            >
              <i class="i-lucide:check shrink-0 size-5" />
            </AListboxItemIndicator>
          </span>
        </AListboxItem>
      </AListboxGroup>

      <AListboxGroup class="mt-2">
        <AListboxGroupLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
          Vegetables
        </AListboxGroupLabel>
        <AListboxItem
          v-for="i in vegetables"
          :key="i"
          :value="i"
          class="text-sm color-text p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-start relative before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) hover:not-[[data-disabled]]:color-text-highlighted hover:not-[[data-disabled]]:before:bg-background-elevated/50"
        >
          <span class="flex flex-1 flex-col min-w-0">
            {{ i }}
          </span>

          <span class="ms-auto inline-flex gap-1.5 items-center">
            <AListboxItemIndicator
              as-child
            >
              <i class="i-lucide:check shrink-0 size-5" />
            </AListboxItemIndicator>
          </span>
        </AListboxItem>
      </AListboxGroup>
    </AListboxContent>
  </AListboxRoot>
</template>
