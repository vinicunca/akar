<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

const people = ref([
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
]);

function displayValue(value: { id: number; name: string }) {
  return `123${value.name}`;
}

function convertValue(value: string) {
  return { id: people.value.length + 1, name: value };
}
</script>

<template>
  <Story
    title="TagsInput/Object"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      {{ JSON.stringify(people) }}
      <ATagsInputRoot
        v-model="people"
        :convert-value="convertValue"
        :display-value="displayValue"
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
    </Variant>
  </Story>
</template>
