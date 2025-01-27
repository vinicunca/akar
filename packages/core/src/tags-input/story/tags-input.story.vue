<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

const modelValue = ref(['Test']);
</script>

<template>
  <Story
    title="TagsInput/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATagsInputRoot
        v-model="modelValue"
        class="bg-blackA7 border-blackA7 w-[300px] flex flex-wrap items-center gap-2 border rounded-lg p-2"
      >
        <ATagsInputItem
          v-for="item in modelValue"
          :key="item"
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
