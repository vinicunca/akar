<script setup lang="ts">
import { computed, ref } from 'vue';

import { countryList } from '~~/shared';

import { AListboxContent, AListboxFilter, AListboxItem, AListboxRoot } from '..';

const searchTerm = ref('');
const options = computed(() => searchTerm.value.trim() ? countryList.slice(0, 20).filter((i) => i.toLowerCase().includes(searchTerm.value.toLowerCase().trim())) : countryList.slice(0, 20));
</script>

<template>
  <Story
    title="AListbox/Filter"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Filter (Single)">
      <AListboxRoot class="mx-auto w-48 flex flex-col border rounded-lg bg-white p-1 text-green9">
        <AListboxFilter
          v-model="searchTerm"
          class="border rounded"
        />
        <AListboxContent class="h-72 overflow-auto">
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Filter (Multiple)">
      <AListboxRoot
        :multiple="true"
        class="mx-auto w-48 flex flex-col border rounded-lg bg-white p-1 text-green9"
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
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>
  </Story>
</template>
