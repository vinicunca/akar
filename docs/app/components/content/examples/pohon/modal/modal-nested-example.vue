<script setup lang="ts">
import { ref } from 'vue';

const first = ref(false);
const second = ref(false);
</script>

<template>
  <PDialog
    v-model:open="first"
    title="First modal"
    :pohon="{ footer: 'justify-end' }"
  >
    <PButton
      color="neutral"
      variant="subtle"
      label="Open"
    />

    <template #footer>
      <PButton
        label="Close"
        color="neutral"
        variant="outline"
        @click="first = false"
      />

      <PDialog
        v-model:open="second"
        title="Second modal"
        :pohon="{ footer: 'justify-end' }"
      >
        <PButton
          label="Open second"
          color="neutral"
        />

        <template #footer>
          <PButton
            label="Close"
            color="neutral"
            variant="outline"
            @click="second = false"
          />
        </template>
      </PDialog>
    </template>
  </PDialog>
</template>
