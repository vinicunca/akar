<script setup lang="ts">
import { ref } from 'vue';

import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

export interface TestProps {
  addOnBlur?: boolean;
  addOnTab?: boolean;
}

withDefaults(
  defineProps<TestProps>(),
  {
    addOnBlur: false,
    addOnTab: false,
  },
);

const modelValue = ref(['Test']);
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    :add-on-blur="addOnBlur"
    :add-on-tab="addOnTab"
    class="w-[300px] flex flex-wrap items-center gap-2 border border-blackA7 rounded-lg bg-blackA7 p-2"
  >
    <ATagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="flex items-center justify-center gap-2 rounded bg-green8 px-2 py-1 aria-[selected=true]:bg-green9"
    >
      <ATagsInputItemText class="text-sm">
        {{ item }}
      </ATagsInputItemText>
      <ATagsInputItemDelete>
        <i class="i-lucide:x" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Anything..."
      class="flex-1 rounded bg-transparent px-1 text-white placeholder:text-mauve10 focus:outline-none"
    />
  </ATagsInputRoot>
</template>
