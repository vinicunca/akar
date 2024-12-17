<script setup lang="ts">
import { ref } from 'vue'
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..'
import { Icon } from '@iconify/vue'

const people = ref([
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
])

function displayValue(value: { id: number, name: string }) {
  return `123${value.name}`
}

function convertValue(value: string) {
  return { id: people.value.length + 1, name: value }
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
        class="flex gap-2 items-center border p-2 rounded-lg bg-blackA7 w-[300px] flex-wrap border-blackA7 mt-6"
      >
        <ATagsInputItem
          v-for="(item, i) in people"
          :key="i"
          :value="item"
          class=" data-[disabled]:opacity-50 flex items-center justify-center gap-2 bg-green8 aria-[current=true]:bg-green9 rounded px-2 py-1"
        >
          <ATagsInputItemText class="text-sm" />
          <ATagsInputItemDelete>
            <Icon icon="lucide:x" />
          </ATagsInputItemDelete>
        </ATagsInputItem>

        <ATagsInputInput
          placeholder="Anything..."
          class="focus:outline-none flex-1 rounded bg-transparent text-white placeholder:text-mauve10 px-1"
        />
      </ATagsInputRoot>
    </Variant>
  </Story>
</template>
