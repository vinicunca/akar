<script setup lang="ts">
import type { AListboxRootEmits, AListboxRootProps } from '..';
import { computed, ref } from 'vue';
import { useForwardPropsEmits } from '~~/shared';
import { countryList } from '~~/shared/constant';
import { AListboxContent, AListboxItem, AListboxRoot } from '..';

const props = defineProps<AListboxRootProps>();
const emits = defineEmits<AListboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const filterText = ref('');
const filteredOptions = computed(() => {
  const options = countryList.map((a) => ({ label: a, value: a }));
  return filterText.value ? options.filter((item) => item.label.toLowerCase().includes(filterText.value.toLowerCase())) : options;
});
</script>

<template>
  <AListboxRoot
    v-bind="forwarded"
    class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 color-green9"
  >
    <AListboxContent aria-label="options">
      <AListboxItem
        v-for="i in filteredOptions.map(i => i.label).slice(0, 50)"
        :key="i"
        :value="i"
        class="w-full select-none rounded px-2 py-1 text-sm color-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
      >
        {{ i }}
      </AListboxItem>
    </AListboxContent>
  </AListboxRoot>
</template>
