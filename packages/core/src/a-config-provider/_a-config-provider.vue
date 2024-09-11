<script setup lang="ts">
// import DropdownMenu from '../DropdownMenu/story/_DropdownMenu.vue';
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
    <!-- <DropdownMenu :default-open="true" /> -->
  </AConfigProvider>
</template>
