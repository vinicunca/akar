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
    </Variant>
  </Story>
</template>
