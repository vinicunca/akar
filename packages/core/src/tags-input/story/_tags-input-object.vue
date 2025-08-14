<script setup lang="ts">
import type { ATagsInputRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

const props = defineProps<ATagsInputRootProps>();
const people = ref([
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
]);
defineExpose({ people });
</script>

<template>
  <ATagsInputRoot
    v-bind="props"
    v-model="people"
    class="border-blackA7 bg-blackA7 mt-6 p-2 border rounded-lg flex flex-wrap gap-2 w-[300px] items-center"
  >
    <ATagsInputItem
      v-for="(item, i) in people"
      :key="i"
      :value="item"
      class="bg-green8 aria-[current=true]:bg-green9 px-2 py-1 rounded flex gap-2 items-center justify-center data-[disabled]:opacity-50"
    >
      <ATagsInputItemText class="text-sm" />
      <ATagsInputItemDelete>
        <Icon icon="lucide:x" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Anything..."
      class="placeholder:text-mauve10 text-white px-1 rounded bg-transparent flex-1 focus:outline-none"
    />
  </ATagsInputRoot>
</template>
