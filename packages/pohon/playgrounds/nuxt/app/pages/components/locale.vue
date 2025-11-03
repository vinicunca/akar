<script setup lang="ts">
import * as locales from 'pohon-ui/locale';
import { ref } from 'vue';

const locale = ref('en');
</script>

<template>
  <BaseNavbar to="https://ui.nuxt.com/docs/getting-started/integrations/i18n" />

  <PLocaleSelect
    v-model="locale"
    :locales="Object.values(locales)"
  />
</template>
