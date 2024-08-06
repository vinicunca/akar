<script setup lang="ts">
import { ref } from 'vue';

import {
  ADialogRoot,
} from '../';
const dialogOpen = ref(false);
</script>

<template>
  <h1>Akar Dialog </h1>
  <ADialogRoot v-model:open="dialogOpen" />
</template>

<style>
</style>
