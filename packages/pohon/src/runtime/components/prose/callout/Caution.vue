<script setup lang="ts">
import { useAppConfig } from '#imports';
import Callout from '../callout.vue';

const appConfig = useAppConfig();
</script>

<template>
  <Callout
    color="error"
    :icon="appConfig.pohon.icons.caution"
  >
    <slot mdc-unwrap="p" />
  </Callout>
</template>
