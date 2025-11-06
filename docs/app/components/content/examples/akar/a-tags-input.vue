<script setup lang="ts">
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from 'akar';
import { ref } from 'vue';

const modelValue = ref(['Apple', 'Banana']);
</script>

<template>
  <ATagsInputRoot
    v-model="modelValue"
    class="text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex flex-wrap gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center relative has-focus-visible:(ring-2 ring-primary ring-inset)"
  >
    <ATagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="text-xs color-text font-medium px-1.5 py-0.5 rounded-sm bg-background-elevated inline-flex gap-0.5 wrap-anywhere ring ring-ring-accented ring-inset items-center data-[state='active']:bg-background-accented data-[disabled]:(opacity-75 cursor-not-allowed)"
    >
      <ATagsInputItemText />
      <ATagsInputItemDelete class="color-text-dimmed rounded-xs inline-flex transition-colors-280 items-center hover:(color-text bg-background-accented/75) disabled:pointer-events-none">
        <i class="i-lucide:x shrink-0 size-3.5" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Fruits..."
      class="border-0 bg-transparent flex-1 placeholder:color-text-dimmed focus:outline-none disabled:(opacity-75 cursor-not-allowed)"
    />
  </ATagsInputRoot>
</template>
