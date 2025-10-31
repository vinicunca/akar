<script setup lang="ts">
import { ref } from 'vue';

const retries = ref(0);
</script>

<template>
  <PFormField
    label="Retries"
    help="Specify number of attempts"
    required
  >
    <PInputNumber
      v-model="retries"
      placeholder="Enter retries"
    />
  </PFormField>
</template>
