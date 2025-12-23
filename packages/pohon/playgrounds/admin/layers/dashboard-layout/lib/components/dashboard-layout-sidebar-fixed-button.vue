<script setup lang="ts">
const expandOnHover = defineModel<boolean>('expandOnHover');
</script>

<template>
  <PButton
    color="neutral"
    variant="outline"
    :icon="expandOnHover ? 'i-lucide:pin' : 'i-lucide:pin-off'"
    @click="expandOnHover = !expandOnHover"
  />
</template>
