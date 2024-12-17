<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useFilter } from '~~/shared';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxTrigger, AComboboxViewport } from '..';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'].map((v, i) => ({ id: i, name: v }));

const { contains } = useFilter({ sensitivity: 'base' });
const v1 = ref(people[0]);
const searchTerm1 = ref('');
const filteredPeople = computed(() => people.filter((i) => contains({ string: i.name, substring: searchTerm1.value })));

const v2 = ref(vegetables[0]);
const searchTerm2 = ref('');
const filteredVege = computed(() => vegetables.filter((i) => contains({ string: i.name, substring: searchTerm2.value })));
</script>

<template>
  <Story
    title="Combobox/Object"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      title="Display Value"
      auto-props-disabled
    >
      <AComboboxRoot
        v-model="v1"
        by="name"
        ignore-filter
      >
        <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          <AComboboxInput
            v-model="searchTerm1"
            :display-value="(ev: typeof people[0]) => {
              return ev.name
            }"
            class="text-grass11 bg-transparent outline-none placeholder-gray-400"
            placeholder="Test"
          />
          <AComboboxTrigger>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-grass11 h-4 w-4"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>
        <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <AComboboxViewport class="bg-white p-[5px] empty:invisible">
            <AComboboxGroup v-if="filteredPeople.length">
              <AComboboxLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
                People
              </AComboboxLabel>

              <AComboboxItem
                v-for="option in filteredPeople"
                :key="option.id"
                class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                :value="option"
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
          </AComboboxViewport>
        </AComboboxContent>
      </AComboboxRoot>
    </Variant>

    <Variant
      title="Filtering"
      auto-props-disabled
    >
      <AComboboxRoot
        v-model="v2"
        by="name"
        ignore-filter
      >
        <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          <AComboboxInput
            v-model="searchTerm2"
            class="text-grass11 bg-transparent outline-none placeholder-gray-400"
            placeholder="Test"
          />
          <AComboboxTrigger>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-grass11 h-4 w-4"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>
        <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <AComboboxViewport class="bg-white p-[5px] empty:invisible">
            <AComboboxGroup v-if="filteredVege.length">
              <AComboboxLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
                Vegetables
              </AComboboxLabel>

              <AComboboxItem
                v-for="option in filteredVege"
                :key="option.id"
                class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
                :value="option"
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
          </AComboboxViewport>
        </AComboboxContent>
      </AComboboxRoot>
    </Variant>
  </Story>
</template>
