<script setup lang="ts">
import { computed, ref } from 'vue';
import { countryList } from '~~/shared/constant';
import { AListboxContent, AListboxItem, AListboxRoot } from '..';

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((item) => item.label.toLowerCase().includes(filterText.value.toLowerCase())) : options;
});
</script>

<template>
  <Story
    title="Listbox/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <AListboxRoot class="color-green9 mx-auto border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto">
      <AListboxContent class="p-1">
        <AListboxItem
          v-for="i in filteredOptions.map(i => i.label).slice(0, 50)"
          :key="i"
          :value="i"
          class="color-green9 data-[state=checked]:bg-green9 data-[highlighted]:ring-green9 focus:ring-green9 text-sm px-2 py-1 outline-none rounded w-full select-none data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:ring-1 focus:ring-1"
        >
          {{ i }}
        </AListboxItem>
      </AListboxContent>
    </AListboxRoot>
  </Story>
</template>
