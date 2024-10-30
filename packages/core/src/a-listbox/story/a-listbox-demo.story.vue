<script setup lang="ts">
import { computed, ref } from 'vue';

import { countryList } from '~~/shared';

import { AListboxContent, AListboxItem, AListboxRoot } from '..';

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((item) => item.label.toLowerCase().includes(filterText.value.toLowerCase())) : options;
});
</script>

<template>
  <Story
    title="AListbox/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <AListboxRoot class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white text-green9">
      <AListboxContent class="p-1">
        <AListboxItem
          v-for="i in filteredOptions.map(i => i.label).slice(0, 50)"
          :key="i"
          :value="i"
          class="w-full select-none rounded px-2 py-1 text-sm text-green9 outline-none data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:ring-1 focus:ring-1 data-[highlighted]:ring-green9 focus:ring-green9"
        >
          {{ i }}
        </AListboxItem>
      </AListboxContent>
    </AListboxRoot>
  </Story>
</template>
