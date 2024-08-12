<script setup lang="ts">
import Dialog from './_ADialog.vue';
</script>

<template>
  <Story
    title="ADialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <Dialog />
    </Variant>
  </Story>
</template>
