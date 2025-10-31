<script setup lang="ts">
import { ref } from 'vue';

const page = ref(5);

function to(page: number) {
  return {
    query: {
      page,
    },
    hash: '#with-links',
  };
}
</script>

<template>
  <PPagination
    v-model:page="page"
    :total="100"
    :to="to"
    :sibling-count="1"
    show-edges
  />
</template>
