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
    class="border-blackA7 bg-blackA7 p-2 border rounded-lg flex flex-wrap gap-2 w-[300px] items-center"
  >
    <ATagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="bg-green8 aria-[selected=true]:bg-green9 px-2 py-1 rounded flex gap-2 items-center justify-center"
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
      class="placeholder:text-mauve10 text-white px-1 rounded bg-transparent flex-1 focus:outline-none"
    />
  </ATagsInputRoot>
</template>
