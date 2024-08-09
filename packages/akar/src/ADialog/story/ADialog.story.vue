<script setup lang="ts">
import Dialog from './_ADialog.vue';
</script>

<template>
  <Story
    title="ADialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant
      group="utilities"
      title="Akar Dialog"
    >
      <Dialog />
    </Variant>
  </Story>
</template>
