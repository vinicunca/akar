<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
const password = ref('');
</script>

<template>
  <PInput
    v-model="password"
    placeholder="Password"
    :type="show ? 'text' : 'password'"
    :pohon="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <PButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide:eye-off' : 'i-lucide:eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </PInput>
</template>

<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>
