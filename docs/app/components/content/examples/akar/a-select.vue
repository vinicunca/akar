<script setup lang="ts">
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
} from 'akar';
import { ref } from 'vue';

const fruit = ref();

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];
</script>

<template>
  <ASelectRoot v-model="fruit">
    <ASelectTrigger
      class="group text-sm color-text-highlighted px-2.5 py-1.5 pe-9 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center relative focus:(outline-none ring-2 ring-primary ring-inset)"
      aria-label="Customise options"
    >
      <ASelectValue
        class="pointer-events-none truncate"
        placeholder="ASelect a fruit..."
      />
      <span class="pe-2.5 flex items-center end-0 inset-y-0 absolute">
        <span
          class="i-lucide:chevron-down color-text-dimmed shrink-0 size-5"
        />
      </span>
    </ASelectTrigger>

    <ASelectPortal>
      <ASelectContent
        class="rounded-md bg-white flex flex-col max-h-60 w-$akar-select-trigger-width pointer-events-auto ring ring-ring shadow-lg origin-$akar-select-content-transform-origin overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:animate-duration-280 data-[state=open]:animate-duration-280 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:data-[side=bottom]:slide-in-top-5% data-[state=closed]:data-[side=bottom]:slide-out-top-5%"
        :side-offset="5"
      >
        <ASelectViewport class="p-[5px]">
          <ASelectGroup class="p-1 isolate">
            <ASelectLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
              Fruits
            </ASelectLabel>

            <ASelectItem
              v-for="(option, index) in fruits"
              :key="index"
              class="group text-sm p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-center relative data-[state=checked]:color-primary before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-state=checked]]:color-black data-[state=checked]:before:bg-background-elevated data-[highlighted]:not-[[data-state=checked]]:before:bg-primary/30"
              :value="option"
            >
              <ASelectItemText class="flex flex-1 flex-col min-w-0">
                {{ option }}
              </ASelectItemText>

              <span class="ms-auto inline-flex gap-1.5 items-center">
                <ASelectItemIndicator class="shrink-0 size-5">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
              </span>
            </ASelectItem>
          </ASelectGroup>
          <ASelectSeparator class="my-1 bg-border h-px -mx-1" />
          <ASelectGroup class="p-1 isolate">
            <ASelectLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
              Vegetables
            </ASelectLabel>
            <ASelectItem
              v-for="(option, index) in vegetables"
              :key="index"
              class="group text-sm p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-center relative data-[state=checked]:color-primary before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-state=checked]]:color-black data-[state=checked]:before:bg-background-elevated data-[highlighted]:not-[[data-state=checked]]:before:bg-primary/30"
              :value="option"
              :disabled="option === 'Courgette'"
            >
              <ASelectItemText class="flex flex-1 flex-col min-w-0">
                {{ option }}
              </ASelectItemText>

              <span class="ms-auto inline-flex gap-1.5 items-center">
                <ASelectItemIndicator class="shrink-0 size-5">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
              </span>
            </ASelectItem>
          </ASelectGroup>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
