<script setup lang="ts">
import { ref } from 'vue'
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot, type ATagsInputRootProps } from '..'
import { Icon } from '@iconify/vue'

const props = defineProps<ATagsInputRootProps>()
const people = ref([
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
])
defineExpose({ people })
</script>

<template>
  <ATagsInputRoot
    v-bind="props"
    v-model="people"
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
</template>
