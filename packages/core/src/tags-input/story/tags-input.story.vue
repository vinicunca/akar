<script setup lang="ts">
import { ref } from 'vue'
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..'
import { Icon } from '@iconify/vue'

const modelValue = ref(['Test'])
</script>

<template>
  <Story
    title="TagsInput/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATagsInputRoot
        v-model="modelValue"
        class="flex gap-2 items-center border p-2 rounded-lg bg-blackA7 w-[300px] flex-wrap border-blackA7"
      >
        <ATagsInputItem
          v-for="item in modelValue"
          :key="item"
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
