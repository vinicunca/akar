<script lang="ts" setup>
import { AConfigProvider } from 'akar';
import { useId } from 'vue';
</script>

<template>
  <AConfigProvider :use-id="() => useId()">
    <slot />
  </AConfigProvider>
</template>
