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
        class="border-blackA7 bg-blackA7 p-2 border rounded-lg flex flex-wrap gap-2 w-[300px] items-center"
      >
        <ATagsInputItem
          v-for="item in modelValue"
          :key="item"
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
