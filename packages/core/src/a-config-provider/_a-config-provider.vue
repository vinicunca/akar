<script setup lang="ts">
import ADropdownMenu from '../a-dropdown-menu/story/_a-dropdown-menu.vue';
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
    <ADropdownMenu :default-open="true" />
  </AConfigProvider>
</template>
