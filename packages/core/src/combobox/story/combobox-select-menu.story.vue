<script setup lang="ts">
import type { GenericComponentInstance } from '~~/shared/types';
import type { AComboboxRoot } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  AComboboxAnchor,
  AComboboxContent,
  AComboboxEmpty,
  AComboboxGroup,
  AComboboxInput,
  AComboboxItem,
  AComboboxItemIndicator,
  AComboboxLabel,
  AComboboxPortal,
  AComboboxSeparator,
  AComboboxTrigger,
  AComboboxViewport,
} from '..';

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

const comboboxRef = ref<GenericComponentInstance<typeof AComboboxRoot>>();
</script>

<template>
  <Story
    title="Combobox/SelectMenu"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AComboboxRoot
        v-slot="{ modelValue }"
        ref="comboboxRef"
      >
        <AComboboxAnchor
          as-child
          class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <AComboboxTrigger tabindex="0">
            <span>{{ modelValue }}</span>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-grass11 h-4 w-4"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>

        <AComboboxPortal>
          <AComboboxContent
            position="popper"
            class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden"
          >
            <AComboboxViewport class="p-[5px]">
              <AComboboxInput
                class="text-grass11 outline-none bg-transparent placeholder-gray-400"
                placeholder="Test"
              />

              <AComboboxEmpty class="text-mauve8 text-xs font-medium py-2 text-center" />

              <template
                v-for="(group, index) in options"
                :key="group.name"
              >
                <AComboboxGroup>
                  <AComboboxSeparator
                    v-if="index !== 0"
                    class="bg-grass6 m-[5px] h-[1px]"
                  />

                  <AComboboxLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
                    {{ group.name }}
                  </AComboboxLabel>

                  <AComboboxItem
                    v-for="option in group.children"
                    :key="option.name"
                    :value="option.name"
                    class="text-grass11 data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                  >
                    <AComboboxItemIndicator
                      class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                    >
                      <Icon icon="radix-icons:check" />
                    </AComboboxItemIndicator>
                    <span>
                      {{ option.name }}
                    </span>
                  </AComboboxItem>
                </AComboboxGroup>
              </template>
            </AComboboxViewport>
          </AComboboxContent>
        </AComboboxPortal>
      </AComboboxRoot>
    </Variant>
  </Story>
</template>
