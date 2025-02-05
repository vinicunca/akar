<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref, watch } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxTrigger, AComboboxViewport } from '~~/combobox';
import { useFilter } from '~~/shared';

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
        <AComboboxAnchor class="w-[400px] inline-flex items-center justify-between gap-[5px] rounded-lg bg-white p-2 text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
          <ATagsInputRoot
            v-slot="{ modelValue: tags }"
            v-model="values"
            delimiter=""
            class="flex flex-wrap items-center gap-2 rounded-lg"
          >
            <ATagsInputItem
              v-for="item in tags"
              :key="item"
              :value="item"
              class="flex items-center justify-center gap-2 rounded bg-grass10 px-2 py-1 text-white aria-[current=true]:bg-grass11"
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
                class="flex-1 rounded bg-transparent px-1 placeholder:text-mauve10 focus:outline-none"
                @keydown.enter.prevent
              />
            </AComboboxInput>
          </ATagsInputRoot>

          <AComboboxTrigger>
            <Icon
              icon="radix-icons:chevron-down"
              class="h-4 w-4 text-grass11"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>
        <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <AComboboxViewport class="p-[5px]">
            <AComboboxGroup>
              <AComboboxLabel class="px-[25px] text-xs text-mauve11 leading-[25px]">
                Fruits
              </AComboboxLabel>

              <AComboboxItem
                v-for="(option, index) in filteredOptions"
                :key="index"
                class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-grass11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
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
    </Variant>
  </Story>
</template>
