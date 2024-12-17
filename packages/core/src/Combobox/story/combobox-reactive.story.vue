<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxSeparator, AComboboxTrigger, AComboboxViewport } from '..';

const v = ref('Apple');
const searchTerm = ref('');
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];
</script>

<template>
  <Story
    title="Combobox/Reactive"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex flex-col">
        <button @click="v = 'Banana'">
          Set search term {{ searchTerm }} to "Banana"
        </button>
        <AComboboxRoot
          v-model="v"
          ignore-filter
        >
          <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 h-[35px] min-w-[160px] w-full inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
            <AComboboxInput
              v-model="searchTerm"
              class="text-grass11 w-full bg-transparent outline-none placeholder-gray-400"
              placeholder="Test"
            />
            <AComboboxTrigger>
              <Icon
                icon="radix-icons:chevron-down"
                class="text-grass11 h-4 w-4"
              />
            </AComboboxTrigger>
          </AComboboxAnchor>
          <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <AComboboxViewport class="p-[5px]">
              <AComboboxGroup>
                <AComboboxLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
                  Fruits
                </AComboboxLabel>

                <AComboboxItem
                  v-for="(option, index) in options"
                  :key="index"
                  class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                  :value="option"
                >
                  <AComboboxItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <Icon icon="radix-icons:check" />
                  </AComboboxItemIndicator>
                  <span>
                    {{ option }}
                  </span>
                </AComboboxItem>
                <AComboboxSeparator class="bg-grass6 m-[5px] h-[1px]" />
              </AComboboxGroup>

              <AComboboxGroup>
                <AComboboxLabel
                  class="text-mauve11 px-[25px] text-xs leading-[25px]"
                >
                  Vegetables
                </AComboboxLabel>
                <AComboboxItem
                  v-for="(option, index) in vegetables"
                  :key="index"
                  class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                  :value="option"
                >
                  <AComboboxItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <Icon icon="radix-icons:check" />
                  </AComboboxItemIndicator>
                  <span>
                    {{ option }}
                  </span>
                </AComboboxItem>
              </AComboboxGroup>
            </AComboboxViewport>
          </AComboboxContent>
        </AComboboxRoot>
      </div>
    </Variant>
  </Story>
</template>
