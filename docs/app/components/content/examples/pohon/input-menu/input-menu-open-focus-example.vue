<script setup lang="ts">
import { ref } from 'vue';

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);
const selected = ref('Backlog');
</script>

<template>
  <PInputMenu
    v-model="selected"
    :items="items"
    open-on-focus
  />
</template>
