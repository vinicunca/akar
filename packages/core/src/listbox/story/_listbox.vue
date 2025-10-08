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
    class="color-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
  >
    <AListboxContent aria-label="options">
      <AListboxItem
        v-for="i in filteredOptions.map(i => i.label).slice(0, 50)"
        :key="i"
        :value="i"
        class="color-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
      >
        {{ i }}
      </AListboxItem>
    </AListboxContent>
  </AListboxRoot>
</template>
