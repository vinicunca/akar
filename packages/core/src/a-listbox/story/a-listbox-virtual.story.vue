<script setup lang="ts">
import { computed, ref } from 'vue';

import { countryList } from '~~/shared';

import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot, AListboxVirtualizer } from '..';

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((item) => item.label.toLowerCase().includes(filterText.value.toLowerCase())) : options;
});
</script>

<template>
  <Story
    title="AListbox/Virtual"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Basic">
      <AListboxRoot class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxContent class="h-72 overflow-auto">
          <AListboxVirtualizer
            v-slot="{ option }"
            :options="filteredOptions"
            :text-content="(opt) => opt.label"
          >
            <AListboxItem
              :value="option"
              class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
            >
              {{ option.label }}
            </AListboxItem>
          </AListboxVirtualizer>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Filter">
      <div class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxRoot>
          <AListboxFilter
            v-model="filterText"
            type="text"
            class="w-full border rounded bg-white"
          />
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Single">
      <div class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxRoot>
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Multiple">
      <div class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxRoot multiple>
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Replace behavior (Single)">
      <div class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxRoot selection-behavior="replace">
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Replace behavior (Multiple)">
      <div class="mx-auto w-48 border rounded-lg bg-white p-1 text-green9">
        <AListboxRoot
          multiple
          selection-behavior="replace"
        >
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>
  </Story>
</template>
