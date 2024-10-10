<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFilter } from '~~/shared';
import { countryList } from '~~/test';

import { AComboboxAnchor, AComboboxContent, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxRoot, AComboboxTrigger, AComboboxViewport, AComboboxVirtualizer } from '..';

const { startsWith } = useFilter({ sensitivity: 'base' });

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value
    ? options.filter((opt) => startsWith({ string: opt.label, substring: filterText.value }))
    : options;
});
</script>

<template>
  <Story
    title="ACombobox/Virtual"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant
      title="default"
      auto-props-disabled
    >
      <div class="flex justify-center">
        <AComboboxRoot
          name="test"
          multiple
        >
          <AComboboxAnchor class="relative h-[35px] w-[200px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
            <AComboboxInput
              v-model="filterText"
              class="bg-transparent text-grass11 outline-none placeholder-gray-400"
              placeholder="Test"
            />
            <AComboboxTrigger>
              <i
                class="i-radix-icons:chevron-down h-4 w-4 text-grass11"
              />
            </AComboboxTrigger>
          </AComboboxAnchor>
          <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade absolute mt-2 w-[200px] rounded bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <AComboboxViewport class="max-h-80 overflow-y-auto">
              <AComboboxVirtualizer
                v-slot="{ option }"
                :options="filteredOptions"
                :estimate-size="25"
                :text-content="(opt) => opt.label"
              >
                <AComboboxItem
                  class="relative h-[25px] w-full flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-grass11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
                  :value="option"
                >
                  <AComboboxItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <i class="i-radix-icons:check" />
                  </AComboboxItemIndicator>
                  <span class="truncate">
                    {{ option.label }}
                  </span>
                </AComboboxItem>
              </AComboboxVirtualizer>
            </AComboboxViewport>
          </AComboboxContent>
        </AComboboxRoot>
      </div>
    </Variant>
  </Story>
</template>
