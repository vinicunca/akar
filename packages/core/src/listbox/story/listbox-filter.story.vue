<script setup lang="ts">
import { computed, ref } from 'vue';
import { countryList } from '~~/shared/constant';
import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot } from '..';

const searchTerm = ref('');
const options = computed(() => searchTerm.value.trim() ? countryList.slice(0, 20).filter((i) => i.toLowerCase().includes(searchTerm.value.toLowerCase().trim())) : countryList.slice(0, 20));
</script>

<template>
  <Story
    title="Listbox/Filter"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Filter (Single)">
      <AListboxRoot class="color-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col w-48">
        <AListboxFilter
          v-model="searchTerm"
          class="border rounded"
        />
        <AListboxContent class="h-72 overflow-auto">
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="color-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Filter (Multiple)">
      <AListboxRoot
        :multiple="true"
        class="color-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col w-48"
      >
        <AListboxFilter
          v-model="searchTerm"
          class="border rounded"
        />
        <AListboxContent class="h-72 overflow-auto">
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="color-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>
  </Story>
</template>
