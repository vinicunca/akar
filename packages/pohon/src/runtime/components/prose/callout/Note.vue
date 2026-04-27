<script setup lang="ts">
import { useAppConfig } from '#imports';
import Callout from '../callout.vue';

const appConfig = useAppConfig();
</script>

<template>
  <Callout
    color="info"
    :icon="appConfig.pohon.icons.info"
  >
    <slot mdc-unwrap="p" />
  </Callout>
</template>
