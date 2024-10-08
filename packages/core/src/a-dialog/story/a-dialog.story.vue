<script setup lang="ts">
import ADialog from './_a-dialog.vue';
</script>

<template>
  <Story
    title="ADialog/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ADialog />
    </Variant>
  </Story>
</template>
