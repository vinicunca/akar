<script setup lang="ts">
import { ref } from 'vue';

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);
const value = ref('Backlog');
</script>

<template>
  <PInputMenu
    v-model="value"
    :items="items"
    :pohon="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
    }"
  />
</template>
