<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed');
</script>

<template>
  <PButton
    color="neutral"
    variant="outline"
    :icon="collapsed ? 'i-lucide:chevrons-right' : 'i-lucide:chevrons-left'"
    @click.stop="collapsed = !collapsed"
  />
</template>
