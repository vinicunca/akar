<script setup lang="ts">
import { ref } from 'vue'
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..'
import { Icon } from '@iconify/vue'

export interface TestProps {
  addOnTab?: boolean
  addOnBlur?: boolean
}

withDefaults(defineProps<TestProps>(), {
  addOnBlur: false,
  addOnTab: false,
})

const modelValue = ref(['Test'])
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    :add-on-blur="addOnBlur"
    :add-on-tab="addOnTab"
    class="flex gap-2 items-center border p-2 rounded-lg bg-blackA7 w-[300px] flex-wrap border-blackA7"
  >
    <ATagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="flex items-center justify-center gap-2 bg-green8 aria-[selected=true]:bg-green9 rounded px-2 py-1"
    >
      <ATagsInputItemText class="text-sm">
        {{ item }}
      </ATagsInputItemText>
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
