<script setup lang="ts">
import { defineShortcuts } from '#imports';
import { useTemplateRef } from 'vue';

const input = useTemplateRef('input');

defineShortcuts({
  config:
  {
    '/': () => {
      input.value?.inputRef?.focus();
    },
  },
});
</script>

<template>
  <PInput
    ref="input"
    icon="i-lucide:search"
    placeholder="Search..."
  >
    <template #trailing>
      <PKbd value="/" />
    </template>
  </PInput>
</template>
