<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from '..';

export interface TestProps {
  addOnTab?: boolean;
  addOnBlur?: boolean;
}

withDefaults(defineProps<TestProps>(), {
  addOnBlur: false,
  addOnTab: false,
});

const modelValue = ref(['Test']);
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    :add-on-blur="addOnBlur"
    :add-on-tab="addOnTab"
    class="bg-blackA7 border-blackA7 w-[300px] flex flex-wrap items-center gap-2 border rounded-lg p-2"
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
        <Icon icon="lucide:x" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Anything..."
      class="placeholder:text-mauve10 flex-1 rounded bg-transparent px-1 text-white focus:outline-none"
    />
  </ATagsInputRoot>
</template>
