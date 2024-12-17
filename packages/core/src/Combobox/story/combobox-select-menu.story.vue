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
          class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
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
            class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          >
            <AComboboxViewport class="p-[5px]">
              <AComboboxInput
                class="text-grass11 bg-transparent outline-none placeholder-gray-400"
                placeholder="Test"
              />

              <AComboboxEmpty class="text-mauve8 py-2 text-center text-xs font-medium" />

              <template
                v-for="(group, index) in options"
                :key="group.name"
              >
                <AComboboxGroup>
                  <AComboboxSeparator
                    v-if="index !== 0"
                    class="bg-grass6 m-[5px] h-[1px]"
                  />

                  <AComboboxLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
                    {{ group.name }}
                  </AComboboxLabel>

                  <AComboboxItem
                    v-for="option in group.children"
                    :key="option.name"
                    :value="option.name"
                    class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                  >
                    <AComboboxItemIndicator
                      class="absolute left-0 w-[25px] inline-flex items-center justify-center"
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
