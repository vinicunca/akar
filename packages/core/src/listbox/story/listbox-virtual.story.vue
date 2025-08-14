<script setup lang="ts">
import { computed, ref } from 'vue';
import { countryList } from '~~/shared/constant';
import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot, AListboxVirtualizer } from '..';

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((item) => item.label.toLowerCase().includes(filterText.value.toLowerCase())) : options;
});
</script>

<template>
  <Story
    title="Listbox/Virtual"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Basic">
      <AListboxRoot class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
        <AListboxContent class="h-72 overflow-auto">
          <AListboxVirtualizer
            v-slot="{ option }"
            :options="filteredOptions"
            :text-content="(opt) => opt.label"
          >
            <AListboxItem
              :value="option"
              class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
            >
              {{ option.label }}
            </AListboxItem>
          </AListboxVirtualizer>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Filter">
      <div class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
        <AListboxRoot>
          <AListboxFilter
            v-model="filterText"
            type="text"
            class="border rounded bg-white w-full"
          />
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Single">
      <div class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
        <AListboxRoot>
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Multiple">
      <div class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
        <AListboxRoot multiple>
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Replace behavior (Single)">
      <div class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
        <AListboxRoot selection-behavior="replace">
          <AListboxContent class="h-64 w-full overflow-auto">
            <AListboxVirtualizer
              v-slot="{ option }"
              :text-content="(option) => option.value"
              :options="filteredOptions"
            >
              <AListboxItem
                :value="option"
                class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
              >
                {{ option.label }}
              </AListboxItem>
            </AListboxVirtualizer>
          </AListboxContent>
        </AListboxRoot>
      </div>
    </Variant>

    <Variant title="Replace behavior (Multiple)">
      <div class="text-green9 mx-auto p-1 border rounded-lg bg-white w-48">
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
                class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline focus:ring-0"
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
