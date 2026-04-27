<script setup lang="ts">
import { useAppConfig } from '#imports';
import Callout from '../callout.vue';

const appConfig = useAppConfig();
</script>

<template>
  <Callout
    color="warning"
    :icon="appConfig.pohon.icons.warning"
  >
    <slot mdc-unwrap="p" />
  </Callout>
</template>
