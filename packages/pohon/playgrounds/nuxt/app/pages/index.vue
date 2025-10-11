<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);
const value = ref('Backlog');
</script>

<template>
  <PInput
    icon="i-mdi:email-outline"
    leading
    placeholder="Email"
  />
</template>
