<script setup lang="ts">
import AConfigProvider, { type AConfigProviderProps } from './a-config-provider.vue';

const props = withDefaults(
  defineProps<AConfigProviderProps>(),
  {
    scrollBody: undefined,
  },
);
</script>

<template>
  <AConfigProvider v-bind="props">
    <div>A content</div>
  </AConfigProvider>
</template>
