<script setup lang="ts">
import { defineShortcuts } from '#imports';
import { ref } from 'vue';

const open = ref(false);
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);
const value = ref('Backlog');

defineShortcuts({
  o: () => {
    open.value = !open.value;
  },
});
</script>

<template>
  <PInputMenu
    v-model="value"
    v-model:open="open"
    :items="items"
  />
</template>
