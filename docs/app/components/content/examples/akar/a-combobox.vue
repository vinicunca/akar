<script setup lang="ts">
import { AComboboxAnchor, AComboboxContent, AComboboxEmpty, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxPortal, AComboboxRoot, AComboboxSeparator, AComboboxTrigger, AComboboxViewport } from 'akar';

const options = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Honeydew' },
      { name: 'Grapes' },
      { name: 'Watermelon' },
      { name: 'Cantaloupe' },
      { name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { name: 'Cabbage' },
      { name: 'Broccoli' },
      { name: 'Carrots' },
      { name: 'Lettuce' },
      { name: 'Spinach' },
      { name: 'Bok Choy' },
      { name: 'Cauliflower' },
      { name: 'Potatoes' },
    ],
  },
];
</script>

<template>
  <AComboboxRoot
    class="inline-flex items-center relative"
  >
    <AComboboxAnchor
      class="text-sm color-text-highlighted px-2.5 py-1.5 pe-9 border-0 rounded-md bg-background gap-1.5 w-full ring ring-ring-accented ring-inset transition-colors-280 placeholder:color-text-dimmed focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed focus-visible:(ring-2 ring-primary ring-inset)"
      as-child
    >
      <AComboboxInput
        placeholder="Placeholder..."
      />
      <AComboboxTrigger class="group pe-2.5 flex items-center end-0 inset-y-0 absolute disabled:opacity-75 disabled:cursor-not-allowed">
        <i
          class="i-lucide:chevron-down color-text-dimmed shrink-0 size-5"
        />
      </AComboboxTrigger>
    </AComboboxAnchor>

    <AComboboxPortal>
      <AComboboxContent
        side="bottom"
        :side-offset="8"
        position="popper"
        class="rounded-md bg-background flex flex-col max-h-60 w-$akar-combobox-trigger-width pointer-events-auto ring ring-ring shadow-lg origin-$akar-combobox-content-transform-origin overflow-hidden data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <AComboboxViewport class="flex-1 relative overflow-y-auto scroll-py-1">
          <AComboboxEmpty class="color-text-muted text-center" />
          <template
            v-for="(group, index) in options"
            :key="group.name"
          >
            <AComboboxGroup class="p-1 isolate">
              <AComboboxSeparator
                v-if="index !== 0"
                class="my-1 bg-border h-px -mx-1"
              />
              <AComboboxLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
                {{ group.name }}
              </AComboboxLabel>
              <AComboboxItem
                v-for="option in group.children"
                :key="option.name"
                :value="option.name"
                class="group text-sm color-text p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-start relative before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-disabled]]:color-text-highlighted data-[highlighted]:not-[[data-disabled]]:before:bg-background-elevated/50"
              >
                <span class="flex flex-1 flex-col min-w-0">
                  {{ option.name }}
                </span>

                <span class="ms-auto inline-flex gap-1.5 items-center">
                  <AComboboxItemIndicator
                    as-child
                  >
                    <i class="i-lucide:check shrink-0 size-5" />
                  </AComboboxItemIndicator>
                </span>
              </AComboboxItem>
            </AComboboxGroup>
          </template>
        </AComboboxViewport>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
