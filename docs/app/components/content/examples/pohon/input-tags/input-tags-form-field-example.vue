<script setup lang="ts">
import { ref } from 'vue';

const tags = ref(['Vue']);
</script>

<template>
  <PFormField
    label="Tags"
    required
  >
    <UInputTags
      v-model="tags"
      placeholder="Enter tags..."
    />
  </PFormField>
</template>
