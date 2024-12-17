<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot, type ATagsInputRootProps } from '..';

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
    class="bg-blackA7 border-blackA7 mt-6 w-[300px] flex flex-wrap items-center gap-2 border rounded-lg p-2"
  >
    <ATagsInputItem
      v-for="(item, i) in people"
      :key="i"
      :value="item"
      class="flex items-center justify-center gap-2 rounded bg-green8 px-2 py-1 aria-[current=true]:bg-green9 data-[disabled]:opacity-50"
    >
      <ATagsInputItemText class="text-sm" />
      <ATagsInputItemDelete>
        <Icon icon="lucide:x" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Anything..."
      class="placeholder:text-mauve10 flex-1 rounded bg-transparent px-1 text-white focus:outline-none"
    />
  </ATagsInputRoot>
</template>
