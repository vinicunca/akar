<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useFilter } from '~~/shared';
import { countryList } from '~~/shared/constant';
import { AComboboxAnchor, AComboboxContent, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxRoot, AComboboxTrigger, AComboboxViewport, AComboboxVirtualizer } from '..';

const { startsWith } = useFilter({ sensitivity: 'base' });

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((opt) => startsWith({ string: opt.label, substring: filterText.value })) : options;
});
</script>

<template>
  <Story
    title="Combobox/Virtual"
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
          <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] w-[200px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between relative focus:shadow-[0_0_0_2px] focus:shadow-black">
            <AComboboxInput
              v-model="filterText"
              class="text-grass11 outline-none bg-transparent placeholder-gray-400"
              placeholder="Test"
            />
            <AComboboxTrigger>
              <Icon
                icon="radix-icons:chevron-down"
                class="text-grass11 h-4 w-4"
              />
            </AComboboxTrigger>
          </AComboboxAnchor>
          <AComboboxContent class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 p-[5px] will-change-[opacity,transform] rounded bg-white w-[200px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] absolute">
            <AComboboxViewport class="max-h-80 overflow-y-auto">
              <AComboboxVirtualizer
                v-slot="{ option }"
                :options="filteredOptions"
                :estimate-size="25"
                :text-content="(opt) => opt.label"
              >
                <AComboboxItem
                  class="text-grass11 data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] w-full select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                  :value="option"
                >
                  <AComboboxItemIndicator
                    class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                  >
                    <Icon icon="radix-icons:check" />
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
