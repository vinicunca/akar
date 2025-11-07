<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref, watch } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxTrigger, AComboboxViewport } from '../combobox';
import { useFilter } from '../../shared';

import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

const { contains } = useFilter({ sensitivity: 'base' });

const query = ref('');
const values = ref(['Apple']);
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];

const filteredOptions = computed(() => options.filter((option) => contains({ string: option, substring: query.value }) && !values.value.includes(option)));

watch(values, () => {
  query.value = '';
}, { deep: true });
</script>

<template>
  <Story
    title="TagsInput/Combobox"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AComboboxRoot
        v-model="values"
        multiple
        class="my-4"
      >
        <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 text-[13px] leading-none p-2 outline-none rounded-lg bg-white inline-flex gap-[5px] w-[400px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black">
          <ATagsInputRoot
            v-slot="{ modelValue: tags }"
            v-model="values"
            delimiter=""
            class="rounded-lg flex flex-wrap gap-2 items-center"
          >
            <ATagsInputItem
              v-for="item in tags"
              :key="item"
              :value="item"
              class="bg-grass10 aria-[current=true]:bg-grass11 text-white px-2 py-1 rounded flex gap-2 items-center justify-center"
            >
              <ATagsInputItemText class="text-sm" />
              <ATagsInputItemDelete>
                <Icon icon="lucide:x" />
              </ATagsInputItemDelete>
            </ATagsInputItem>

            <AComboboxInput
              v-model="query"
              as-child
            >
              <ATagsInputInput
                placeholder="Fruits..."
                class="placeholder:text-mauve10 px-1 rounded bg-transparent flex-1 focus:outline-none"
                @keydown.enter.prevent
              />
            </AComboboxInput>
          </ATagsInputRoot>

          <AComboboxTrigger>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-grass11 h-4 w-4"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>
        <AComboboxContent class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden">
          <AComboboxViewport class="p-[5px]">
            <AComboboxGroup>
              <AComboboxLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
                Fruits
              </AComboboxLabel>

              <AComboboxItem
                v-for="(option, index) in filteredOptions"
                :key="index"
                class="text-grass11 data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                :value="option"
              >
                <AComboboxItemIndicator
                  class="inline-flex w-[25px] items-center left-0 justify-center absolute"
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
    </Variant>
  </Story>
</template>
