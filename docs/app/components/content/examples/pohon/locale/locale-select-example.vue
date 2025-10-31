<script setup lang="ts">
import * as locales from 'pohon-ui/locale';
import { ref } from 'vue';

const locale = ref('en');
</script>

<template>
  <PLocaleSelect
    v-model="locale"
    :locales="Object.values(locales)"
    class="w-48"
  />
</template>
