<script setup lang="ts">
import type { AConfigProviderProps } from './config-provider.vue';
import DropdownMenu from '../dropdown-menu/story/_dropdown-menu.vue';
import AConfigProvider from './config-provider.vue';

const props = withDefaults(defineProps<AConfigProviderProps>(), { scrollBody: undefined });
</script>

<template>
  <AConfigProvider v-bind="props">
    <DropdownMenu :default-open="true" />
  </AConfigProvider>
</template>
