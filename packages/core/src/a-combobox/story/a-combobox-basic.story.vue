<script setup lang="ts">
import { AComboboxAnchor, AComboboxContent, AComboboxEmpty, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxSeparator, AComboboxTrigger, AComboboxViewport } from '..';

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
  <Story
    title="ACombobox/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AComboboxRoot>
        <AComboboxAnchor class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
          <AComboboxInput
            class="bg-transparent text-grass11 outline-none placeholder-gray-400"
            placeholder="Test"
          />
          <AComboboxTrigger>
            <i class="i-radix-icons:chevron-down h-4 w-4 text-grass11" />
          </AComboboxTrigger>
        </AComboboxAnchor>
        <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <AComboboxViewport class="p-[5px]">
            <AComboboxEmpty class="py-2 text-center text-xs text-mauve8 font-medium" />

            <template
              v-for="(group, index) in options"
              :key="group.name"
            >
              <AComboboxGroup>
                <AComboboxSeparator
                  v-if="index !== 0"
                  class="m-[5px] h-[1px] bg-grass6"
                />

                <AComboboxLabel class="px-[25px] text-xs text-mauve11 leading-[25px]">
                  {{ group.name }}
                </AComboboxLabel>

                <AComboboxItem
                  v-for="option in group.children"
                  :key="option.name"
                  :value="option.name"
                  class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-grass11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
                >
                  <AComboboxItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <i class="i-radix-icons:check" />
                  </AComboboxItemIndicator>
                  <span>
                    {{ option.name }}
                  </span>
                </AComboboxItem>
              </AComboboxGroup>
            </template>
          </AComboboxViewport>
        </AComboboxContent>
      </AComboboxRoot>
    </Variant>
  </Story>
</template>
